<template>
    <div class="orb-calc-comp">
        <planet-picker :celBodies="celBodies" :initiallySelected="'kerbin'"></planet-picker>
        <planet-info :bodyInfo="celBodies[2]"></planet-info>
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
            celBodies: celBodiesInfo.stock
        }
    },
    // computed: {
    //     celBodies: function () {
    //         return celBodiesInfo
    //     }
    // }
}
</script>