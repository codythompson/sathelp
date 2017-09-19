/**
 * Renders a representation of the planet and satellites using WebGL
 * (when it's done anyways)
 * @class OrbitPlayer
 */
var ClassBuilder = require('class-builder');
var OrbRenderer = require('./orbrenderer');

ClassBuilder.new('OrbitPlayer');
ClassBuilder.field('gl');
ClassBuilder.require('gl');
ClassBuilder.field('autoUpdate');
ClassBuilder.default('autoUpdate', true);
ClassBuilder.field('autoRender');
ClassBuilder.default('autoRender', true);

/**
 * @constructor
 * Constructor for the player. Takes an args object
 * @param {object} args
 * gl - required - the WebGL graphics context from the canvas
 * autoUpdate - defaults to true - Whether or not to continuously call update
 * autoRender - defaults to true - Whether or not to continuously call render
 */
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

/**
 * @method update
 * Updates all of the draw logic (or will when it's added)
 * If autoUpdate is true, called automaticall and endlessly
 */
OrbitPlayer.prototype.update = function () {
    var ts = Date.now();
    var dt = ts - this.lastUpdate;
    this.lastUpdate = ts;

    // if autoUpdate is set, call this again the next time
    // the browser draws the page
    if (this.autoUpdate) {
        requestAnimationFrame(this.update);
    }
};

/**
 * @method render
 * Tells the renderer that it's time to render
 * If autoUpdate is true, called automaticall and endlessly
 */
OrbitPlayer.prototype.render = function () {
    this.renderer.render();

    // if autoUpdate is set, call this again the next time
    // the browser draws the page
    if (this.autoRender) {
        requestAnimationFrame(this.render);
    }
};

module.exports = OrbitPlayer;