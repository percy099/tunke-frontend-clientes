<template>
    <div class="">
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container">
            <tab-content title="Identifícate" :before-change="verificacionV1">
               <Step1NoClient></Step1NoClient>
            </tab-content>
            <tab-content title="Permítenos conocerte" :before-change="registerCurrency">
                <Step2NoClient></Step2NoClient>
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

import Step1NoClient from "@/components/Step1NoClient.vue";
import Step2NoClient from '@/components/Step2NoClient.vue';
import Step3NoClient from '@/components/Step3NoClient.vue';
import * as accountDA from '@/dataAccess/accountDA.js';
import * as personDA from '@/dataAccess/personDA.js';
import {mapState, mapActions} from 'vuex';
import router from '@/router.js'

export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapState(['person','currency','securityQuestions'])
        
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
            
            let counterCorrectAns=0;
            let missingChecked=0;

            if (Step1NoClient.getElementById("q1a1").checked){
                if(this.securityQuestions.questions[0].correctAnswerIndex==1){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q1a2").checked){
                if(this.securityQuestions.questions[0].correctAnswerIndex==2){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q1a3").checked){
                if(this.securityQuestions.questions[0].correctAnswerIndex==3){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q1a4").checked){
                if(this.securityQuestions.questions[0].correctAnswerIndex==4){counterCorrectAns++;}
            }
            else{
                missingChecked++;
            }

            if (Step1NoClient.getElementById("q2a1").checked){
                if(this.securityQuestions.questions[1].correctAnswerIndex==1){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q2a3").checked){
                if(this.securityQuestions.questions[1].correctAnswerIndex==2){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q2a3").checked){
                if(this.securityQuestions.questions[1].correctAnswerIndex==3){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q2a4").checked){
                if(this.securityQuestions.questions[1].correctAnswerIndex==4){counterCorrectAns++;}
            }
            else{
                missingChecked++;
            }

            if (Step1NoClient.getElementById("q3a1").checked){
                if(this.securityQuestions.questions[2].correctAnswerIndex==1){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q3a3").checked){
                if(this.securityQuestions.questions[2].correctAnswerIndex==2){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q3a3").checked){
                if(this.securityQuestions.questions[2].correctAnswerIndex==3){counterCorrectAns++;}
            }
            else if (Step1NoClient.getElementById("q3a4").checked){
                if(this.securityQuestions.questions[2].correctAnswerIndex==4){counterCorrectAns++;}
            }
            else{
                missingChecked++;
            }
            
            if (missingChecked>=1){
                //faltan seleccionar no pierde un intento
                return false;
            }
            else if (counterCorrectAns==3){
                //respuestas correctas
                return true;
            }
            else {
                //respuestas erroneas, pierde un intento
                return false;
            }
        },
        registerCurrency(){
            personDA.doRegisterProspect(this.person.idPerson,this.person.email1,this.person.email2,this.person.cellphone1,this.person.cellphone2).then((res) =>{
                console.log(res.data);
            }).catch(error=>
            {
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en los datos'
                })
            })
            return true;
        }
    },
    mounted() {
   
            personDA.doQuestionsRequest(this.person.idPerson).then((res)=>{
                let responseQuestionReq=res.data;
                this.completeSecurityQuestion(responseQuestionReq);
            }).catch(error=>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en la recepción de preguntas'
                })
            })
        
    },
    components:{
        Step1NoClient,
        Step2NoClient,
        Step3NoClient
    }

}
</script>