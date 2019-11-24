<template>
    <div class="">
        <form-wizard ref="wizardLendingMod" title="" next-button-text="Siguiente" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Finalizar"
        step-size="sm" id="container">
            <tab-content title="Identifícate" class="" :before-change="verificationToken">
               <Step1Lending></Step1Lending>
            </tab-content>
            <tab-content title="Elige tu campaña" class="">
                <Step2Lending></Step2Lending>
            </tab-content>
            <tab-content title="Simula tu préstamo" class="" :before-change="validateSimulation">
                <Step3Lending :method="nextWindow"></Step3Lending>
            </tab-content>
            <tab-content title="Elige tu cuenta" class="">
                <Step4Lending></Step4Lending>
            </tab-content>
            <button style="display:none;" slot="finish">Finish</button>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>

import Step1Lending from "@/components/Step1Lending.vue";
import Step2Lending from '@/components/Step2Lending.vue';
import Step3Lending from '@/components/Step3Lending.vue';
import Step4Lending from '@/components/Step4Lending.vue';
import * as personDA from '@/dataAccess/personDA.js';
import * as loanDA from '@/dataAccess/loanDA.js';
import {mapState, mapActions} from 'vuex';
import router from '@/router.js'
import Swal from 'sweetalert2'

export default {
    
    data(){
        return {
            counterTries:3
        }
    },
    computed:{
        ...mapState(['person','currency','token','flagRestartTimer','clientAcceptedTerms','nameWizardNext','lead','activeShare','activeTerm','activeValueLoan','activeValueLoan'])
        
    },
    methods:{
        ...mapActions(['captureResponse','changeFlagTimer','changeClientTerms','fillToken','fillLead']),
        nextWindow(){
            this.$refs.wizardLendingMod.nextTab();
        },
        
        getLeadClient:function(){
            loanDA.doRequestLead(this.person.idLead).then((res) =>{
                let lead_data = res.data;
                console.log("LEAD: ",lead_data)
                this.fillLead(lead_data);
            }).catch(error=>{

                //if(!this.person.idLead){                      
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Error en la captura del Lead del cliente'
                    });
                    this.$router.push('/');
                //}

            })
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


                   if (this.person.activeLoans){
                          //ya tiene prestamos en proceso
                          router.push('/LendingActive');
                        }else{

                          if(this.person.activeCampaigns){
                            //tiene campañas entonces sigue el flujo
                            this.getLeadClient();
                            return true;
                          }else{
                            //no tiene campañas 
                            router.push('/LendingWithoutCampaign');
                          }
                          
                    }
                   
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
                });
                this.$router.push('/');
            }
            
        },
        validateSimulation(){
            if (this.activeShare!=null && this.activeTerm!=null && this.activeValueLoan!=0 && this.activeValueLoan>0){
                return true;
            }else{
                Swal.fire({
                      title: 'Datos incompletos',
                      text: 'Por favor, complete todos los campos requeridos para solicitar un préstamo'
                      })
                return false;
            }
        }
    },    
    mounted(){

    },
    components:{
        Step1Lending,
        Step2Lending,
        Step3Lending,
        Step4Lending
    }

}
</script>