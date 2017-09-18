<template>
    <div class="orb-viewer-comp panel panel-default">
        <div class="panel-heading">
            Orbit Viewer
        </div>
        <div class="panel-body">
            <div v-show="isError" class="alert alert-danger error">
                <strong>Orbit Viewer Error</strong>
                <p v-show="hasErrorMessage" class="message">{{errorMessage}}</p>
                <p v-show="hasErrorMessage" class="text">{{errorText}}</p>
            </div>
            <canvas class="canvas" ref="canvas"></canvas>
        </div>
    </div>
</template>
<style scoped>
div.orb-viewer-cont {
    width: 100%;
    height: 100%;
}
.canvas {
    width: 100%;
    height: 100%;
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
        }
    },
    mounted: function () {
        var canvas = this.$refs.canvas;
        var gl = canvas.getContext('webgl');
        if (!gl) {
            this.state = this.states.error;
            this.errorMessage = this.errors.noWebGL;
            return;
        }
        try {
            this.player = new OrbPlayer({

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