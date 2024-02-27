uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uOrigin;
uniform vec3 uApex;
uniform float uApexPosition;

attribute float aSize;
attribute float aTimeMultiplier;

void main()
{
    // Position
    vec3 newPosition = position;

    // Progress
    float progress = uProgress;


    // Shooting
    float shootingProgress = progress;
    shootingProgress = clamp(shootingProgress, 0.0, 1.0);
    vec3 lerp1 = mix(uOrigin, uApex, shootingProgress);
    vec3 lerp2 = mix(uApex, position, shootingProgress);
    newPosition = mix(lerp1, lerp2, shootingProgress);

    // Twinkling
    float divisor = 0.125;
    float sizeTwinkling = ((sin(progress * 30.0) * divisor) + divisor) + ((sin(progress * 25.0) * divisor) + divisor) + ((sin(progress * 20.0) * divisor) + divisor) + ((sin(progress * 26.0) * divisor) + divisor);
    sizeTwinkling = 0.5 + (sizeTwinkling * 0.5);

    // Final Position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final Size
    gl_PointSize = uSize * uResolution.y * aSize * sizeTwinkling; // * sizeProgress * sizeTwinkling
    gl_PointSize *= (1.0 / -viewPosition.z);
}