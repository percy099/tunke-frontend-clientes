<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola {{person.firstName}} {{person.fatherLastname}}!</h1>
            <h2>{{person.documentNumber}}</h2>
            <div class="text-center"> 
                <router-link :to="{path : '/openingDNI'}" href="#">¿Este no es tu DNI?</router-link>
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

<style src="@/styles/Step1Client.css" scoped>

</style>

<script>

import {mapState,mapActions} from 'vuex'
import Swal from 'sweetalert2'
import { required, minLength, maxLength} from 'vuelidate/lib/validators'
import * as accountDA from '@/dataAccess/accountDA.js'

export default {
    name : 'Step1Client',
    data(){
        return {
            counter: 3,
            tokenSended: false,
            hiddenNumber:'',
            hiddenEmail:'',
            timerOff:true,
            tokenAux:'',
            submitStatus: null
        }
    },
    validations: {
        tokenAux: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(6)
        }
    },
    computed:{
        ...mapState(['person','token','flagRestartTimer'])
    },
    methods:{
        ...mapActions(['fillToken','changeFlagTimer']),
        getToken(){
            const TokenGenerator = require('uuid-token-generator');
            const tokgen = new TokenGenerator(128, TokenGenerator.BASE62);
            let aux= tokgen.generate().substring(0,6).toUpperCase();
             //this.token.received=aux;
            
            let body={
                "input":'',
                "received":aux
            }
            this.fillToken(body);
            console.log(this.token.received);
            //return this.token.received;
        },
        updateCountdown: function() {
            this.$refs.countdown.updateTime(31);
        },
        updated: function (status) {
            //console.log(status);    //{"value": 144, "seconds": 24, "minutes": 2, "hours": 0}
            if(status.value==-1){
                this.timerOff=true;
                this.tokenSended=false;
                //this.updateCountdown();
                this.$refs.countdown.updateTime(31);
            }
            if(this.flagRestartTimer){
                this.timerOff=true;
                this.tokenSended=false;
                //this.updateCountdown();
                this.$refs.countdown.updateTime(30-status.value);
                this.changeFlagTimer(false);
            }
            
        },
        sendToSMS(){    
            if(this.counter>0){
                this.timerOff=false;
                //if(this.counter!=3) this.updateCountdown();                   
                this.counter = this.counter - 1;
                this.tokenSended=true;                
                
                //enviar señal al back para enviar SMS
                //this.getToken();
                
                accountDA.doGetToken(this.person.email1,this.person.cellphone1,0).then((res) =>{
                      let token_data = res.data;
                      
                      let body={
                        "input":'',
                        "received": token_data.token
                       }
                      this.fillToken(body);
                      console.log(this.token.received);
                      console.log(this.person.cellphone1);
                  }).catch(error=>
                  {
                      Swal.fire({
                      title: 'Error',
                      type: 'error',
                      text: 'Error en la captura del Token'
                      });
                         console.log(error);
                  })  
            }else{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Cantidad de intentos superados.'
                })
                this.$router.push('/');
            }
            
        },
        sendToEmail(){      
            if(this.counter>0){
                this.timerOff=false;
                //if(this.counter!=3) this.updateCountdown();                   
                this.counter = this.counter - 1;
                this.tokenSended=true;                
                
                //enviar señal al back para enviar correo
                //this.getToken();
                accountDA.doGetToken(this.person.email1,this.person.cellphone1,1).then((res) =>{
                      let token_data = res.data;
                      
                      let body={
                        "input":'',
                        "received": token_data.token
                       }
                      this.fillToken(body);
                      console.log(this.token.received);
                      console.log(this.person.email1);
                      
                  }).catch(error=>
                  {
                      Swal.fire({
                      title: 'Error',
                      type: 'error',
                      text: 'Error en la captura del Token'
                      })
                  }) 
            }else{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Cantidad de intentos superados.'
                })
                this.$router.push('/');
            }
            
        },
        finishedTimer(){
            this.tokenSended=false;
            this.timerOff=true;
        },
        hideNumber(){
            let lastFour= this.person.cellphone1.substring(this.person.cellphone1.length - 3);
            this.hiddenNumber="******"+ lastFour;
    
        },
        hideEmail(){
            let email=this.person.email1;
            let posCar=email.indexOf("@");
            let firstPart=''
            if (posCar>4){
                firstPart= email.substring(0,4);
            }else{
                firstPart= email.substring(0,2);
            }
            
            let lastPart= email.substring(posCar);
            this.hiddenEmail=firstPart+"***"+ lastPart;
        },
        submitForm() {
            this.$v.$touch()
            if(this.$v.$invalid){
                this.submitstatus = 'FAIL'
            } else {
                this.submitstatus = 'SUCESS'
            }
        }
    },
    created(){
        this.hideNumber();
        this.hideEmail();
    },
    updated(){
        this.token.input = tokenAux;
    }
}
</script>