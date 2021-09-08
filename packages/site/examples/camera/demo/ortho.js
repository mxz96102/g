import { Canvas, Group } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Cube, Grid, Plugin } from '@antv/g-plugin-3d';
import * as dat from 'dat.gui';
import Stats from 'stats.js';

// create a renderer
const webglRenderer = new WebGLRenderer();
webglRenderer.registerPlugin(new Plugin());

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer: webglRenderer,
});

// create an orthographic camera
const camera = canvas.getCamera();
camera.setPosition(300, 100, 500).setFocalPoint(300, 250, 0);

const group = new Group();
const cube = new Cube({
  style: {
    width: 200,
    height: 200,
    depth: 200,
    fill: '#FFF',
    map: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*8TlCRIsKeUkAAAAAAAAAAAAAARQnAQ',
  },
});

const grid = new Grid({
  style: {
    width: 400,
    height: 400,
    fill: '#1890FF',
  },
});

group.appendChild(grid);
group.appendChild(cube);
grid.translateLocal(0, 100, 0);
group.setPosition(300, 250, 0);

canvas.appendChild(group);

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.on('afterRender', () => {
  if (stats) {
    stats.update();
  }
  group.rotate(0, 1, 0);
});

// GUI
const gui = new dat.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);
const cameraFolder = gui.addFolder('orthographic projection');
const cameraConfig = {
  near: 0.1,
  far: 1000,
  zoom: 1,
};
cameraFolder.add(cameraConfig, 'near', 0, 600).onChange((near) => {
  camera.setNear(near);
});
cameraFolder.add(cameraConfig, 'far', 0, 1000).onChange((far) => {
  camera.setFar(far);
});
cameraFolder.add(cameraConfig, 'zoom', 0, 10).onChange((zoom) => {
  camera.setZoom(zoom);
});
cameraFolder.open();