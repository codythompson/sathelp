<template>
    <div class="planet-picker-comp">
        <select v-model="selectedCelBody" @input="planetPicked">
            <option v-for="(celBody, key) in celBodies" v-bind:key="key" :value="celBody.name">
                {{celBody.name}}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'PlanetPicker',
    props: {
        celBodies: {
            type: Object,
            required: true
        },
        initialCelBody: {
            default: '',
            type: String
        }
    },
    data () {
        return {
            selectedCelBody: this.initialCelBody
        }
    },
    methods: {
        planetPicked: function () {
            this.$emit('picked', this.selectedCelBody);
        }
    }
}
</script>