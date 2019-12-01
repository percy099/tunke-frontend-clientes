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
            <tab-content title="Preguntas" class="">
                <Step4NoClient></Step4NoClient>
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>

import Step1NoClient from "@/components/Step1NoClient.vue";
import Step2NoClient from '@/components/Step2NoClient.vue';
import * as S2NC from '@/components/Step2NoClient.vue'
import Step3NoClient from '@/components/Step3NoClient.vue';
import Step4NoClient from '@/components/Step4NoClient.vue';
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
        ...mapState(['person','currency','securityQuestions','answersSecurityQuestions','valStep2','currency1','currency2','currency3','accountType','response1',
                     'response2','response3','response4'])
    },
    methods:{
        ...mapActions(['captureResponse','completeSecurityQuestion','changeCurrency3','changeCurrency2','changeCurrency1','setAccountType']),
        onComplete (){
            if(this.accountType == 1){
                accountDA.doCreateAccount(this.person.idPerson,this.currency1, this.accountType, this.response1,this.response2,this.response3,this.response4).then((res) =>{
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
            }
            if(this.accountType == 2){
                accountDA.doCreateAccount(this.person.idPerson,this.currency2, this.accountType, this.response1,this.response2,this.response3,this.response4).then((res) =>{
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
            }
            if(this.accountType == 3){
                accountDA.doCreateAccount(this.person.idPerson,this.currency3, this.accountType, this.response1,this.response2,this.response3,this.response4).then((res) =>{
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
                this.changeCurrency1(1);
                this.changeCurrency2(1);
                this.changeCurrency3(1);
                this.setAccountType(1);
                console.log(this.currency1);
                console.log(this.currency2);
                console.log(this.currency3);
                console.log(this.accountType);
            }
        },
                verificacionV1(){
            if (this.counterTries>0){

                if (this.answersSecurityQuestions.posAnswer1==-1 || this.answersSecurityQuestions.posAnswer2==-1 
                    || this.answersSecurityQuestions.posAnswer2==-1 )
                {
                    //falta seleccionar campos, no pierde intentos
                    Swal.fire({
                        title: 'Respuestas incompletas',
                        type: 'error',
                        text: 'Todas las preguntas son necesarias para pasar al siguiente paso.'
                        })
                    return false;
                }
                else
                {
                    if(this.securityQuestions.questions[0].correctAnswerIndex==this.answersSecurityQuestions.posAnswer1
                       && this.securityQuestions.questions[1].correctAnswerIndex==this.answersSecurityQuestions.posAnswer2
                       && this.securityQuestions.questions[2].correctAnswerIndex==this.answersSecurityQuestions.posAnswer3)
                       {
                        //respuestas correctas
                        return true;
                       }
                    else{
                        //respuestas erroneas, pierde un intento
                        this.counterTries--;
                        if(this.counterTries!=0){
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
                        }
                        Swal.fire({
                        title: 'Respuestas inválidas',
                        type: 'error',
                        text: 'Por favor, verifique sus respuestas.'
                        })
                        return false;
                    }
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
        registerCurrency(){
            if(this.valStep2 == false){
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en los datos'
                })
                return false;
            } else {
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
        Step3NoClient,
        Step4NoClient
    }

}
</script>