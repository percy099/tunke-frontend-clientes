<template>
    <div>
        <div id="form2">
            <h2 id="IngDatos">INGRESA TUS DATOS</h2>
            <h6 id="Conocerte">Nos interesa conocerte para poder brindarte nuestros servicios a tu medida.</h6>
            <br><br>
            <div id="forms">
                <form id="realForm">
                    <div class="form-group row">
                        <label for="TelfCel" class="labels col-sm-2 col-form-label">Telefono Celular:</label>
                        <div class="col-sm-10 inputs">
                            <input v-model="person.cellphone1" type="text" class="form-control inputs" id="TelfCel" value="">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="TelfCelOp" class="labels col-sm-2 col-form-label">Teléfono Celular Alternativo:</label>
                        <div class="col-sm-10">
                            <input v-model="person.cellphone2" type="text" class="form-control inputs" id="TelfCelOp" value="">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="Correo" class="labels col-sm-2 col-form-label">Correo Electrónico:</label>
                        <div class="col-sm-10 inputs">
                            <input v-model="person.email1" type="text" class="form-control inputs" id="Correo" value="email@example.com">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="CorreoAlt" class="labels col-sm-2 col-form-label">Correo Electrónico Alternativo:</label>
                        <div class="col-sm-10 inputs">
                            <input v-model="person.email2" type="text" class="form-control inputs" id="CorreoAlt" value="email@example.com">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style src="@/styles/Step2NoClient.css" scoped>

</style>

<script>

import {mapState} from 'vuex'

export default {
    name : 'Step2NoClient',
    computed:{
        ...mapState(['person'])
    },
    methods:{

    }
}
</script>