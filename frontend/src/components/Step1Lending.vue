<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola {{person.firstName}} {{person.fatherLastname}}!</h1>
            <h2>{{person.documentNumber}}</h2>
            <div class="text-center"> 
                <router-link :to="{path : '/lendingDNI'}" href="#">¿Este no es tu DNI?</router-link>
            </div>
            <p></p>
            <button :disabled="tokenSended" type='button' class="btn btn-primary text-white btn-lg bnt-md btn-block" @click="sendToSMS">Enviar código por SMS a {{hiddenNumber}}</button>            
            <button :disabled="tokenSended" type='button' class="btn btn-primary text-white btn-lg bnt-md btn-block" @click="sendToEmail">Enviar correo a {{hiddenEmail}}</button>
            <p></p>
            <h2>Ingresa el código que te enviamos:</h2>
            Código de Verificación: <input :disabled='!tokenSended' maxlength="6" id="code" type="text" class="form-control"
            v-model.trim="$v.tokenAux.$model" :class="{'is-invalid' : $v.tokenAux.$error, 'is-valid':!$v.tokenAux.$invalid }">
            <div class="valid-feedback">Token admitido</div>
            <div class="invalid-feedback">
                <span v-if="!$v.tokenAux.required">Debe ingresar el token </span>
                <span v-if="!$v.tokenAux.minLength">Debe ser de {{$v.tokenAux.$params.minLength.min}} caracteres. </span>
                <span v-if="!$v.tokenAux.maxLength">Debe ser a lo mucho de {{$v.tokenAux.$params.maxLength.max}} caracteres. </span>
            </div><p></p>
            <circular-count-down-timer 
                :initial-value="30"
                :steps="30" 
                :size=100
                :show-negatives="true"
                :paused="timerOff"
                @update="updated"
                
                ref="countdown">
            </circular-count-down-timer>                 
        </div>
    </div>
</template>

<style src="@/styles/Step1Lending.css" scoped>

</style>

<script>

import {mapState,mapActions} from 'vuex'
import Swal from 'sweetalert2'

export default {
    
}
</script>