<template>
    <div class="const-info-comp panel panel-default">
        <div class="panel-heading">
            Sat. Constellation Parameters
        </div>
        <div class="panel-body row">
            <div class="col-xs-4 col-sm-3 col-md-4 form-group">
                <label for="satCount">Sat. Count</label><input class="form-control" name="satCount" v-model="satCount">
            </div>
            <div class="col-xs-4 col-sm-3 col-md-4 form-group">
                <label for="orbAltInput">Orbit Altitude</label>
                <input class="form-control form-control-units" name="orbAltInput" v-model="orbAlt">
                <span class="form-control-units-label">{{units}}</span>
            </div>
            <div class="col-xs-4 col-sm-3 col-md-4 form-group">
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
<style scopes>
/*
 * might need more precise sizing
*/
input.form-control {
    width: 80%;
    display: inline-block;
}
span.form-control-units-label {
    width: 10%;
    display: inline-block;
}
</style>
<script>
import ButtonGroup from './ButtonGroup'

export default {
    name: 'SatConstParams',
    components: {ButtonGroup},
    props: {
        initialUnits: {
            default: 'm',
            validator: function (val) {
                return val === 'm' || val === 'km';
            }
        },
        initialOrbAlt: {
            type: Number,
            default: 200000
        },
        initialSatCount: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            units: this.initialUnits,
            unitLabels: [
                {name: 'm', label: 'm'},
                {name: 'km', label: 'km'}
            ],
            orbAltMeters: this.initialOrbAlt,
            satCount: this.initialSatCount
        };
    },
    computed: {
        orbAlt: {
            get: function () {
                if (this.units === 'km') {
                    return this.orbAltMeters/1000;
                } else {
                    return this.orbAltMeters;
                }
            },
            set: function (val) {
                if (this.units === 'km') {
                    this.orbAltMeters = val*1000;
                } else {
                    this.orbAltMeters = val;
                }
            }
        }
    },
    methods: {
        setUnits: function (units) {
            this.units = units;
        }
    }
}
</script>