<template>
    <div class="planet-picker-comp panel panel-default">
        <div class="panel-heading">
            Orbital Body
        </div>
        <div class="panel-body">
            <button-group
                :buttonLabels="celBodies"
                :initiallySelected="selectedName"
                v-on:selected="buttonClicked"
                :class="buttonGroupClass">
            </button-group>
            <planet-info :bodyInfo="selectedBody"></planet-info>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import ButtonGroup from './ButtonGroup'
import PlanetInfo from './PlanetInfo'
// const smallScreenThreshold = 512;
var smallScreenThreshold = 512;

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
            isMounted: false,
            isSmall: true,
            smallScreenThreshold: smallScreenThreshold,
            selectedIndex: selIx
        }
    },
    created: function () {
        var self = this;
        window.addEventListener('resize', function () {
            self.onResize();
        });
    },
    mounted: function () {
        this.isMounted = true;
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
        /* 
         * not triggered on resize :`(
         */
        buttonGroupClass: function () {
            return {
                'btn-group-xs': this.isSmall,
                'btn-group-sm': !this.isSmall
            };
        }
    },
    methods: {
        onResize: function () {
            this.isSmall = window.innerWidth < this.smallScreenThreshold;
        },
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