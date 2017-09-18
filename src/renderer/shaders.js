var vertSrc = `
attribute vec3 pos;
void main () {
    gl_Position = vec4(pos, 1);
}
`;
var fragSrc = `
uniform lowp vec2 circlePos;
uniform lowp float circleMaxRad;
uniform lowp float circleMinRad;
void main () {
    lowp float dist = distance(gl_FragCoord.xy, circlePos);
    
    lowp vec4 circColor = vec4(1.0, 1.0, 1.0, 1.0);
	lowp vec4 bgColor = vec4(1.0, 0.0, 0.0, 1.0);
    
    lowp float circMag = clamp(max(circleMaxRad-dist, 0.0) * max(dist-circleMinRad, 0.0), 0.0, 1.0);
    
    gl_FragColor = (circMag*circColor) + ((1.0-circMag)*bgColor);
}
`;

var Shaders = {
    circleVertSrc: vertSrc,
    circleFragSrc: fragSrc,

    circleProgram: null,

    init: function (gl) {
        this.circleProgram = this.compileShaderProgram(gl, this.circleVertSrc, this.circleFragSrc);
    },

    /**
     * Creates and compiles a shader program.
     * 
     * adapted from:
     * https://webglfundamentals.org/webgl/lessons/webgl-boilerplate.html
     *
     * @param {!WebGLRenderingContext} gl The WebGL Context.
     * @param {string} vertexSource The GLSL source code for the vertex shader.
     * @param {string} fragmentSource The GLSL source code for the fragment shader.
     * @param {number} shaderType The type of shader, VERTEX_SHADER or
     *     FRAGMENT_SHADER.
     * @return {!WebGLShader} The shader.
     */
    compileShaderProgram: function (gl, vertexSource, fragmentSource) {
        // Create the shader object
        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

        // Set the shader source code.
        gl.shaderSource(vertShader, vertexSource);
        gl.shaderSource(fragShader, fragmentSource);

        // Compile the vertex shader
        gl.compileShader(vertShader);
        var success = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw '[Shaders][compileShader] couldn\'t compile vertex shader ' + gl.getShaderInfoLog(vertShader);
        }

        // Compile the fragment shader
        gl.compileShader(fragShader);
        success = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw '[Shaders][compileShader] couldn\'t compile fragment shader ' + gl.getShaderInfoLog(fragShader);
        }

        // create the shader program
        var program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw '[Shaders][compileShader] couldn\'t link shaders ' + gl.getProgramInfoLog(program);
        }

        return program;
    }
}

module.exports = Shaders;
