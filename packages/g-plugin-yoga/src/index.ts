import {
  addPropertiesHandler,
  RendererPlugin,
  parseNumber,
  parseLengthOrPercent,
  clampedMergeNumbers,
  mergeDimensions,
  mergeNumberLists,
} from '@antv/g';
import { Module, Syringe } from 'mana-syringe';
import { YogaPlugin } from './YogaPlugin';
import { YogaPluginOptions } from './tokens';

const containerModule = Module((register) => {
  register(YogaPlugin);
});

addPropertiesHandler<number, number>(
  [
    'top',
    'right',
    'bottom',
    'left',
    'marginAll',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'paddingAll',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'minWidth',
    'maxWidth',
    'minHeight',
    'maxHeight',
  ],
  parseLengthOrPercent,
  // @ts-ignore
  mergeDimensions,
  undefined,
);
addPropertiesHandler<number[], number[]>(
  ['margin', 'padding'],
  undefined,
  // @ts-ignore
  mergeNumberLists,
  undefined,
);

addPropertiesHandler<number, number>(
  ['flexGrow', 'flexShrink', 'flexBasis'],
  parseNumber,
  clampedMergeNumbers(0, Infinity),
  undefined,
);

export class Plugin implements RendererPlugin {
  private container: Syringe.Container;

  constructor(private options: Partial<YogaPluginOptions>) {}

  init(container: Syringe.Container): void {
    this.container = container;
    container.register(YogaPluginOptions, {
      useValue: {
        ...this.options,
      },
    });
    container.load(containerModule, true);
  }
  destroy(container: Syringe.Container): void {
    container.remove(YogaPluginOptions);
    container.unload(containerModule);
  }
}
