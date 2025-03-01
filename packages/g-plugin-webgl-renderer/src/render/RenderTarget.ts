import { Device, Format, RenderTarget, Texture, TextureDimension, TextureUsage } from '../platform';
import { assert } from '../platform/utils';
import { RGRenderTargetDescription } from './RenderTargetDescription';

export class RGRenderTarget {
  debugName: string;

  readonly dimension = TextureDimension.n2D;
  readonly depth = 1;
  readonly numLevels = 1;

  pixelFormat: Format;
  width: number = 0;
  height: number = 0;
  sampleCount: number = 0;
  usage: TextureUsage = TextureUsage.RenderTarget;
  immutable = true;

  needsClear: boolean = true;
  texture: Texture | null = null;
  attachment: RenderTarget;
  age: number = 0;

  constructor(device: Device, desc: Readonly<RGRenderTargetDescription>) {
    this.pixelFormat = desc.pixelFormat;
    this.width = desc.width;
    this.height = desc.height;
    this.sampleCount = desc.sampleCount;

    assert(this.sampleCount >= 1);

    if (this.sampleCount > 1) {
      // MSAA render targets must be backed by attachments.
      this.attachment = device.createRenderTarget(this);
    } else {
      // Single-sampled textures can be backed by regular textures.
      this.texture = device.createTexture(this);
      device.setResourceName(this.texture, this.debugName);

      this.attachment = device.createRenderTargetFromTexture(this.texture);
    }

    device.setResourceName(this.attachment, this.debugName);
  }

  matchesDescription(desc: Readonly<RGRenderTargetDescription>): boolean {
    return (
      this.pixelFormat === desc.pixelFormat &&
      this.width === desc.width &&
      this.height === desc.height &&
      this.sampleCount === desc.sampleCount
    );
  }

  reset(desc: Readonly<RGRenderTargetDescription>): void {
    assert(this.matchesDescription(desc));
    this.age = 0;
  }

  destroy(device: Device): void {
    if (this.texture !== null) {
      this.texture.destroy();
    }
    this.attachment.destroy();
  }
}
