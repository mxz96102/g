import { singleton } from 'mana-syringe';
import { GeometryAABBUpdater } from './interfaces';
import type { ParsedBaseStyleProps } from '../../types';
import { SHAPE } from '../../types';

@singleton({ token: { token: GeometryAABBUpdater, named: SHAPE.Path } })
export class PathUpdater implements GeometryAABBUpdater<ParsedBaseStyleProps> {
  update(parsedStyle: ParsedBaseStyleProps) {
    const { path } = parsedStyle;

    const { x: minX, y: minY, width, height } = path!.rect;

    return {
      width,
      height,
      x: minX,
      y: minY,
    };
  }
}

// function getPathBox(segments: PathSegment[], lineWidth: number) {
//   let xArr = [];
//   let yArr = [];
//   const segmentsWithAngle = [];
//   for (let i = 0; i < segments.length; i++) {
//     const segment = segments[i];
//     const { currentPoint, params, prePoint } = segment;
//     let box;
//     switch (segment.command) {
//       case 'Q':
//         box = QuadUtil.box(prePoint[0], prePoint[1], params[1], params[2], params[3], params[4]);
//         break;
//       case 'C':
//         box = CubicUtil.box(
//           prePoint[0],
//           prePoint[1],
//           params[1],
//           params[2],
//           params[3],
//           params[4],
//           params[5],
//           params[6],
//         );
//         break;
//       case 'A':
//         // eslint-disable-next-line no-case-declarations
//         const { arcParams } = segment;
//         box = EllipseArcUtil.box(
//           arcParams.cx,
//           arcParams.cy,
//           arcParams.rx,
//           arcParams.ry,
//           arcParams.xRotation,
//           arcParams.startAngle,
//           arcParams.endAngle,
//         );
//         break;
//       default:
//         xArr.push(currentPoint[0]);
//         yArr.push(currentPoint[1]);
//         break;
//     }
//     if (box) {
//       segment.box = box;
//       xArr.push(box.x, box.x + box.width);
//       yArr.push(box.y, box.y + box.height);
//     }
//     if (
//       lineWidth &&
//       (segment.command === 'L' || segment.command === 'M') &&
//       segment.prePoint &&
//       segment.nextPoint
//     ) {
//       segmentsWithAngle.push(segment);
//     }
//   }
//   // bbox calculation should ignore NaN for path attribute
//   // ref: https://github.com/antvis/g/issues/210
//   xArr = xArr.filter((item) => !Number.isNaN(item));
//   yArr = yArr.filter((item) => !Number.isNaN(item));
//   let minX = min(xArr);
//   let minY = min(yArr);
//   let maxX = max(xArr);
//   let maxY = max(yArr);
//   if (segmentsWithAngle.length === 0) {
//     return {
//       x: minX,
//       y: minY,
//       width: maxX - minX,
//       height: maxY - minY,
//     };
//   }
//   for (let i = 0; i < segmentsWithAngle.length; i++) {
//     const segment = segmentsWithAngle[i];
//     const { currentPoint } = segment;
//     let extra;
//     if (currentPoint[0] === minX) {
//       extra = getExtraFromSegmentWithAngle(segment, lineWidth);
//       minX -= extra.xExtra;
//     } else if (currentPoint[0] === maxX) {
//       extra = getExtraFromSegmentWithAngle(segment, lineWidth);
//       maxX += extra.xExtra;
//     }
//     if (currentPoint[1] === minY) {
//       extra = getExtraFromSegmentWithAngle(segment, lineWidth);
//       minY -= extra.yExtra;
//     } else if (currentPoint[1] === maxY) {
//       extra = getExtraFromSegmentWithAngle(segment, lineWidth);
//       maxY += extra.yExtra;
//     }
//   }
//   return {
//     x: minX,
//     y: minY,
//     width: maxX - minX,
//     height: maxY - minY,
//   };
// }

// function getExtraFromSegmentWithAngle(segment: any, lineWidth: number) {
//   const { prePoint, currentPoint, nextPoint } = segment;
//   const currentAndPre =
//     Math.pow(currentPoint[0] - prePoint[0], 2) + Math.pow(currentPoint[1] - prePoint[1], 2);
//   const currentAndNext =
//     Math.pow(currentPoint[0] - nextPoint[0], 2) + Math.pow(currentPoint[1] - nextPoint[1], 2);
//   const preAndNext =
//     Math.pow(prePoint[0] - nextPoint[0], 2) + Math.pow(prePoint[1] - nextPoint[1], 2);
//   // 以 currentPoint 为顶点的夹角
//   const currentAngle = Math.acos(
//     (currentAndPre + currentAndNext - preAndNext) /
//     (2 * Math.sqrt(currentAndPre) * Math.sqrt(currentAndNext)),
//   );
//   // 夹角为空、 0 或 PI 时，不需要计算夹角处的额外宽度
//   // 注意: 由于计算精度问题，夹角为 0 的情况计算出来的角度可能是一个很小的值，还需要判断其与 0 是否近似相等
//   if (!currentAngle || Math.sin(currentAngle) === 0 || isNumberEqual(currentAngle, 0)) {
//     return {
//       xExtra: 0,
//       yExtra: 0,
//     };
//   }
//   let xAngle = Math.abs(Math.atan2(nextPoint[1] - currentPoint[1], nextPoint[0] - currentPoint[0]));
//   let yAngle = Math.abs(Math.atan2(nextPoint[0] - currentPoint[0], nextPoint[1] - currentPoint[1]));
//   // 将夹角转为锐角
//   xAngle = xAngle > Math.PI / 2 ? Math.PI - xAngle : xAngle;
//   yAngle = yAngle > Math.PI / 2 ? Math.PI - yAngle : yAngle;
//   // 这里不考虑在水平和垂直方向的投影，直接使用最大差值
//   // 由于上层统一加减了二分之一线宽，这里需要进行弥补
//   const extra = {
//     // 水平方向投影
//     xExtra:
//       Math.cos(currentAngle / 2 - xAngle) * ((lineWidth / 2) * (1 / Math.sin(currentAngle / 2))) -
//       lineWidth / 2 || 0,
//     // 垂直方向投影
//     yExtra:
//       Math.cos(yAngle - currentAngle / 2) * ((lineWidth / 2) * (1 / Math.sin(currentAngle / 2))) -
//       lineWidth / 2 || 0,
//   };
//   return extra;
// }
