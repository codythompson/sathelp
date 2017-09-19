<template>
    <div class="orb-calc-comp">
        <planet-picker
            :celBodies="celBodies"
            :selectedPlanet="planetIndex"
            v-on:picked="pickedPlanet">
        </planet-picker>
        <sat-const-params
            :orbAlt="appState.orbAlt"
            :satCount="appState.satCount"
            v-on:param-change="satParamChange">
        </sat-const-params>
        <transfer-orbit
            :apoapsis="apoapsis"
            :periapsis="periapsis">
        </transfer-orbit>
    </div>
</template>

<script>
import _ from 'lodash'
import celBodiesInfo from '../data/celBodiesInfo.json'
import PlanetPicker from './PlanetPicker'
import SatConstParams from './SatConstParams'
import TransferOrbit from './TransferOrbit'

export default {
    name: 'OrbCalc',
    components: {
        PlanetPicker,
        SatConstParams,
        TransferOrbit
    },
    props: {
        appState: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            celBodies: this.appState.celBodyInfo.stock
        }
    },
    computed: {
        planetIndex: function () {
            return this.appState.selectedPlanetIx;
        },
        planet: function () {
            return this.celBodies[appState.selectedPlanetIx];
        },
        planetName: function () {
            return this.planet.name;
        },
        apoapsis: function () {
            return this.appState.orbAlt;
        },
        periapsis: function () {
            return this.appState.orbAlt;
        },
    },
    methods: {
        pickedPlanet: function (e) {
            this.$emit('state-change', {
                field: 'selectedPlanetIx',
                newVal: e.index
            });
        },
        satParamChange: function (e) {
            this.$emit('state-change', e);
        }
    }
    // computed: {
    //     celBodies: function () {
    //         return celBodiesInfo
    //     }
    // }
}
</script>