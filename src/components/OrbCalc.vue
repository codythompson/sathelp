<template>
    <div class="orb-calc-comp">
        <planet-picker :celBodies="celBodies" :initialCelBody="celBodies.kerbin.name"></planet-picker>
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
            celBodies: celBodiesInfo
        }
    },
    // computed: {
    //     celBodies: function () {
    //         return celBodiesInfo
    //     }
    // }
}
</script>