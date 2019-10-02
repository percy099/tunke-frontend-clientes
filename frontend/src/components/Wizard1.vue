<template>
    <div class="">
        
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container>
            <tab-content title="Identifícate">
                Primer paso
            </tab-content>
            <tab-content title="Permítenos conocerte">
                <div id="form2">
                    <h2 id="IngDatos">INGRESA TUS DATOS</h2>
                    <h6>Nos interesa conocerte para poder brindarte nuestros servicios a tu medida</h6>
                    <br><br>
                    <form>
                        <div class="form-group row">
                            <label for="TelfCel" class="col-sm-2 col-form-label">Telefono Celular:</label>
                            <div class="col-sm-10 inputs">
                                <input type="text" class="form-control inputs" id="TelfCel" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="TelfCelOp" class="col-sm-2 col-form-label">Teléfono Celular Alternativo:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control inputs" id="TelfCelOp" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="Correo" class="col-sm-2 col-form-label">Correo Electrónico:</label>
                            <div class="col-sm-10 inputs">
                                <input type="text" class="form-control inputs" id="Correo" value="email@example.com">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="CorreoAlt" class="col-sm-2 col-form-label">Correo Electrónico Alternativo:</label>
                            <div class="col-sm-10 inputs">
                                <input type="text" class="form-control inputs" id="CorreoAlt" value="email@example.com">
                            </div>
                        </div>
                    </form>
                </div>
            </tab-content>
            <tab-content title="Elige tu cuenta" class="">
                <Step3NoClient></Step3NoClient>
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>S

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