<template>
    <div class="orb-viewer-comp panel panel-default">
        <div class="panel-heading">
            Orbit Viewer
        </div>
        <!-- <div class="panel-body"> -->
        <div>
            <div v-show="isError" class="alert alert-danger error">
                <strong>Orbit Viewer Error</strong>
                <p v-show="hasErrorMessage" class="message">{{errorMessage}}</p>
                <p v-show="hasErrorMessage" class="text">{{errorText}}</p>
            </div>
            <canvas v-show="!isError" class="canvas" ref="canvas"></canvas>
        </div>
    </div>
</template>
<style scoped>
div.orb-viewer-cont {
    box-sizing: border-box;
    width: 100%;
}
.canvas {
    width: 100%;
}
.error p.text {
    font-family: monospace;
}
</style>
<script>
import OrbPlayer from '../renderer/orbitplayer'

export default {
    name: 'OrbViewer',
    data: function () {
        var states = {
            loading: 'loading',
            running: 'running',
            error: 'error'
        };
        var errors = {
            noWebGL: 'Your browser doesn\'t seem to support WebGL',
            badPlayerInit: 'Couldn\'t initialize the Orbit Renderer'
        };
        return {
            states: states,
            state: states.loading,
            errors: errors,
            errorMessage: null,
            errorText: null,
            isMounted: false,
            player: null,
        };
    },
    computed: {
        isLoading: function () {
            return this.isState(this.states.loading);
        },
        isRunning: function () {
            return this.isState(this.states.running);
        },
        isError: function () {
            return this.isState(this.states.error);
        },
        hasErrorMessage: function () {
            // TODO maybe do an undefined and not null check instead
            return this.errorMessage;
        },
        hasErrorText: function () {
            // TODO maybe do an undefined and not null check instead
            return this.errorText;
        }
    },
    methods: {
        isState: function (state) {
            return this.state === state;
        },
        resize: function () {
            // short circuiting this for now
            return;

            // we don't need to do this if we aren't mounted yet
            if (!this.isMounted || this.state === this.states.error) {
                return;
            }

            var canvas = this.$refs.canvas;
            var elWidth = this.$el.clientWidth;
            canvas.width = elWidth;
            canvas.height = elWidth;
            var gl = this.player.gl;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        },
    },
    mounted: function () {
        this.state = this.states.error;
        this.errorMessage = 'feature under construction';
        // short circuiting this for now
        return;

        this.isMounted = true;
        var canvas = this.$refs.canvas;
        var gl = canvas.getContext('webgl');
        window.gl = gl;
        if (!gl) {
            this.state = this.states.error;
            this.errorMessage = this.errors.noWebGL;
            return;
        }
        try {
            this.player = new OrbPlayer({
                gl: gl
            });
            this.resize();
            var self = this;
            window.addEventListener('resize', function () {
                self.resize();
            });
        } catch (e) {
            this.state = this.states.error;
            this.errorMessage = this.errors.badPlayerInit;
            console.error(e);
            this.errorText = e;
        }
    }
}
</script>