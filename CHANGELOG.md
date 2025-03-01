# Change Log

以下版本号以 @antv/g 为准。

## [5.0.15] - 2022-3-8

-   @antv/g-canvas@1.0.14
-   @antv/g-components@1.0.12
-   @antv/g-math@1.0.12
-   @antv/g-plugin-3d@1.0.16
-   @antv/g-plugin-box2d@1.0.5
-   @antv/g-plugin-canvas-picker@1.0.12
-   @antv/g-plugin-canvas-renderer@1.0.12
-   @antv/g-plugin-control@1.0.13
-   @antv/g-plugin-css-select@1.0.12
-   @antv/g-plugin-dom-interaction@1.0.12
-   @antv/g-plugin-gpgpu@1.0.13
-   @antv/g-plugin-html-renderer@1.0.13
-   @antv/g-plugin-matterjs@1.0.2
-   @antv/g-plugin-physx@1.0.5
-   @antv/g-plugin-svg-picker@1.0.12
-   @antv/g-plugin-svg-renderer@1.0.12
-   @antv/g-plugin-webgl-renderer@1.0.18
-   @antv/g-plugin-yoga@1.0.2
-   @antv/g-shader-components@1.0.10
-   @antv/g-svg@1.0.12
-   @antv/g-webgl@1.0.18
-   @antv/g-webgpu-compiler@1.0.13
-   @antv/g@5.0.15
-   @antv/react-g@1.0.8

### 新增特性

-   [g] 升级 mana-syringe 到 `0.3.0`，使用 `container.unload()` 写法
-   [g] `getBounds` 不再会返回 null，而是空的 AABB（长宽中心点坐标都为 0）
-   [g-plugin-yoga] 部分 flex 属性支持百分比单位与动画 https://antv-g-next.gitee.io/zh/docs/plugins/yoga
-   [g-plugin-matterjs] 支持 matter.js 2D 物理引擎 https://antv-g-next.gitee.io/zh/docs/plugins/matterjs

## [5.0.14] - 2022-3-4

-   @antv/g-canvas@1.0.13
-   @antv/g-components@1.0.11
-   @antv/g-math@1.0.11
-   @antv/g-plugin-3d@1.0.15
-   @antv/g-plugin-box2d@1.0.4
-   @antv/g-plugin-canvas-picker@1.0.11
-   @antv/g-plugin-canvas-renderer@1.0.11
-   @antv/g-plugin-control@1.0.12
-   @antv/g-plugin-css-select@1.0.11
-   @antv/g-plugin-dom-interaction@1.0.11
-   @antv/g-plugin-gpgpu@1.0.12
-   @antv/g-plugin-html-renderer@1.0.12
-   @antv/g-plugin-matterjs@1.0.1
-   @antv/g-plugin-physx@1.0.4
-   @antv/g-plugin-svg-picker@1.0.11
-   @antv/g-plugin-svg-renderer@1.0.11
-   @antv/g-plugin-webgl-renderer@1.0.17
-   @antv/g-plugin-yoga@1.0.1
-   @antv/g-shader-components@1.0.9
-   @antv/g-svg@1.0.11
-   @antv/g-webgl@1.0.17
-   @antv/g-webgpu-compiler@1.0.12
-   @antv/g@5.0.14
-   @antv/react-g@1.0.7

### 新增特性

-   [g-plugin-yoga] 支持 Yoga 布局引擎 https://g-next.antv.vision/zh/docs/plugins/yoga

### Bug 修复

-   [g-webgl] WebGL2 首屏渲染白屏

## [5.0.13] - 2022-2-28

-   @antv/g-canvas@1.0.12
-   @antv/g-components@1.0.10
-   @antv/g-math@1.0.10
-   @antv/g-plugin-3d@1.0.14
-   @antv/g-plugin-box2d@1.0.3
-   @antv/g-plugin-canvas-picker@1.0.10
-   @antv/g-plugin-canvas-renderer@1.0.10
-   @antv/g-plugin-control@1.0.11
-   @antv/g-plugin-css-select@1.0.10
-   @antv/g-plugin-dom-interaction@1.0.10
-   @antv/g-plugin-gpgpu@1.0.11
-   @antv/g-plugin-html-renderer@1.0.11
-   @antv/g-plugin-physx@1.0.3
-   @antv/g-plugin-svg-picker@1.0.10
-   @antv/g-plugin-svg-renderer@1.0.10
-   @antv/g-plugin-webgl-renderer@1.0.16
-   @antv/g-shader-components@1.0.8
-   @antv/g-svg@1.0.10
-   @antv/g-webgl@1.0.16
-   @antv/g-webgpu-compiler@1.0.11
-   @antv/g@5.0.13
-   @antv/react-g@1.0.6
-   @antv/g-site@1.0.16

### Bug 修复

-   [g] 去除了严重影响性能的渲染排序 https://github.com/antvis/g/issues/816

## [5.0.12] - 2022-2-27

-   @antv/g-canvas@1.0.11
-   @antv/g-plugin-3d@1.0.13
-   @antv/g-plugin-box2d@1.0.2
-   @antv/g-plugin-physx@1.0.2
-   @antv/g-plugin-webgl-renderer@1.0.15
-   @antv/g-webgl@1.0.15
-   @antv/g@5.0.12
-   @antv/react-g@1.0.5

### 新增特性

-   [g] 支持通过 `displayObject.getRotation()` 等方式获取/设置旋转四元数
-   [g] 支持创建画布时通过 `requestAnimationFrame/cancelAnimationFrame` 设置自定义函数，适用于非浏览器环境
-   [g-plugin-box2d] 支持 Box2D 物理引擎

## [5.0.11] - 2022-2-22

-   @antv/g-canvas@1.0.10
-   @antv/g-plugin-3d@1.0.12
-   @antv/g-plugin-gpgpu@1.0.10
-   @antv/g-plugin-html-renderer@1.0.10
-   @antv/g-plugin-webgl-renderer@1.0.14
-   @antv/g-webgl@1.0.14
-   @antv/g-webgpu-compiler@1.0.10
-   @antv/g@5.0.11
-   @antv/react-g@1.0.4

### 新增特性

-   [g] 支持 OffscreenCanvas，现在 g 和 g-webgl 均可以在 WebWorker 中运行 https://github.com/antvis/g/issues/874
-   [g] 创建 Canvas 支持传入 `canvas`，如果传入 G 不会再自动创建 `<canvas>`，因此 `container` 不再是必填项。当用户想使用已有 `<canvas>` 或在 WebWorker 中使用 OffscreenCanvas，现在 时适用
-   [g] 创建 Canvas 支持传入 `devicePixelRatio`
-   [g-webgl] 重构了自动合并 mesh 逻辑
-   [g-plugin-gpgpu] Kernel 第一个参数为 device，和其他 GPU 对象例如 Geometry / Material 保持风格一致

### Bug 修复

-   [g-webgl] Circle / Ellipse / Rect 支持虚线描边 https://github.com/antvis/g/issues/824

### 其他

<!-- - 升级 mana-syringe，支持 `container.unload()` -->

## [5.0.10] - 2022-2-7

-   @antv/g-plugin-3d@1.0.11
-   @antv/g-plugin-webgl-renderer@1.0.13
-   @antv/g-webgl@1.0.13

### Bug 修复

-   [g-webgl] 修改了 BufferGeometry 的用法，需要使用 Device 创建

### 其他

-   [官网] 使用 lil-gui 替换 dat.gui https://github.com/antvis/g/issues/871

## [5.0.10] - 2022-2-5

-   @antv/g-canvas@1.0.9
-   @antv/g-components@1.0.9
-   @antv/g-math@1.0.9
-   @antv/g-plugin-3d@1.0.10
-   @antv/g-plugin-canvas-picker@1.0.9
-   @antv/g-plugin-canvas-renderer@1.0.9
-   @antv/g-plugin-control@1.0.10
-   @antv/g-plugin-css-select@1.0.9
-   @antv/g-plugin-dom-interaction@1.0.9
-   @antv/g-plugin-gpgpu@1.0.9
-   @antv/g-plugin-html-renderer@1.0.9
-   @antv/g-plugin-svg-picker@1.0.9
-   @antv/g-plugin-svg-renderer@1.0.9
-   @antv/g-plugin-webgl-renderer@1.0.12
-   @antv/g-shader-components@1.0.7
-   @antv/g-svg@1.0.9
-   @antv/g-webgl@1.0.12
-   @antv/g-webgpu-compiler@1.0.9
-   @antv/g@5.0.10
-   @antv/react-g@1.0.3

### 新增特性

-   [g-plugin-gpgpu] 支持 GPGPU https://github.com/antvis/g/issues/864
-   [g] 支持通过 `await canvas.ready;` 等待画布完成初始化工作

### Bug 修复

-   [g] CanvasEvent.READY 触发两次问题 https://github.com/antvis/g/issues/865

## [5.0.9] - 2022-1-24

-   @antv/g-canvas@1.0.8
-   @antv/g-components@1.0.8
-   @antv/g-math@1.0.8
-   @antv/g-plugin-3d@1.0.9
-   @antv/g-plugin-canvas-picker@1.0.8
-   @antv/g-plugin-canvas-renderer@1.0.8
-   @antv/g-plugin-control@1.0.9
-   @antv/g-plugin-css-select@1.0.8
-   @antv/g-plugin-dom-interaction@1.0.8
-   @antv/g-plugin-gpgpu@1.0.8
-   @antv/g-plugin-html-renderer@1.0.8
-   @antv/g-plugin-svg-picker@1.0.8
-   @antv/g-plugin-svg-renderer@1.0.8
-   @antv/g-plugin-webgl-renderer@1.0.11
-   @antv/g-shader-components@1.0.6
-   @antv/g-svg@1.0.8
-   @antv/g-webgl@1.0.11
-   @antv/g-webgpu-compiler@1.0.8
-   @antv/g@5.0.9
-   @antv/react-g@1.0.2

### Bug 修复

-   [g-webgl] 硬件适配层支持 WebGL1 #851
-   [g-webgl] Polygon Path 描边闭合 #860
-   [g-webgl] 渲染次序问题 #859

## [5.0.8] - 2022-1-18

-   @antv/g-canvas@1.0.7
-   @antv/g-components@1.0.7
-   @antv/g-math@1.0.7
-   @antv/g-plugin-3d@1.0.8
-   @antv/g-plugin-canvas-picker@1.0.7
-   @antv/g-plugin-canvas-renderer@1.0.7
-   @antv/g-plugin-control@1.0.8
-   @antv/g-plugin-css-select@1.0.7
-   @antv/g-plugin-dom-interaction@1.0.7
-   @antv/g-plugin-gpgpu@1.0.7
-   @antv/g-plugin-html-renderer@1.0.7
-   @antv/g-plugin-svg-picker@1.0.7
-   @antv/g-plugin-svg-renderer@1.0.7
-   @antv/g-plugin-webgl-renderer@1.0.10
-   @antv/g-shader-components@1.0.5
-   @antv/g-svg@1.0.7
-   @antv/g-webgl@1.0.10
-   @antv/g-webgpu-compiler@1.0.7
-   @antv/g@5.0.8
-   @antv/react-g@1.0.1

无新增特性。重命名 `dist/index.umd.js` -> `dist/index.umd.min.js`

### Bug 修复

修复 `g-plugin-3d` UMD 打包问题。

## [5.0.7] - 2022-1-17

-   @antv/g-canvas@1.0.6
-   @antv/g-components@1.0.6
-   @antv/g-math@1.0.6
-   @antv/g-plugin-3d@1.0.7
-   @antv/g-plugin-canvas-picker@1.0.6
-   @antv/g-plugin-canvas-renderer@1.0.6
-   @antv/g-plugin-control@1.0.7
-   @antv/g-plugin-css-select@1.0.6
-   @antv/g-plugin-dom-interaction@1.0.6
-   @antv/g-plugin-gpgpu@1.0.6
-   @antv/g-plugin-html-renderer@1.0.6
-   @antv/g-plugin-svg-picker@1.0.6
-   @antv/g-plugin-svg-renderer@1.0.6
-   @antv/g-plugin-webgl-renderer@1.0.9
-   @antv/g-shader-components@1.0.4
-   @antv/g-svg@1.0.6
-   @antv/g-webgl@1.0.9
-   @antv/g-webgpu-compiler@1.0.6
-   @antv/g@5.0.7

### 新增特性

-   [g-webgl] 支持基础几何 https://antv-g-next.gitee.io/zh/docs/api/3d/geometry
-   [g-webgl] 支持基础材质 https://antv-g-next.gitee.io/zh/docs/api/3d/material https://github.com/antvis/g/issues/826
-   [g-webgl] 支持平行光 https://antv-g-next.gitee.io/zh/docs/api/3d/light
-   [g-webgl] 支持 clipPath。https://github.com/antvis/g/issues/825

### Bug 修复

-   [g-webgl] 内置 potpack https://github.com/antvis/g/issues/836
-   [g-webgl] 使用 depth buffer 实现 z-index 特性 https://github.com/antvis/g/issues/842
-   [g-canvas] 修复插入 RTree 节点时获取包围盒 undefined 的问题
-   [g-canvas] 修复同时设置 Text 的 letterSpacing 与 textAlign 属性的问题 https://github.com/antvis/g/issues/854

## [1.0.0-alpha.37] - 2021-12-02

### Bug 修复

-   [g] 透视投影相机支持 zoom https://github.com/antvis/g/issues/820
-   [g] 修复画布 resize 问题 https://github.com/antvis/g/issues/819
-   [g-canvas] 性能优化 https://github.com/antvis/g/issues/816
-   [g-webgl] 支持虚线

## [1.0.0-alpha.27] - 2021-11-08

### Bug 修复

-   开启 [runtimehelpers](https://github.com/umijs/father#runtimehelpers)，修复 async/await 编译问题。

## [1.0.0-alpha.26] - 2021-11-08

### 新增特性

使用 mana-syringe 替换 inversify。

## [1.0.0-alpha.24] - 2021-11-04

-   @antv/g-canvas@1.0.0-alpha.24
-   @antv/g-components@1.0.0-alpha.23
-   @antv/g-plugin-3d@1.0.0-alpha.23
-   @antv/g-plugin-canvas-picker@1.0.0-alpha.18
-   @antv/g-plugin-canvas-renderer@1.0.0-alpha.24
-   @antv/g-plugin-control@1.0.0-alpha.23
-   @antv/g-plugin-css-select@1.0.0-alpha.24
-   @antv/g-plugin-dom-interaction@1.0.0-alpha.23
-   @antv/g-plugin-html-renderer@1.0.0-alpha.7
-   @antv/g-plugin-svg-picker@1.0.0-alpha.23
-   @antv/g-plugin-svg-renderer@1.0.0-alpha.24
-   @antv/g-plugin-webgl-renderer@1.0.0-alpha.24
-   @antv/g-svg@1.0.0-alpha.24
-   @antv/g-webgl@1.0.0-alpha.24
-   @antv/g@1.0.0-alpha.24

### 新增特性

-   [g-webgl] 支持 WebGL2。详见引擎设计。
-   [g-webgl] 使用 instanced 渲染 Line、Text、Circle、Ellipse 大幅提升渲染性能。详见性能优化。

### Bug 修复

-   [g] 考虑到包体积以及不适合浏览器环境，去除对 [tapable](https://github.com/webpack/tapable) 的依赖，使用 async-emitter 替代。

### 其他已知问题

-   [g-canvas] 频繁修改属性导致重绘性能问题
-   [g-webgl] 自动降级成 WebGL1，支持 WebGPU。

## [1.0.0-alpha.23] - 2021-09-27

-   @antv/g-canvas@1.0.0-alpha.23
-   @antv/g-components@1.0.0-alpha.22
-   @antv/g-plugin-3d@1.0.0-alpha.22
-   @antv/g-plugin-canvas-picker@1.0.0-alpha.17
-   @antv/g-plugin-canvas-renderer@1.0.0-alpha.23
-   @antv/g-plugin-control@1.0.0-alpha.22
-   @antv/g-plugin-css-select@1.0.0-alpha.23
-   @antv/g-plugin-dom-interaction@1.0.0-alpha.22
-   @antv/g-plugin-html-renderer@1.0.0-alpha.6
-   @antv/g-plugin-svg-picker@1.0.0-alpha.22
-   @antv/g-plugin-svg-renderer@1.0.0-alpha.23
-   @antv/g-plugin-webgl-renderer@1.0.0-alpha.23
-   @antv/g-svg@1.0.0-alpha.23
-   @antv/g-webgl@1.0.0-alpha.23
-   @antv/g@1.0.0-alpha.23

### Bug 修复

-   [path-util] 转换无效 A 命令出错，例如 GUI 中使用的：

    ```js
    [['A', 0, 0, 0, 0, 0, 0, 0]];
    ```

## [1.0.0-alpha.22] - 2021-09-26

-   @antv/g-canvas@1.0.0-alpha.22
-   @antv/g-components@1.0.0-alpha.21
-   @antv/g-ecs@1.0.0-alpha.8
-   @antv/g-plugin-canvas-picker@1.0.0-alpha.16
-   @antv/g-plugin-canvas-renderer@1.0.0-alpha.22
-   @antv/g-plugin-css-select@1.0.0-alpha.22
-   @antv/g-plugin-html-renderer@1.0.0-alpha.5
-   @antv/g-plugin-svg-renderer@1.0.0-alpha.22
-   @antv/g-plugin-webgl-renderer@1.0.0-alpha.22
-   @antv/g-plugin-control@1.0.0-alpha.21
-   @antv/g-svg@1.0.0-alpha.22
-   @antv/g-webgl@1.0.0-alpha.22
-   @antv/g@1.0.0-alpha.22

### Bug 修复

-   [g] Canvas 传入参数 Renderer 类型报错
-   [g-plugin-control] 使用 hammer.js 监听手势事件，使用 Passive Event Listener 处理 wheel 事件

## [1.0.0-alpha.21] - 2021-09-25

-   @antv/g-canvas@1.0.0-alpha.22
-   @antv/g-components@1.0.0-alpha.21
-   @antv/g-ecs@1.0.0-alpha.8
-   @antv/g-plugin-canvas-picker@1.0.0-alpha.16
-   @antv/g-plugin-canvas-renderer@1.0.0-alpha.22
-   @antv/g-plugin-css-select@1.0.0-alpha.21
-   @antv/g-plugin-html-renderer@1.0.0-alpha.5
-   @antv/g-plugin-svg-renderer@1.0.0-alpha.22
-   @antv/g-plugin-webgl-renderer@1.0.0-alpha.22
-   @antv/g-svg@1.0.0-alpha.22
-   @antv/g-webgl@1.0.0-alpha.22
-   @antv/g@1.0.0-alpha.21

### 新增特性

-   明确了 G 目前使用到的[坐标系](http://g-next.antv.vision/zh/docs/api/canvas#%E5%9D%90%E6%A0%87%E7%B3%BB)，提供各个坐标系间的转换方法：Client <-> Viewport <-> Canvas

    -   client2Viewport(client: Point): Point
    -   viewport2Client(canvas: Point): Point
    -   viewport2Canvas(viewport: Point): Point
    -   canvas2Viewport(canvas: Point): Point

-   支持[节点克隆](http://g-next.antv.vision/zh/docs/api/basic/display-object#%E5%85%8B%E9%9A%86%E8%8A%82%E7%82%B9)，`cloneNode(deep?: boolean)` 在任何时刻都可以进行图形的克隆，例如：

    ```js
    circle.style.r = 20;
    circle.setPosition(10, 20);

    const clonedCircle = circle.cloneNode();
    clonedCircle.style.r; // 20
    clonedCircle.getPosition(); // [10, 20]
    ```

    注意事项：

    -   支持深拷贝，即自身以及整棵子树
    -   克隆的新节点不会保留原始节点的父子关系，需要使用 `appendChild` 将其加入画布才会被渲染
    -   与 [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode#notes) 保持一致，不会拷贝原图形上的事件监听器。

-   支持使用 [document.createElement()](http://g-next.antv.vision/zh/docs/api/builtin-objects/document#createelement) 创建图形，作为 `new Circle()` 的另一种选择，类似旧版 G 的 `addShape()`：

    ```js
    import { SHAPE, Circle } from '@antv/g';

    const circle = canvas.document.createElement(SHAPE.Circle, { style: { r: 100 } });
    // 或者
    const circle = new Circle({ style: { r: 100 } });
    ```

    除了内置图形，自定义图形如果也想用这种方式创建，需要先注册：

    ```js
    import { MyCustomShape } from 'my-custom-shape';
    canvas.customElements.define(MyCustomShape.tag, MyCustomShape);

    const myCustomShape = canvas.document.createElement(MyCustomShape.tag, {});
    ```

-   补全 [ComputedEffectTiming](http://g-next.antv.vision/zh/docs/api/animation#computedeffecttiming)
    -   endTime
    -   activeDuration
    -   localTime
    -   progress
    -   currentIteration
-   updateTiming

-   resetLocalTransform 重置局部坐标系下的变换 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform

    ```js
    circle.resetLocalTransform();

    // 等价于
    circle.setLocalScale(1);
    circle.setLocalPosition(0, 0);
    circle.setLocalEulerAngles(0);
    ```

### 改动

-   重构 DisplayObject，在原有的继承链（DisplayObject -> Element -> Node -> EventTarget）基础上，将动画、变换等能力拆解成多个 mixin：
    -   Animatable
    -   Transformable
    -   Visible
-   包围盒 API，区分了 Bounds，LocalBounds，GeometryBounds 以及 RenderBounds 这四种包围盒：
    -   getBounds 世界坐标系下的包围盒
    -   getLocalBounds 在父元素局部空间下的包围盒
    -   getGeometryBounds 不考虑所有子元素，例如：
        ```js
        const geometryBounds = circle.getGeometryBounds();
        circle.appendChild(child1); // 添加一堆子元素
        circle.appendChild(child2);
        circle.appendChild(child3);
        circle.getGeometryBounds(); // 尺寸依然等于 geometryBounds
        ```
    -   getRenderBounds 会考虑一些绘图属性，例如 lineWidth 边框宽度，padding，阴影以及部分滤镜（blur、drop-shadow），顾名思义它在渲染管线中会使用到：
        -   脏矩阵渲染中清除区域据此计算
        -   内置剔除插件使用该包围盒

### Bug 修复

-   [g] querySelectorAll 无法按 id 查询问题
-   [g] 无法获取 style.origin，无法设置 Group 的 origin
-   [g] 设置 transformOrigin 无效
-   [g] addEventListener 设置 once 无效
-   [g-canvas]设置阴影 shadowBlur 影响不应影响子元素
-   [path-util] 直线转三次贝塞尔曲线有误，导致 getPoint() 无法获取正确点坐标 https://github.com/antvis/util/issues/68
-   [g-canvas] 相机发生变换后，g-canvas 拾取无效

## [1.0.0-alpha.20] - 2021-09-13

-   @antv/g-canvas@1.0.0-alpha.21
-   @antv/g-components@1.0.0-alpha.20
-   @antv/g-ecs@1.0.0-alpha.7
-   @antv/g-math@1.0.0-alpha.5
-   @antv/g-plugin-3d@1.0.0-alpha.21
-   @antv/g-plugin-canvas-picker@1.0.0-alpha.15
-   @antv/g-plugin-canvas-renderer@1.0.0-alpha.21
-   @antv/g-plugin-control@1.0.0-alpha.20
-   @antv/g-plugin-css-select@1.0.0-alpha.20
-   @antv/g-plugin-dom-interaction@1.0.0-alpha.21
-   @antv/g-plugin-html-renderer@1.0.0-alpha.4
-   @antv/g-plugin-svg-picker@1.0.0-alpha.21
-   @antv/g-plugin-svg-renderer@1.0.0-alpha.21
-   @antv/g-plugin-webgl-renderer@1.0.0-alpha.21
-   @antv/g-svg@1.0.0-alpha.21
-   @antv/g-webgl@1.0.0-alpha.21
-   @antv/g@1.0.0-alpha.20

### 新增特性

-   `removeAllEventListeners` 移除元素上所有事件监听器：https://g-next.antv.vision/zh/docs/api/event#removealleventlisteners
    ```js
    circle.removeAllEventListeners();
    // 或者
    circle.off(); // 兼容旧版 API
    ```
-   `getLineBoundingRects` 获取 Text 多行文本包围盒：https://g-next.antv.vision/zh/docs/api/basic/text#getlineboundingrects-rectangle
    ```js
    text.getLineBoundingRects(); // Rectangle[]
    ```
-   节点查询
    -   `getRootNode` 返回当前节点的根节点
    -   `find` 查询满足条件的第一个子节点
    -   `findAll` 查询满足条件的所有子节点列表
    ```js
    // 以下写法等价
    solarSystem.querySelector('[name=sun]');
    solarSystem.find((element) => element.name === 'sun');
    ```
-   节点操作
    -   `append` 在当前节点的子节点列表末尾批量添加一组节点
    -   `prepend` 在当前节点的子节点列表头部批量添加一组节点
    -   `after` 在当前节点之后批量添加一些兄弟节点
    -   `before` 在当前节点之前批量添加一些兄弟节点
    -   `replaceChild` 用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点
    -   `replaceWith` 在父节点的子节点列表中，用传入的节点列表替换该节点
    -   `replaceChildren` 替换该节点的所有子节点。不传参数时则会清空该节点的所有子节点
-   基础图形 HTML。https://g-next.antv.vision/zh/docs/api/basic/html
-   文档：
    -   内置对象文档：
        -   EventTarget https://g-next.antv.vision/zh/docs/api/builtin-objects/event-target
        -   Node https://g-next.antv.vision/zh/docs/api/builtin-objects/node
        -   Element https://g-next.antv.vision/zh/docs/api/builtin-objects/element
        -   Document https://g-next.antv.vision/zh/docs/api/builtin-objects/document
    -   事件系统文档，包含以下问题的说明或者解决方案：
        -   事件触发顺序。click 事件会在 pointerdown 和 pointerup 触发之后。https://g-next.antv.vision/zh/docs/api/event#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91%E9%A1%BA%E5%BA%8F
        -   在 Chrome 中禁止页面默认滚动行为。https://g-next.antv.vision/zh/docs/api/event#%E5%9C%A8-chrome-%E4%B8%AD%E7%A6%81%E6%AD%A2%E9%A1%B5%E9%9D%A2%E9%BB%98%E8%AE%A4%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA
        -   其他原生事件用法，例如双击、键盘、剪切板等。https://g-next.antv.vision/zh/docs/api/event#%E5%85%B6%E4%BB%96%E4%BA%8B%E4%BB%B6

### 改动

-   构建 esm/cjs 选择 babel 模式，之前为 rollup，构建产物文件结构有较大变化。
-   拾取逻辑。点击画布空白处时，事件对象 target 为 Document。
-   参考 DOM API 重构了内部继承关系：
    -   Canvas -> EventTarget
    -   Document -> Node -> EventTarget
    -   DisplayObject -> Element -> Node -> EventTarget
-   Canvas 提供获取入口和场景图根节点方法：https://g-next.antv.vision/zh/docs/api/canvas#%E5%85%A5%E5%8F%A3%E4%B8%8E%E6%A0%B9%E8%8A%82%E7%82%B9

    ```js
    canvas.document; // 入口
    canvas.document.documentElement; // 场景图根节点
    // 或者
    canvas.getRoot(); // 场景图根节点

    // 向场景图根节点中添加节点
    canvas.appendChild(circle);
    // 或者
    canvas.document.documentElement.appendChild(circle);
    ```

### Bug 修复

-   g-svg 渲染节点时丢失变换矩阵问题。该问题是由删除节点之后排序时未及时更新导致。
-   g-canvas 残影问题 https://codesandbox.io/s/exciting-pike-z7lt8?file=/index.js 在设置 z 坐标大于 500 时出现。目前内置的默认正交相机在世界坐标系位置为 `[width / 2, height / 2, 500]`，视点为 `[width / 2, height / 2, 0]`。因此 z > 500 代表图形出现在了相机之后，内置的剔除插件会将其剔除，因此正确的展示效果为该图形不可见。

### 其他已知问题

-   Node.cloneNode 待实现，可进行图形的复制。
-   视口坐标系与世界坐标系、Client 坐标系的转换方法。
-   HTML 图形事件响应有问题。
-   文本阴影待实现。
-   path-util 转曲遗留问题：https://github.com/antvis/util/issues/68
-   g-webgl Line/Path/Polygon/Polyline 待实现。
-   father 选用 babel 编译 cjs 时在 @antv/g-plugin-webgl-renderer 中报错
