<template>
    <div class="const-info-comp panel panel-default">
        <div class="panel-heading">
            Sat. Constellation Parameters
        </div>
        <div class="panel-body row">
            <div class="col-xs-4 col-sm-3 col-md-4 form-group">
                <label for="satCount">Sat. Count</label>
                <input class="form-control" name="satCount" :value="satCount" v-on:input="satCountInput">
            </div>
            <div class="col-xs-4 col-sm-3 col-md-4 form-group">
                <label for="orbAltInput">Orbit Altitude</label>
                <input class="form-control form-control-units" name="orbAltInput" :value="formattedOrbAlt" v-on:input="orbAltInput">
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
        orbAlt: {
            type: Number,
            requires: true,
        },
        satCount: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            units: this.initialUnits,
            unitLabels: [
                {name: 'm', label: 'm'},
                {name: 'km', label: 'km'}
            ]
        };
    },
    computed: {
        formattedOrbAlt: function () {
            var val = this.orbAlt;
            if (this.units === 'km') {
                val /= 1000;
            }
            return val;
        }
    },
    methods: {
        setUnits: function (units) {
            this.units = units;
        },
        getOrbAlt: function (formVal) {
            var val = Number(formVal.trim());
            if (this.units === 'km') {
                val *= 1000;
            }
            return val;
        },
        orbAltInput: function (e) {
            var val = this.getOrbAlt(e.target.value);
            // TODO VALIDATION!!!
            this.$emit('param-change', {
                field: 'orbAlt',
                newVal: val
            });
        },
        satCountInput: function (val) {
            var val = Number(e.target.value.trim());
            // TODO VALIDATION!!!
            this.$emit('param-change', {
                field: 'satCount',
                newVal: val
            });
        },
    }
}
</script>