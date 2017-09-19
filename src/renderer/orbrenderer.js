/**
 * @class OrbRenderer
 * This class draws a bunch of cirlces on the canvas in a way
 * that illustrates the orbits of the satellites (or it will when it's finished)
 * 
 * This sets up webgl attribs/buffers, uniforms, etc.
 * 
 * It should disable any attributes it enables
 * 
 * In it's current state this class only draws a single, fading circle in the middle of the canvas.
 * This class needs a lot of work to get it drawing what it needs to draw.
 * 
 * TODO:
 * Draw circles based on values passed in through a buffer/attrib, not uniforms 
 * generate the geometry for circles and elipses rather than doing that logic in the shader
 */

var ClassBuilder = require('class-builder');
var Shaders = require('./shaders');

ClassBuilder.new('OrbRenderer');
ClassBuilder.field('gl');
ClassBuilder.require('gl');
ClassBuilder.field('circleMaxRad');
ClassBuilder.default('circleMaxRad', 0.2);
ClassBuilder.field('circleMinRad');
ClassBuilder.default('circleMinRad', 0.1);
ClassBuilder.field('circlePos');
ClassBuilder.default('circlePos', new Float32Array([0, 0]));

/**
 * @constructor
 * constructor for the renderer. Takes an args object
 * @param {object} args
 * gl - required - the WebGL graphics context from the canvas
 * circleMaxRad - defaults to 0.2 - the max radius of the only circle this thing draws at the moment
 * circleMinRad - defaults to 0.1 - not currently in use
 * circlePos - defaults to 0,0 - not currently in use
 */
ClassBuilder.init = function (args) {
    var gl = this.gl;
    Shaders.init(gl);
    this.shader = Shaders.circleProgram;
    this.setupShader();
};
var OrbRenderer = ClassBuilder.build();

/**
 * @method setupShader
 * Basically setups up the renderer.
 * Creates the buffers and grabs the attrib and uniform location pointers.
 */
OrbRenderer.prototype.setupShader = function () {
    var gl = this.gl;
    var shader = this.shader;

    this.vertBuffer = gl.createBuffer();
    this.vertAttribLoc = gl.getAttribLocation(shader, 'pos');
    this.circlePosUniLoc = gl.getUniformLocation(shader, 'circlePos');
    this.circleMaxRadUniLoc = gl.getUniformLocation(shader, 'circleMaxRad');
    this.circleMinRadUniLoc = gl.getUniformLocation(shader, 'circleMinRad');
    this.bufferDataDirty = true;
    this.uniformDataDirty = true;
};

/**
 * @method setUniforms
 * Sets the values for the uniform variables in the shader
 */
OrbRenderer.prototype.setUniforms = function () {
    var gl = this.gl;
    gl.uniform2fv(this.circlePosUniLoc, this.circlePos);
    gl.uniform1f(this.circleMaxRadUniLoc, this.circleMaxRad);
    gl.uniform1f(this.circleMinRadUniLoc, this.circleMinRad);
};

/**
 * @method bufferData
 * Puts the data into the buffers
 */
OrbRenderer.prototype.bufferData = function () {
    var gl = this.gl;

    var tempBuffer = new Float32Array([
        -1, 1, 0.5, // TL
        -1, -1, 0.5, // BL
        1, -1, 0.5, // BR

        1, -1, 0.5, // BR
        1, 1, 0.5, // TR
        -1, 1, 0.5, // TL
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, tempBuffer, gl.STATIC_DRAW);
};

/**
 * @method enableAttribs
 * "turns on" the attrib locations for use in the next draw call
 */
OrbRenderer.prototype.enableAttribs = function () {
    var gl = this.gl;
    gl.enableVertexAttribArray(this.vertAttribLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.vertexAttribPointer(this.vertAttribLoc, 3, gl.FLOAT, false, 0, 0);
};

/**
 * @method disableAttribs
 * disables all of the attribs so other people using the same gl context
 * can use any attribs they want
 */
OrbRenderer.prototype.disableAttribs = function () {
    var gl = this.gl;
    gl.disableVertexAttribArray(this.vertAttribLoc);
};

/**
 * @method render
 * If the dirty flags are set, will set the uniform data or buffer data,
 * enables the attribs, and calls drawArrays
 * 
 * calls disableAttribs afterwards for housekeeping
 */
OrbRenderer.prototype.render = function () {
    var gl = this.gl;

    gl.useProgram(this.shader);

    if (this.bufferDataDirty) {
        this.bufferData();
        this.bufferDataDirty = false;
    }
    if (this.uniformDataDirty) {
        this.setUniforms();
        this.uniformDataDirty = false;
    }

    this.enableAttribs();

    var vertCnt = 6;
    gl.drawArrays(gl.TRIANGLES, 0, vertCnt);

    this.disableAttribs();
};

module.exports = OrbRenderer;