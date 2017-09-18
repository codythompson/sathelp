var ClassBuilder = require('class-builder');
var OrbRenderer = require('./orbrenderer');

ClassBuilder.new('OrbitPlayer');
ClassBuilder.field('gl');
ClassBuilder.required('gl');
ClassBuilder.field('autoUpdate');
ClassBuilder.default('autoUpdate', true);
ClassBuilder.field('autoRender');
ClassBuilder.default('autoRender', true);

ClassBuilder.init = function (args) {
    this.renderer = new OrbRenderer({
        gl: this.gl
    });

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.lastUpdate = Date.now();
    if (this.autoUpdate) {
        this.update();
    }
    if (this.autoRender) {
        this.render();
    }
};
var OrbitPlayer = ClassBuilder.build();

OrbitPlayer.update = function () {
    var ts = Date.now();
    var dt = ts - this.lastUpdate;
    this.lastUpdate = ts;

    // if autoUpdate is set, call this again the next time
    // the browser draws the page
    if (this.autoUpdate) {
        requestAnimationFrame(this.update);
    }
};

OrbitPlayer.render = function () {
    this.renderer.render();

    // if autoUpdate is set, call this again the next time
    // the browser draws the page
    if (this.autoRender) {
        requestAnimationFrame(this.render);
    }
};

module.exports = OrbitPlayer;