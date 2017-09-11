<template>
    <div class="orb-calc-comp">
        <planet-picker :celBodies="celBodies" :initiallySelected="'kerbin'"></planet-picker>
    </div>
</template>

<script>
import PlanetPicker from './PlanetPicker'
import celBodiesInfo from '../data/celBodiesInfo.json'

export default {
    name: 'OrbCalc',
    components: {
        PlanetPicker
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