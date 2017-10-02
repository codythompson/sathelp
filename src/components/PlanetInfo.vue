<template>
    <div class="planet-info-comp">
        <div class="row">
            <div class="col-xs-4 col-sm-3 col-md-4">
                <label>Radius:</label>
                <span>{{radius}}{{units}}</span>
            </div>
            <div class="col-xs-4 col-sm-3 col-md-4">
                <label>Grav. Accel.:</label>
                <span>{{gravAccel}}{{units}}/s<span class="exponent">2</span></span>
            </div>
            <div class="col-xs-4 col-sm-3 col-md-4">
                <button-group
                    :buttonLabels="unitLabels"
                    :selected="units"
                    v-on:selected="setUnits"
                    class="btn-group-xs">
                </button-group>
            </div>
        </div>
    </div>
</template>

<script>
import DistanceFormatter from '../DistanceFormatter'

import ButtonGroup from './ButtonGroup'

// TODO make a unit converter
export default {
    name: 'PlanetInfo',
    components: {ButtonGroup},
    props: {
        bodyInfo: Object,
        initialUnits: {
            default: DistanceFormatter.UnitKeys.Meters,
            validator: function (val) {
                return val in DistanceFormatter.UnitInfo;
            }
        },
        // initialUnits: {
        //     default: 'm'
        // },
        accelDecimalPlaces: {
            type: Number,
            default: 5
        }
    },
    data: function () {
        return {
            unitLabels: DistanceFormatter.ButtonGroupLabels,
            distFormatter: new DistanceFormatter({
                units: this.initialUnits
            })
        };
    },
    computed: {
        units: function () {
            return this.distFormatter.units;
        },
        radius: function () {
            var rad = this.bodyInfo.radius;

            if (typeof rad !== 'number') {
                return '?';
            }

            return this.distFormatter.format(rad);
        },
        gravAccel: function () {
            var accel = this.bodyInfo.grav_sea_level;

            if (typeof accel !== 'number') {
                return '?';
            }

            return this.distFormatter.format(accel);
        }
    },
    methods: {
        setUnits: function (units) {
            this.distFormatter.units = units;
        }
    }
}
</script>