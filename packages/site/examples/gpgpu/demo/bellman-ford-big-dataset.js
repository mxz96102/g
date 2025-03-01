import { Algorithm } from '@antv/g6';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-webgl';
import { Plugin, Kernel, BufferUsage } from '@antv/g-plugin-gpgpu';

/**
 * SSSP(Bellman-Ford) ported from CUDA,
 * find all shortest paths started from Node 0
 * @see https://www.lewuathe.com/illustration-of-distributed-bellman-ford-algorithm.html
 * @see https://github.com/sengorajkumar/gpu_graph_algorithms
 *
 * compared with G6:
 * @see https://g6.antv.vision/zh/docs/api/Algorithm#findshortestpathgraphdata-start-end-directed-weightpropertyname
 *
 * dataset: 1k vertices & 5k edges
 * @see https://github.com/sengorajkumar/gpu_graph_algorithms/tree/master/input
 */

const $wrapper = document.getElementById('container');
(async () => {
  // load & parse CSV datasets, which use Compressed Sparse Row (CSR) for adjacency list
  const [V, E, From, To, I, W] = await Promise.all(
    [
      'https://gw.alipayobjects.com/os/bmw-prod/0272cae4-5ae0-4fbd-93f9-2b6a8e640a24.csv',
      'https://gw.alipayobjects.com/os/bmw-prod/e8b24b84-3cc4-4a73-b213-7edf4467e03a.csv',
      'https://gw.alipayobjects.com/os/bmw-prod/cba4ec3d-4eca-4f85-ae54-faeee0fa708a.csv',
      'https://gw.alipayobjects.com/os/bmw-prod/8582d1ca-9fe6-4afb-8364-df6ccc619594.csv',
      'https://gw.alipayobjects.com/os/bmw-prod/d84981b4-edcf-4df5-b672-45b0000fc5da.csv',
      'https://gw.alipayobjects.com/os/bmw-prod/eb455fa7-73ac-43fe-bc5e-d5e6c3a1fb77.csv',
    ].map(async (url, i) => {
      const res = await fetch(url);
      // adjust index for V, E, From and To
      return (await res.text()).split(',').map((v) => Number(v.trim()) - (i <= 3 ? 1 : 0));
    }),
  );

  // use G6's `findShortestPath` method
  let startTime = window.performance.now();
  let paths = calculateInCPU(V, From, To, W);
  showResult('CPU', startTime, window.performance.now(), paths);

  // use Compute Shader with WebGPU
  startTime = window.performance.now();
  paths = await calculateInGPU(V, E, I, W);
  showResult('GPU', startTime, window.performance.now(), paths);
})();

// calculate with G6's SSSP in CPU
const calculateInCPU = (V, From, To, W) => {
  const { findShortestPath } = Algorithm;
  const data = {
    nodes: V.map((v) => ({
      id: `${v}`,
      label: `${v}`,
    })),
    edges: From.map((from, i) => ({
      source: `${from}`,
      target: `${To[i]}`,
      weight: W[i],
    })),
  };

  const paths = [];
  for (let i = 0; i < data.nodes.length; i++) {
    // use SSSP for Node 0
    const { length, path } = findShortestPath(data, '0', data.nodes[i].id, true, 'weight');
    paths.push({
      to: data.nodes[i].id,
      length,
      path,
    });
  }
  return paths;
};

// we use 3 kernels
const calculateInGPU = async (V, E, I, W) => {
  // The total number of workgroup invocations (4096) exceeds the maximum allowed (256).
  const BLOCK_SIZE = 1;
  const BLOCKS = 256;
  const CANVAS_SIZE = 1;
  const MAX_DISTANCE = 1000000;

  // use WebGPU
  const renderer = new Renderer({ targets: ['webgpu'] });
  renderer.registerPlugin(new Plugin());

  // create a canvas
  const canvas = new Canvas({
    container: $wrapper,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    renderer,
  });

  // wait for canvas' services ready
  await canvas.ready;
  const device = renderer.getDevice();
  const relaxKernel = new Kernel(device, {
    computeShader: `
struct Buffer {
  data: array<i32>;
};
struct AtomicBuffer {
  data: array<atomic<i32>>;
};

@group(0) @binding(0) var<storage, read> d_in_E : Buffer;
@group(0) @binding(1) var<storage, read> d_in_I : Buffer;
@group(0) @binding(2) var<storage, read> d_in_W : Buffer;
@group(0) @binding(3) var<storage, read> d_out_D : Buffer;
@group(0) @binding(4) var<storage, read_write> d_out_Di : AtomicBuffer;

@stage(compute) @workgroup_size(${BLOCKS}, ${BLOCK_SIZE})
fn main(
  @builtin(global_invocation_id) global_id : vec3<u32>
) {
  var index = global_id.x;
  if (index < ${V.length}u) {
    for (var j = d_in_I.data[index]; j < d_in_I.data[index + 1u]; j = j + 1) {
      var w = d_in_W.data[j];
      var du = d_out_D.data[index];
      var dv = d_out_D.data[d_in_E.data[j]];
      var newDist = du + w;
      if (du == ${MAX_DISTANCE}) {
        newDist = ${MAX_DISTANCE};
      }

      if (newDist < dv) {
        atomicMin(&d_out_Di.data[d_in_E.data[j]], newDist);
      }
    }
  }
}`,
  });

  const updateDistanceKernel = new Kernel(device, {
    computeShader: `
struct Buffer {
  data: array<i32>;
};

@group(0) @binding(0) var<storage, read_write> d_out_D : Buffer;
@group(0) @binding(1) var<storage, read_write> d_out_Di : Buffer;

@stage(compute) @workgroup_size(${BLOCKS}, ${BLOCK_SIZE})
fn main(
  @builtin(global_invocation_id) global_id : vec3<u32>
) {
  var index = global_id.x;
  if (index < ${V.length}u) {
    if (d_out_D.data[index] > d_out_Di.data[index]) {
      d_out_D.data[index] = d_out_Di.data[index];
    }
    d_out_Di.data[index] = d_out_D.data[index];
  }
}
    `,
  });

  const updatePredKernel = new Kernel(device, {
    computeShader: `
struct Buffer {
  data: array<i32>;
};
struct AtomicBuffer {
  data: array<atomic<i32>>;
};

@group(0) @binding(0) var<storage, read> d_in_V : Buffer;
@group(0) @binding(1) var<storage, read> d_in_E : Buffer;
@group(0) @binding(2) var<storage, read> d_in_I : Buffer;
@group(0) @binding(3) var<storage, read> d_in_W : Buffer;
@group(0) @binding(4) var<storage, read> d_out_D : Buffer;
@group(0) @binding(5) var<storage, read_write> d_out_P : AtomicBuffer;

@stage(compute) @workgroup_size(${BLOCKS}, ${BLOCK_SIZE})
fn main(
  @builtin(global_invocation_id) global_id : vec3<u32>
) {
  var index = global_id.x;
  if (index < ${V.length}u) {
    for (var j = d_in_I.data[index]; j < d_in_I.data[index + 1u]; j = j + 1) {
      var u = d_in_V.data[index];
      var w = d_in_W.data[j];

      var dis_u = d_out_D.data[index];
      var dis_v = d_out_D.data[d_in_E.data[j]];
      if (dis_v == dis_u + w) {
        atomicMin(&d_out_P.data[d_in_E.data[j]], u);
      }
    }
  }
}    
    `,
  });

  const VBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE,
    viewOrSize: new Int32Array(V),
  });
  const EBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE,
    viewOrSize: new Int32Array(E),
  });
  const IBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE,
    viewOrSize: new Int32Array(I),
  });
  const WBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE,
    viewOrSize: new Int32Array(W),
  });
  const DOutBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE | BufferUsage.COPY_SRC,
    // since we want to find all paths for Node 0, set the first element to 0
    viewOrSize: new Int32Array([0, ...new Array(V.length - 1).fill(MAX_DISTANCE)]),
  });
  const DiOutBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE | BufferUsage.COPY_SRC,
    viewOrSize: new Int32Array([0, ...new Array(V.length - 1).fill(MAX_DISTANCE)]),
  });

  // store predecessors
  const POutBuffer = device.createBuffer({
    usage: BufferUsage.STORAGE | BufferUsage.COPY_SRC,
    viewOrSize: new Int32Array([0, ...new Array(V.length - 1).fill(MAX_DISTANCE)]),
  });
  const readback = device.createReadback();

  relaxKernel.setBinding(0, EBuffer);
  relaxKernel.setBinding(1, IBuffer);
  relaxKernel.setBinding(2, WBuffer);
  relaxKernel.setBinding(3, DOutBuffer);
  relaxKernel.setBinding(4, DiOutBuffer);

  updateDistanceKernel.setBinding(0, DOutBuffer);
  updateDistanceKernel.setBinding(1, DiOutBuffer);

  updatePredKernel.setBinding(0, VBuffer);
  updatePredKernel.setBinding(1, EBuffer);
  updatePredKernel.setBinding(2, IBuffer);
  updatePredKernel.setBinding(3, WBuffer);
  updatePredKernel.setBinding(4, DOutBuffer);
  updatePredKernel.setBinding(5, POutBuffer);

  const grids = Math.ceil(V.length / (BLOCKS * BLOCK_SIZE));
  for (let i = 1; i < V.length; i++) {
    relaxKernel.dispatch(grids, 1);
    updateDistanceKernel.dispatch(grids, 1);
  }
  updatePredKernel.dispatch(grids, 1);

  const out = await readback.readBuffer(DiOutBuffer);
  const predecessor = await readback.readBuffer(POutBuffer);

  return Array.from(out).map((length, i) => ({
    to: V[i],
    length,
    predecessor: V[predecessor[i]],
  }));
};

const $text = document.createElement('div');
$text.textContent = 'Please open the devtools, the shortest paths will be printed in console.';
$wrapper.appendChild($text);

const showResult = (label, startTime, endTime, paths) => {
  const $cpu = document.createElement('div');
  $cpu.textContent = `${label} Time Elapsed: ${Number.parseFloat(endTime - startTime).toFixed(
    2,
  )}ms`;
  $wrapper.appendChild($cpu);
  // print top nodes
  console.log(paths);
};
