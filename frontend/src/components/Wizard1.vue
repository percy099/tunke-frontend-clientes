<template>
    <div>
        
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" back-button-text="Atrás" finish-button-text="Finalizar" @on-complete="onComplete">
            <tab-content title="Identifícate">
               <Step1NoClient></Step1NoClient>
            </tab-content>
            <tab-content title="Elige tu cuenta">
                Segundo paso
            </tab-content>
            <tab-content title="Términos y condiciones">
                Tercer paso
            </tab-content>
            <tab-content title="Resumen">
                Cuarto paso
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>
import Step1NoClient from "@/components/Step1NoClient.vue"
export default {
    components:{
        Step1NoClient
    }
}
</script>