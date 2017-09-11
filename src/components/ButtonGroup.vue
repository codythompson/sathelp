<template>
    <div class="button-group-comp btn-group">
        <button
            v-for="labelInfo in buttonLabels"
            v-bind:key="labelInfo.name"
            :name="labelInfo.name"
            :class="classObject(labelInfo.name)"
            @click="handleClick">
                {{labelInfo.label}}
        </button>
    </div>
</template>

<script>
export default {
    name: 'ButtonGroup',
    props: {
        'initiallySelected': null,
        'buttonLabels': {
            type: Array,
            required: true
        },
    },
    data: function () {
        return {
            selected: this.initiallySelected
        };
    },
    methods: {
        handleClick: function (e) {
            this.selected = e.target.name;
            this.$emit('selected', e.target.name);
        },
        classObject: function (name) {
            return {
                'btn': true,
                'btn-default': true,
                'active': this.selected === name
            };
        }
    }
}
</script>