<template>
    <div class="">
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container">
            <tab-content title="Identifícate">
               <Step1NoClient></Step1NoClient>
            </tab-content>
            <tab-content title="Permítenos conocerte">
                <Step2NoClient></Step2NoClient>
            </tab-content>
            <tab-content title="Elige tu cuenta" class="">
                <Step3NoClient></Step3NoClient>
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>

import Step1NoClient from "@/components/Step1NoClient.vue"
import Step2NoClient from '@/components/Step2NoClient.vue'
import Step3NoClient from '@/components/Step3NoClient.vue'

export default {
    methods:{
        onComplete: function(){
            //TODO Lógica de crear cuenta
            this.$router.push('/summarySale');
        }
    },
    components:{
        Step1NoClient,
        Step2NoClient,
        Step3NoClient
    }

}
</script>