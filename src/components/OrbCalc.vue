<template>
    <div class="orb-calc-comp">
        <planet-picker
            :celBodies="celBodies"
            :initiallySelected="selectedName"
            v-on:picked="pickedPlanet">
        </planet-picker>
        <sat-const-params></sat-const-params>
    </div>
</template>

<script>
import celBodiesInfo from '../data/celBodiesInfo.json'
import PlanetPicker from './PlanetPicker'
import SatConstParams from './SatConstParams'

export default {
    name: 'OrbCalc',
    components: {
        PlanetPicker,
        SatConstParams
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