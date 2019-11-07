<template>
    <div id=step1>
        <h1>HOLA </h1>
        <div id="vueapp" class="vue-app">
            ComboBox value: {{ comboboxValue }}
            <br />
            <br />
            <kendo-combobox v-model="comboboxValue"
                            :placeholder="'Select sport...'"
                            :data-source="dataSourceArray"
                            :data-text-field="'text'"
                            :data-value-field="'value'"ч
                            :filter="'contains'">
            </kendo-combobox>
        </div>
    </div>
</template>

<style src="@/styles/Step2Lending.css" scoped>

</style>

<script>

import {mapState,mapActions} from 'vuex'

export default {
    name : 'Step3Lending',
    computed:{
       
    },
    methods:{
        
    },
    mounted() {
        
    },
}


</script>