<template>
    <div class="">
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container">
            <tab-content title="Identifícate" :before-change="verificationToken">
               <Step1Client></Step1Client>
            </tab-content>
            <tab-content title="Elige tu cuenta" :before-change="verification2" class="">
                <Step2Client></Step2Client>
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>

import Step1Client from "@/components/Step1Client.vue";
import Step2Client from '@/components/Step2Client.vue';
import * as S2NC from '@/components/Step2Client.vue';
import * as accountDA from '@/dataAccess/accountDA.js';
import * as personDA from '@/dataAccess/personDA.js';
import {mapState, mapActions} from 'vuex';
import router from '@/router.js'
import Swal from 'sweetalert2'

export default {
    data(){
        return{
            counterTries: 3
        }
    },
    computed:{
        ...mapState(['person','currency','token','flagRestartTimer','clientAcceptedTerms','processId','parameterSetting'])
        
    },
    methods:{
        ...mapActions(['captureResponse','changeFlagTimer','changeClientTerms','fillToken','setActiveProcessId']),
        onComplete (){
            if(this.person.totalAccounts+1<=this.parameterSetting.maxAccountsNumber){
                    accountDA.doCreateAccount(this.person.idPerson,this.currency).then((res) =>{
                        let response_create = res.data;
                        this.captureResponse(response_create);
                        this.$router.push('/summarySale');
                    }).catch(error=>
                    {
                        Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Error al crear la cuenta'
                        })
                    })
            }else{
                Swal.fire({
                        title: 'Se superó el límite de cuentas abiertas',
                        type: 'error',
                        text: 'Estimado cliente, usted ya cuenta con muchas cuentas abiertas en Tunke.'
                    });
                this.$router.push('/');
            }
        },
        verificationToken(){
            
            if (this.counterTries>0){
               this.counterTries=this.counterTries-1;
               
               if (this.token.input!='' & this.token.received!=''){

               }else{
                   Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Se requiere ingresar el token para poder proseguir'
                    })
                   this.changeFlagTimer(true);
                   return false;
               }
               this.token.input = this.token.input.toUpperCase();
               if(this.token.input==this.token.received){
                   console.log("token igual");
                   let body={
                        "input":'',
                        "received": ''
                       }
                    this.fillToken(body);
                   return true;
               }
               else {
                   Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'El token ingresado no coincide con el token enviado.'
                    })
                   this.changeFlagTimer(true);
                   return false;
               }
            }
            else{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Cantidad de intentos superados.'
                })
                this.$router.push('/');
            }
            
        },  
        verification2(){
            if(this.clientAcceptedTerms){
                return true;
            }else{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Por favor, acepte los términos y condiciones'
                })
                return false;
            }
        }      
    },
    mounted() {        
    },
    components:{
        Step1Client,
        Step2Client
    }

}
</script>