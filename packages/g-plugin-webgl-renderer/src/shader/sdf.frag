#pragma glslify: import('@antv/g-shader-components/scene.both.glsl')

#pragma glslify: import('@antv/g-shader-components/batch.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/uv.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/map.declaration.frag')

varying vec4 v_Data;
varying vec2 v_Radius;
varying vec4 v_StylePacked3;

#pragma glslify: sdCircle = require('@antv/g-shader-components/sdf.circle.glsl')
#pragma glslify: sdEllipsoidApproximated = require('@antv/g-shader-components/sdf.ellipse.glsl')

void main() {
  int shape = int(floor(v_Data.w + 0.5));

  #pragma glslify: import('@antv/g-shader-components/batch.frag')
  #pragma glslify: import('@antv/g-shader-components/map.frag')

  bool omitStroke = v_StylePacked3.z == 1.0;

  float antialiasblur = v_Data.z;
  float antialiased_blur = -max(0.0, antialiasblur);
  vec2 r = (v_Radius - (omitStroke ? 0.0 : u_StrokeWidth)) / v_Radius;

  float outer_df;
  float inner_df;
  // 'circle', 'ellipse', 'rect'
  if (shape == 0) {
    outer_df = sdCircle(v_Data.xy, 1.0);
    inner_df = sdCircle(v_Data.xy, r.x);
  } else if (shape == 1) {
    outer_df = sdEllipsoidApproximated(v_Data.xy, vec2(1.0));
    inner_df = sdEllipsoidApproximated(v_Data.xy, r);
  }

  float opacity_t = smoothstep(0.0, antialiased_blur, outer_df);

  float color_t = u_StrokeWidth < 0.01 ? 0.0 : smoothstep(
    antialiased_blur,
    0.0,
    inner_df
  );

  // vec2 imagecoord = mod(v_Uv, 0.1);
  // vec4 texel = texture(SAMPLER_2D(u_Map), imagecoord);
  // u_Color = texel;

  vec4 diffuseColor = u_Color;

  vec4 strokeColor = (u_StrokeColor == vec4(0) || omitStroke) ? vec4(0.0) : u_StrokeColor;

  gl_FragColor = mix(vec4(diffuseColor.rgb, diffuseColor.a * u_FillOpacity), strokeColor * u_StrokeOpacity, color_t);
  gl_FragColor.a = gl_FragColor.a * u_Opacity * opacity_t;

  if (gl_FragColor.a < 0.001)
    discard;
}