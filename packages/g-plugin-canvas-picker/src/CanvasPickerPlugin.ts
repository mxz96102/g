import {
  SHAPE,
  DisplayObject,
  DisplayObjectPool,
  RenderingService,
  RenderingPlugin,
  RenderingContext,
  SceneGraphService,
  PickingResult,
  OffscreenCanvasCreator,
  Camera,
} from '@antv/g';
import { Point } from '@antv/g-math';
import { PathGeneratorFactory, PathGenerator } from '@antv/g-plugin-canvas-renderer';
import { mat4, vec3 } from 'gl-matrix';
import { inject, injectable } from 'inversify';

export const PointInPathPickerFactory = Symbol('PointInPathPicker');
export type PointInPathPicker = (
  displayObject: DisplayObject,
  point: Point,
  isPointInPath?: (displayObject: DisplayObject, point: Point) => boolean,
) => boolean;

/**
 * pick shape(s) with Mouse/Touch event
 *
 * 1. find AABB with r-tree
 * 2. do math calculation with geometry in an accurate way
 */
@injectable()
export class CanvasPickerPlugin implements RenderingPlugin {
  static tag = 'CanvasPickerPlugin';

  @inject(Camera)
  private camera: Camera;

  @inject(SceneGraphService)
  private sceneGraphService: SceneGraphService;

  @inject(RenderingContext)
  private renderingContext: RenderingContext;

  @inject(DisplayObjectPool)
  private displayObjectPool: DisplayObjectPool;

  @inject(OffscreenCanvasCreator)
  private offscreenCanvas: OffscreenCanvasCreator;

  @inject(PathGeneratorFactory)
  private pathGeneratorFactory: (tagName: SHAPE) => PathGenerator;

  @inject(PointInPathPickerFactory)
  private pointInPathPickerFactory: (tagName: SHAPE) => PointInPathPicker;

  apply(renderingService: RenderingService) {
    renderingService.hooks.pick.tap(CanvasPickerPlugin.tag, (result: PickingResult) => {
      // position in world space
      const { x, y } = result.position;
      // query by AABB first with spatial index(r-tree)
      const rBushNodes = this.renderingContext.rBush.search({
        minX: x,
        minY: y,
        maxX: x,
        maxY: y,
      });

      const pickedDisplayObjects: DisplayObject[] = [];
      rBushNodes.forEach(({ name }: { name: string }) => {
        const displayObject = this.displayObjectPool.getByName(name);
        const { capture } = displayObject.getConfig();

        if (displayObject.isVisible() && capture) {
          // use picker for current shape's type
          const pick = this.pointInPathPickerFactory(displayObject.nodeType);
          if (pick) {
            // invert with world matrix
            const transform = mat4.multiply(
              mat4.create(),
              this.camera.getOrthoMatrix(),
              displayObject.getWorldTransform(),
            );

            const invertWorldMat = mat4.invert(mat4.create(), transform);
            // transform client position to local space, do picking in local space
            const localPosition = vec3.transformMat4(
              vec3.create(),
              vec3.fromValues(x, y, 0),
              invertWorldMat,
            );

            console.log(invertWorldMat, localPosition);
            if (
              pick(displayObject, { x: localPosition[0], y: localPosition[1] }, this.isPointInPath)
            ) {
              pickedDisplayObjects.push(displayObject);
            }
          } else {
            // AABB test is enough, such as `Text`
            pickedDisplayObjects.push(displayObject);
          }
        }
      });

      // find group with max z-index
      pickedDisplayObjects.sort(this.sceneGraphService.sort);

      return {
        position: result.position,
        // return last picked
        picked: pickedDisplayObjects[pickedDisplayObjects.length - 1],
      };
    });
  }

  /**
   * use native picking method
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInPath
   */
  private isPointInPath = (displayObject: DisplayObject, position: Point) => {
    const context = this.offscreenCanvas.getOrCreateContext() as CanvasRenderingContext2D;
    const generatePath = this.pathGeneratorFactory(displayObject.nodeType);
    if (generatePath) {
      generatePath(context, displayObject.attributes);
    }

    return context.isPointInPath(position.x, position.y);
  };
}