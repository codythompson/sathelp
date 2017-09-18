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
            if (this.units === 'km') {
                return valInMeters/1000;
            } else {
                return valInMeters;
            }
        }
    }
}
</script>