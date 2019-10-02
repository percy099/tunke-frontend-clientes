<template>
    <div class="">
        
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container"
        >
            <tab-content title="Identifícate">
                Primer paso
            </tab-content>
            <tab-content title="Permítenos conocerte">
                <h2 class="text-center">Segundo paso</h2>
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

import Step3NoClient from '@/components/Step3NoClient.vue'

export default {
    methods:{
        onComplete: function(){
            alert('Creaste tu cuenta');
        }
    },
    components:{
        Step3NoClient
    }
}
</script>