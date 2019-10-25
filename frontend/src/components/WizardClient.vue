<template>
    <div class="">
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container">
            <tab-content title="Identifícate">
               <Step1Client></Step1Client>
            </tab-content>
            <tab-content title="Elige tu cuenta" class="">
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
        ...mapState(['person','currency','securityQuestions','answersSecurityQuestions'])
        
    },
    methods:{
        ...mapActions(['captureResponse','completeSecurityQuestion']),
        onComplete (){
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
        },
        verificacionV1(){
            
            if (this.counterTries>0){
               
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
    },
    mounted() {        
    },
    components:{
        Step1Client,
        Step2Client
    }

}
</script>