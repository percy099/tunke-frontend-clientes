<template>
    <div>
        <div id="body">
            <h2>Ingresa tus datos</h2>
            <h6 id="Conocerte">Nos interesa conocerte para poder brindarte nuestros servicios a tu medida.</h6>
            <br>
            <div class="container">
                <form action="/action_page.php">
                    <div class="row">
                        <div class="col-25">
                            <label for="phone1">Teléfono Celular:</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="phone1" name="phoneNumber1">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="phone2">Teléfono Celular Alternativo:</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="phone2" name="phoneNumber1">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="email1">Correo Electrónico:</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="email1" name="emailNumber1">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="email2">Correo Electrónico Alternativo:</label>
                        </div>
                        <div class="col-75">
                            <input type="text" id="email2" name="emailNumber2">
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