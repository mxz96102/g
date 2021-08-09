import { vec3 } from 'gl-matrix';
import { injectable } from 'inversify';
import { isString } from '@antv/util';
import type { GeometryAABBUpdater } from '.';
import type { AABB } from '../../shapes';
import type { RectStyleProps } from '../../display-objects/Rect';
import type { ImageStyleProps } from '../../display-objects/Image';

@injectable()
export class RectUpdater implements GeometryAABBUpdater<RectStyleProps | ImageStyleProps> {
  dependencies = ['width', 'height', 'lineWidth', 'anchor', 'img'];

  update(attributes: RectStyleProps | ImageStyleProps, aabb: AABB) {
    const { lineWidth = 0, lineAppendWidth = 0, anchor = [0, 0], img } = attributes;

    // resize with HTMLImageElement's size
    if (img && !isString(img)) {
      if (!attributes.width) {
        attributes.width = img.width;
      }
      if (!attributes.height) {
        attributes.height = img.height;
      }
    }

    const { width = 0, height = 0 } = attributes;

    // anchor is left-top by default, don't account for lineWidth here
    const halfExtents = vec3.fromValues(width / 2, height / 2, 0);
    const center = vec3.fromValues(
      (1 - anchor[0] * 2) * halfExtents[0],
      (1 - anchor[1] * 2) * halfExtents[1],
      0,
    );

    // append lineWidth
    vec3.add(
      halfExtents,
      halfExtents,
      vec3.fromValues(lineWidth + lineAppendWidth, lineWidth + lineAppendWidth, 0),
    );
    aabb.update(center, halfExtents);
  }
}
