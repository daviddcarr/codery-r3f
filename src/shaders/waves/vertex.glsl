uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vSmallWaves;

#include ../includes/perlinClassic3D.glsl

float waveElevation(vec3 position)
{
    float elevation = sin(position.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                      sin(position.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;
    return elevation;
}

float smallWaveElevation(vec3 position)
{
    float elevation = 0.0;
    for(float i = 1.0; i <= uSmallIterations; i++)
    {
        elevation += abs(perlinClassic3D(vec3(position.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }
    return elevation;
}

float smallWaveTexture(vec3 position)
{
    float elevation = 1.0;
    for(float i = 1.0; i <= uSmallIterations; i++)
    {
        elevation *= abs(perlinClassic3D(vec3(position.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)));
    }
    return elevation;  
}

void main()
{
    // Base model position
    float shift = 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 modelPositionA = modelPosition.xyz + vec3(shift, 0.0, 0.0);
    vec3 modelPositionB = modelPosition.xyz + vec3(0.0, 0.0, - shift);

    // Big Wave Elevation
    float elevation = waveElevation(modelPosition.xyz);

    float smallElevation = smallWaveElevation(modelPosition.xyz);
    modelPosition.y += elevation + smallElevation;


    modelPositionA.y += waveElevation(modelPositionA);
    modelPositionB.y += waveElevation(modelPositionB);

    // Computed Normal
    vec3 toA = normalize(modelPositionA - modelPosition.xyz);
    vec3 toB = normalize(modelPositionB - modelPosition.xyz);
    vec3 computedNormal = normalize(cross(toA, toB));

    // Final position
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Small Wave Texture
    float smallTexture = smallWaveTexture(modelPosition.xyz);

    // Varying
    vElevation = elevation;
    // vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vNormal = computedNormal;
    vPosition = modelPosition.xyz;
    vSmallWaves = smallTexture;
}