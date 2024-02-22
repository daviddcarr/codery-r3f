uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vSmallWaves;

#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl

void main()
{
    // Distance from center
    float distance = length(vPosition);
    float fade = 1.0 - smoothstep(0.0, 75.0, distance);

    // vec3 waveColor = vec3(1.0 - smoothstep(-0.8, 0.2, vSmallWaves));
    vec3 waveColor = vec3(vSmallWaves);

    vec3 color1 = vec3(106.0 / 255.0, 18.0 / 255.0, 233.0 / 255.0); 

    waveColor *= color1;
    waveColor *= fade;
    
    // Final color
    gl_FragColor = vec4(waveColor, 1.0);
    //gl_FragColor = vec4(normal, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}