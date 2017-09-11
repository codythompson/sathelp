<template>
    <div class="planet-picker-comp">
        <h3>
            Orbital Body
        </h3>
        <button-group
            :buttonLabels="celBodies"
            :initiallySelected="selectedName"
            v-on:selected="buttonClicked">
        </button-group>
    </div>
</template>

<script>
import ButtonGroup from './ButtonGroup'
import _ from 'lodash'

export default {
    name: 'PlanetPicker',
    components: {
        ButtonGroup
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
        }
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