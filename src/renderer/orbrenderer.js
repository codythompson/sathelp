var vert_src = `
void main () {
}
`;
var frag_src = `
uniform vec2 circlePos;
uniform float circleMaxRad;
uniform float circleMinRad;
void main () {
    float dist = distance(gl_FragCoord.xy, circlePos);
    
    vec4 circColor = vec4(1.0, 1.0, 1.0, 1.0);
	vec4 bgColor = vec4(1.0, 0.0, 0.0, 1.0);
    
    float circMag = clamp(max(maxRad-dist, 0.0) * max(dist-minRad, 0.0), 0.0, 1.0);
    
    fragColor = (circMag*circColor) + ((1.0-circMag)*bgColor);
}
`;