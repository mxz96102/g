#pragma glslify: import('@antv/g-shader-components/common.glsl')
#pragma glslify: import('@antv/g-shader-components/scene.both.glsl')
#pragma glslify: import('@antv/g-shader-components/material.phong.glsl')
#pragma glslify: import('@antv/g-shader-components/light.both.glsl')

#pragma glslify: import('@antv/g-shader-components/batch.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/uv.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/map.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/bumpmap.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/specularmap.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/bsdf.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/wireframe.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/fog.declaration.frag')
#pragma glslify: import('@antv/g-shader-components/light.phong.declaration.frag')

in vec3 v_ViewPosition;
in vec3 v_Normal;

void main() {
  #pragma glslify: import('@antv/g-shader-components/batch.frag')

  // diffusemap
  #pragma glslify: import('@antv/g-shader-components/map.frag')
  // specularmap
  #pragma glslify: import('@antv/g-shader-components/specularmap.frag')
  // bumpmap & normalmap
  #pragma glslify: import('@antv/g-shader-components/normal.frag')
  #pragma glslify: import('@antv/g-shader-components/normalmap.frag')

  gbuf_color = u_Color;
  gbuf_color.a = gbuf_color.a * u_Opacity;

  vec4 diffuseColor = gbuf_color;
  ReflectedLight reflectedLight = ReflectedLight(vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ));
  vec3 totalEmissiveRadiance = u_Emissive;

  // calculate lighting accumulation
  #pragma glslify: import('@antv/g-shader-components/light.phong.frag')
  #pragma glslify: import('@antv/g-shader-components/light.begin.frag')
  #pragma glslify: import('@antv/g-shader-components/light.end.frag')

  vec3 outgoingLight = reflectedLight.directDiffuse +
    reflectedLight.indirectDiffuse + 
    reflectedLight.directSpecular + 
    reflectedLight.indirectSpecular + 
    totalEmissiveRadiance;

  #pragma glslify: import('@antv/g-shader-components/output.frag')
  #pragma glslify: import('@antv/g-shader-components/wireframe.frag')
  #pragma glslify: import('@antv/g-shader-components/fog.frag')
}