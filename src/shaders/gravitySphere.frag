uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uEdgeIntensity; // 1.4
uniform float uGlowStrength;  // 0.6
uniform float uColorShiftSpeed; // 0.2

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Fresnel effect (Rim lighting)
    float fresnel = pow(1.0 - dot(normal, viewDir), uEdgeIntensity);
    
    // Animated gradient (Color shift)
    float mixValue = sin(vUv.x * 3.0 + uTime * uColorShiftSpeed) * 0.5 + 0.5;
    vec3 baseColor = mix(uColor1, uColor2, mixValue);
    
    // Metallic look (Specular)
    float spec = pow(max(dot(normal, vec3(0.0, 1.0, 0.0)), 0.0), 32.0);
    baseColor += spec * 0.4;
    
    // Neon edge glow
    vec3 glowColor = uColor1 * fresnel * uGlowStrength;
    
    vec3 finalColor = baseColor + glowColor;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
