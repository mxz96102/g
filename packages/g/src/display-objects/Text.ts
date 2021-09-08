import { SHAPE } from '../types';
import type { BaseStyleProps } from '../types';
import { DisplayObject } from '../DisplayObject';
import { DisplayObjectConfig } from '../DisplayObject';

export interface TextStyleProps extends BaseStyleProps {
  text: string;
  /** 设置文本内容的当前对齐方式 */
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
  /** 设置在绘制文本时使用的当前文本基线 */
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
  /** 字体样式 */
  fontStyle?: 'normal' | 'italic' | 'oblique';
  /** 文本字体大小 */
  fontSize?: number;
  /** 文本字体 */
  fontFamily?: string;
  /** 文本粗细 */
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  /** 字体变体 */
  fontVariant?: 'normal' | 'small-caps' | string;
  /** 文本行高 */
  lineHeight?: number;
  letterSpacing?: number;
  miterLimit?: number;
  padding?: number;
  whiteSpace?: 'pre';
  leading?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  // dropShadow?: boolean;
  // dropShadowDistance?: number;
}
export class Text extends DisplayObject<TextStyleProps> {
  constructor({ style, ...rest }: DisplayObjectConfig<TextStyleProps>) {
    super({
      type: SHAPE.Text,
      style: {
        opacity: 1,
        fillOpacity: 1,
        strokeOpacity: 1,
        text: '',
        fontSize: 12,
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontVariant: 'normal',
        textAlign: 'start',
        textBaseline: 'alphabetic',
        // dropShadow: false,
        // dropShadowAlpha: 1,
        // dropShadowAngle: Math.PI / 6,
        // dropShadowBlur: 0,
        // dropShadowColor: '#000',
        // dropShadowDistance: 5,
        fill: '#000',
        letterSpacing: 0,
        lineHeight: 0,
        lineJoin: 'miter',
        lineCap: 'butt',
        lineWidth: 0,
        miterLimit: 10,
        padding: 0,
        stroke: '#000',
        whiteSpace: 'pre',
        wordWrap: false,
        wordWrapWidth: 100,
        leading: 0,
        ...style,
      },
      ...rest,
    });
  }
}