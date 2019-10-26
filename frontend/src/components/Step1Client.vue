<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola Solange Palomino!</h1>
            <h2>71621904</h2>
            <div class="text-center"> 
                <router-link :to="{path : '/openingDNI'}" href="#">¿Este no es tu DNI?</router-link>
            </div>
            <p></p>
            <button :disabled='isDisabledButton' type='button' class="btn btn-primary text-white btn-lg bnt-md btn-block" @clicK="disabled()">Enviar código por SMS a ******157</button>            
            <button :disabled='isDisabled' type='button' class="btn btn-primary text-white btn-lg bnt-md btn-block" @clicK.once="disabled()">Enviar correo a pepe***@pucp.pe</button>
            <p></p>
            <h2>Ingresa el código que te enviamos:</h2>
            Código de Verificación: <input id="code" type="text" v-model='number'/><p></p>
            <circular-count-down-timer 
                :initial-value="30"
                :steps="30" 
                :size=100
                :paused=true>
            </circular-count-down-timer>                 
        </div>
    </div>
</template>

<style src="@/styles/Step1Client.css" scoped>

</style>

<script>

import {mapState,mapActions} from 'vuex'

export default {
    name : 'Step1NoClient',
    data(){
        return{
            number: '',
            option: false,
        };
    },
    computed:{
        isDisabledButton: function(){
            return !this.option;
        }
    },
    methods:{
        disabled(){           
            number = number + 1;
        }
    },
    mounted() {
        console.log(this.securityQuestions);
    },
}
</script>