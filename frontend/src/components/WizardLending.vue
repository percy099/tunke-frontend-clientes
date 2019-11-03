<template>
    <div class="">
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Finalizar" @on-complete="onComplete"
        step-size="sm" id="container">
            <tab-content title="Identifícate" class="">
               <Step1Lending></Step1Lending>
            </tab-content>
            <tab-content title="Elige tu campaña" class="">
                <Step2Lending></Step2Lending>
            </tab-content>
            <tab-content title="Simula tu préstamo" class="">
                <Step3Lending></Step3Lending>
            </tab-content>
            <tab-content title="Elige tu cuenta" class="">
                <Step4Lending></Step4Lending>
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>

import Step1Lending from "@/components/Step1Lending.vue";
import Step2Lending from '@/components/Step2Lending.vue';
import Step3Lending from '@/components/Step3Lending.vue';
import Step4Lending from '@/components/Step4Lending.vue';

import {mapState, mapActions} from 'vuex';
import router from '@/router.js'
import Swal from 'sweetalert2'

export default {
    
    
    
    
    components:{
        Step1Lending,
        Step2Lending,
        Step3Lending,
        Step4Lending
    }

}
</script>