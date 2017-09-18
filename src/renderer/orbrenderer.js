var ClassBuilder = require('class-builder');
var Shaders = require('./shaders');

ClassBuilder.new('OrbRenderer');
ClassBuilder.field('gl');
ClassBuilder.require('gl');
ClassBuilder.field('circleMaxRad');
ClassBuilder.default('circleMaxRad', 10);
ClassBuilder.field('circleMinRad');
ClassBuilder.default('circleMaxRad', 0);
ClassBuilder.field('circlePos');
ClassBuilder.default('circlePos', new Float32Array([0, 0]));
ClassBuilder.init = function (args) {
    debugger;
    var gl = this.gl;
    Shaders.init(gl);
    this.shader = Shaders.circleProgram;
    this.setupShader();
};
var OrbRenderer = ClassBuilder.build();

OrbRenderer.setupShader = function () {
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

OrbRenderer.setUniforms = function () {
    var gl = this.gl;
    gl.uniform2fv(this.circlePosUniLoc, this.circlePos);
    gl.uniform1f(this.circleMaxRadUniLoc, this.circleMaxRad);
    gl.uniform1f(this.circleMinUniLoc, this.circleMinRad);
};

OrbRenderer.bufferData = function () {
    var gl = this.gl;

    var tempBuffer = new Float32Array([
        -1, 1, 0.5, 1, // TL
        -1, -1, 0.5, 1, // BL
        1, -1, 0.5, 1, // BR

        1, -1, 0.5, 1, // BR
        1, 1, 0.5, 1, // TR
        -1, 1, 0.5, 1, // TL
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, tempBuffer, gl.STATIC_DRAW);
};

OrbRenderer.enableAttribs = function () {
    var gl = this.gl;
    gl.enableVertexAttribArray(this.vertAttribLoc);
    gl.vertexAttribPointer(gl.ARRAY_BUFFER, 3, gl.FLOAT, false, 0, 0);
};

OrbRenderer.disableAttribs = function () {
    var gl = this.gl;
    gl.disableVertexAttribArray(this.vertAttribLoc);
};

OrbRenderer.render = function () {
    this.enableAttribs();

    if (this.bufferDataDirty) {
        this.bufferData();
    }
    if (this.uniformDataDirty) {
        this.setUniforms();
    }

    var gl = this.gl;
    var vertCnt = 6;
    gl.drawArrays(gl.TRIANGLES, 0, vertCnt);

    this.disableAttribs();
};

module.exports = OrbRenderer;