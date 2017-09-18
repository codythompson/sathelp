<template>
    <div class="planet-picker-comp panel panel-default">
        <div class="panel-heading">
            Orbital Body
        </div>
        <div class="panel-body">
            <button-group
                :buttonLabels="celBodies"
                :initiallySelected="selectedName"
                v-on:selected="buttonClicked">
            </button-group>
            <planet-info :bodyInfo="selectedBody"></planet-info>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import ButtonGroup from './ButtonGroup'
import PlanetInfo from './PlanetInfo'

export default {
    name: 'PlanetPicker',
    components: {
        ButtonGroup,
        PlanetInfo
    },
    props: {
        celBodies: {
            type: Array,
            required: true
        },
        initiallySelected: {
            type: [String, Number],
            default: 0
        }
    },
    data () {
        var selIx;
        if (typeof this.initiallySelected === 'number') {
            selIx = this.initiallySelected;
        } else if (typeof this.initiallySelected === 'string') {
            selIx = this.getIndexFromName(this.initiallySelected);
        }
        return {
            selectedIndex: selIx
        }
    },
    computed: {
        selectedName: {
            get: function () {
                return this.celBodies[this.selectedIndex].name;
            },
            set: function (newName) {
                this.selectedIndex = _.findIndex(this.celBodies, {name: newName});
            }
        },
        selectedBody: function () {
            return this.celBodies[this.selectedIndex];
        },
    },
    methods: {
        getIndexFromName: function (name) {
            return _.findIndex(this.celBodies, {name: name});
        },
        buttonClicked: function (name) {
            this.selectedIndex = this.getIndexFromName(name);
            this.$emit('picked', {
                name: name,
                index: this.selectedIndex,
                bodyInfo: this.celBodies[this.selectedIndex]
            });
        }
    }
}
</script>