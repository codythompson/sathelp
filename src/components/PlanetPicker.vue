<template>
    <div class="planet-picker-comp panel panel-default">
        <div class="panel-heading">
            Orbital Body
        </div>
        <div class="panel-body">
            <button-group
                :buttonLabels="celBodies"
                :selected="selectedName"
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
        selectedPlanet: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            isMounted: false,
            isSmall: window.innerWidth < smallScreenThreshold,
            smallScreenThreshold: smallScreenThreshold
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
        selectedName: function () {
            return this.celBodies[this.selectedPlanet].name;
        },
        selectedBody: function () {
            return this.celBodies[this.selectedPlanet];
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
            var selectedIndex = this.getIndexFromName(name);
            this.$emit('picked', {
                name: name,
                index: selectedIndex
            });
        }
    }
}
</script>