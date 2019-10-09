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
        //crear estructura de las preguntas
        //creo que esta estructura va en el store ya que lo usaremos en los archivos del step1.vue y en el wizard1.vue
        return{
            question:{
                answer1:'',
                answer2:'',
                answer3:'',
                answer4:'',
                correctAnswerIndex:-1,
                question:''
            },
            securityQuestions:{
                question1:this.question,
                question2:this.question,
                question3:this.question,
            }
        }
    },
    computed:{
        ...mapState(['person','currency'])
    },
    methods:{
        ...mapActions(['captureResponse']),
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
        //creo que esto va antes de entrar al wizard xd
        getSecurityQuestions(){
            personDA.doQuestionsRequest(this.person.idPerson).then((res)=>{
                console.log(res.data);
                let responseQuestionReq=res.data;
        
                //pregunta1
                this.securityQuestions.question1.answer1=responseQuestionReq.securityQuestions[0].answers[0];
                this.securityQuestions.question1.answer2=responseQuestionReq.securityQuestions[0].answers[1];
                this.securityQuestions.question1.answer3=responseQuestionReq.securityQuestions[0].answers[2];
                this.securityQuestions.question1.answer4=responseQuestionReq.securityQuestions[0].answers[3];

                this.securityQuestions.question1.correctAnswerIndex=responseQuestionReq.securityQuestions[0].correctAnswerIndex;
                this.securityQuestions.question1.question=responseQuestionReq.securityQuestions[0].question;

                //pregunta2
                this.securityQuestions.question2.answer1=responseQuestionReq.securityQuestions[1].answers[0];
                this.securityQuestions.question2.answer2=responseQuestionReq.securityQuestions[1].answers[1];
                this.securityQuestions.question2.answer3=responseQuestionReq.securityQuestions[1].answers[2];
                this.securityQuestions.question2.answer4=responseQuestionReq.securityQuestions[1].answers[3];

                this.securityQuestions.question2.correctAnswerIndex=responseQuestionReq.securityQuestions[1].correctAnswerIndex;
                this.securityQuestions.question2.question=responseQuestionReq.securityQuestions[1].question;

                //pregunta3
                this.securityQuestions.question3.answer1=responseQuestionReq.securityQuestions[2].answers[0];
                this.securityQuestions.question3.answer2=responseQuestionReq.securityQuestions[2].answers[1];
                this.securityQuestions.question3.answer3=responseQuestionReq.securityQuestions[2].answers[2];
                this.securityQuestions.question3.answer4=responseQuestionReq.securityQuestions[2].answers[3];

                this.securityQuestions.question3.correctAnswerIndex=responseQuestionReq.securityQuestions[2].correctAnswerIndex;
                this.securityQuestions.question3.question=responseQuestionReq.securityQuestions[2].question;
                
            }).catch(error=>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en la recepción de preguntas'
                })
            })
            return true;
        },
        verificacionV1(){
            alert('Validar la info y seleccion')
              
            //hacer las verificaciones de que esta seleccionado un checkbox y las respuestas correctas
            /*
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Las respuestas no son correctas'
                })
            })*/
            return true;
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
    components:{
        Step1NoClient,
        Step2NoClient,
        Step3NoClient
    }

}
</script>