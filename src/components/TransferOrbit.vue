<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            Calculated Transfer Orbit
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-4 col-sm-3 col-md-4 form-group">
                    <label>Apoapsis</label>
                    <input readonly class="form-control" :value="formattedApo">
                    <span class="form-control-units-label">{{units}}</span>
                </div>
                <div class="col-xs-4 col-sm-3 col-md-4 form-group">
                    <label>Periapsis</label>
                    <input readonly class="form-control" :value="formattedPeri">
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
    </div>
</template>
<style scoped>
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
import DistanceFormatter from '../DistanceFormatter'

import ButtonGroup from './ButtonGroup'

export default {
    name: 'TransferOrbit',
    components: {ButtonGroup},
    props: {
        apoapsis: {
            type: Number,
            required: true
        },
        periapsis: {
            type: Number,
            required: true
        }
    },
    data() {
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
        formattedApo: function () {
            return this.distFormatter.format(this.apoapsis);
        },
        formattedPeri: function () {
            return this.distFormatter.format(this.periapsis);
        }
    },
    methods: {
        setUnits: function (units) {
            this.distFormatter.units = units;
        },
    }
}
</script>