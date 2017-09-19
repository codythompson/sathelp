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
                    :initiallySelected="'m'"
                    v-on:selected="setUnits"
                    class="btn-group-xs">
                </button-group>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonGroup from './ButtonGroup'

// TODO make a unit converter
export default {
    name: 'PlanetInfo',
    components: {ButtonGroup},
    props: {
        bodyInfo: Object,
        initialUnits: {
            default: 'm',
            validator: function (val) {
                return val === 'm' || val === 'km';
            }
        },
        accelDecimalPlaces: {
            type: Number,
            default: 5
        }
    },
    data: function () {
        return {
            units: this.initialUnits,
            unitLabels: [
                {name: 'm', label: 'm'},
                {name: 'km', label: 'km'}
            ]
        };
    },
    computed: {
        radius: function () {
            var rad = this.bodyInfo.radius;

            if (typeof rad !== 'number') {
                return '?';
            }

            return this.getVal(rad);
        },
        gravAccel: function () {
            var accel = this.bodyInfo.grav_sea_level;

            if (typeof accel !== 'number') {
                return '?';
            }

            return this.getVal(accel);
        }
    },
    methods: {
        setUnits: function (units) {
            this.units = units;
        },
        getVal: function (valInMeters) {
            var val;
            if (this.units === 'km') {
                val = valInMeters/1000;
            } else {
                val = valInMeters;
            }
            val = this.round(val, this.accelDecimalPlaces);
            return val;
        },
        round: function (val, places) {
            val *= Math.pow(10, places);
            val = parseInt(Math.round(val));

            // this might result in precision errors
            // precision errors kind of make this method pointless
            val /= Math.pow(10, places);

            return val;
        }
    }
}
</script>