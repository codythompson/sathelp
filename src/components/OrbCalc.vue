<template>
    <div class="orb-calc-comp">
        <planet-picker
            :celBodies="celBodies"
            :initiallySelected="selectedName"
            v-on:picked="pickedPlanet">
        </planet-picker>
        <planet-info :bodyInfo="selectedBody"></planet-info>
    </div>
</template>

<script>
import PlanetPicker from './PlanetPicker'
import PlanetInfo from './PlanetInfo'
import celBodiesInfo from '../data/celBodiesInfo.json'

export default {
    name: 'OrbCalc',
    components: {
        PlanetPicker,
        PlanetInfo
    },
    data () {
        return {
            selectedBodyIx: 2, // TODO set this from a prop
            celBodies: celBodiesInfo.stock
        }
    },
    computed: {
        selectedBody: function () {
            return this.celBodies[this.selectedBodyIx];
        },
        selectedName: function () {
            return this.selectedBody.name;
        }
    },
    methods: {
        pickedPlanet: function (e) {
            this.selectedBodyIx = e.index;
        }
    }
    // computed: {
    //     celBodies: function () {
    //         return celBodiesInfo
    //     }
    // }
}
</script>