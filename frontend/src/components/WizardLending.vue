<template>
    <div class="">
        <form-wizard ref="wizardLendingMod" title="" next-button-text="Siguiente" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Finalizar"
        step-size="sm" id="container">
            <tab-content title="Identifícate" class="" :before-change="verificationToken">
               <Step1Lending></Step1Lending>
            </tab-content>
            <tab-content title="Elige tu campaña" class="" :before-change="updateSimulationVariables">
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
import router from '@/router.js';
import Swal from 'sweetalert2';

export default {
    
    data(){
        return {
            counterTries:3,
            campaingsListAux:[]
        }
    },
    computed:{
        ...mapState(['person','currency','token','flagRestartTimer','clientAcceptedTerms','nameWizardNext','lead','activeShare','activeTerm','activeValueLoan','activeValueLoan','termsLead','flagErrorLead','availableCampaigns','campaignWindowSelected','currencyCampaignSelected']) 
        
    },
    methods:{
        ...mapActions(['captureResponse','changeFlagTimer','changeClientTerms','fillToken','fillLead','fillTermsLead','setFlagErrorLead','fillAvailableCampaigns','fillcampaignWindowSelected','fillCurrencyCampaignSelected']),
        nextWindow(){
            this.$refs.wizardLendingMod.nextTab();
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
        },
        updateSimulationVariables: function(){

            let leadSelected=this.availableCampaigns[this.campaignWindowSelected].idLead;
            this.fillLead(leadSelected);
            let min_Periodo=this.lead.minimumPeriod;
            let max_Periodo=this.lead.maximumPeriod;

            let optionsTerm=[];
                    for (let period=min_Periodo;period<=max_Periodo;period++){
                        let resto=period%6;
                        if(!resto){
                            let text_period=period + ' meses';
                            let reg={value: period, text: text_period};
                            optionsTerm.push(reg);
                        }             
                    }
            this.fillTermsLead(optionsTerm);
            
            let currencyType=this.availableCampaigns[this.campaignWindowSelected].idCurrency;
            let currencyName="";

            if(currencyType==1){
                currencyName="Soles";
            }else if(currencyType==2){
                currencyName="Dólares";
            }

            let reg={
                idCurrency:currencyType,
                name:currencyName
            }

            this.fillCurrencyCampaignSelected(reg);
            return true;
        }
    },
    components:{
        Step1Lending,
        Step2Lending,
        Step3Lending,
        Step4Lending
    },
    beforeMount(){

        if (!this.person.activeLoans & this.person.activeCampaigns){
            if(this.person.leads.length!=0){
                loanDA.doRequestLead(this.person.leads[0].idLead).then((res) =>{
                    let lead_data = res.data;
                    this.fillLead(lead_data);
                    let min_Periodo=this.lead.minimumPeriod;
                    let max_Periodo=this.lead.maximumPeriod;

                    let optionsTerm=[];
                    for (let period=min_Periodo;period<=max_Periodo;period++){
                        let resto=period%6;
                        if(!resto){
                            let text_period=period + ' meses';
                            let reg={value: period, text: text_period};
                            optionsTerm.push(reg);
                        }             
                    }
                    this.fillTermsLead(optionsTerm);
                }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'Error en la captura del Lead del cliente'
                        });
                        this.$router.push('/');
                })

                let campaignsFiltered=[]; //las campañas del mes actual
                
                if (this.person.campaigns.length==0){
                    this.person.activeCampaigns=false;
                }
                else{
                    for (let i=0;i<this.person.campaigns.length;i++){
                            let objCamp={
                                "lead": this.person.leads[i],
                                "campaignPos":i
                            }
                            campaignsFiltered.push(objCamp);
                            
                            if(i+1 == this.person.campaigns.length){ //en el ultimo ciclo del for
                                campaignsFiltered.sort(function(a, b){return b.lead.maximumLoan-a.lead.maximumLoan});
                                if(campaignsFiltered.length==1){ //ubicar en arreglo en las posicion central
                                    console.log("solo hay una campaña disponible");
                                    let posArrCampaign=campaignsFiltered[0].campaignPos;
                                    let dataCamp={
                                        "pos":1,
                                        "data":{
                                            "imageSource":"@/images/educativo.jpg",
                                            "name":this.person.campaigns[posArrCampaign].name,
                                            "active":this.person.campaigns[posArrCampaign].active,
                                            "endDate":this.person.campaigns[posArrCampaign].endDate,
                                            "idCampaign":this.person.campaigns[posArrCampaign].idCampaign,
                                            "idCurrency": this.person.campaigns[posArrCampaign].idCurrency,
                                            "month": this.person.campaigns[posArrCampaign].month,
                                            "startDate": this.person.campaigns[posArrCampaign].startDate,
                                            "idLead":campaignsFiltered[0].lead
                                            }
                                    }
                                    this.fillAvailableCampaigns(dataCamp);
                                } else if (campaignsFiltered.length>1){
                                    console.log("hay mas de 1 campaña disponible");
                                    for(let i=0; i<3;i++){
                                        if(campaignsFiltered.length>i){
                                            let posArrCampaign=campaignsFiltered[i].campaignPos;
                                            let dataCamp={
                                                "pos":i,
                                                "data":{
                                                    "imageSource":"@/images/educativo.jpg",
                                                    "name":this.person.campaigns[posArrCampaign].name,
                                                    "active":this.person.campaigns[posArrCampaign].active,
                                                    "endDate":this.person.campaigns[posArrCampaign].endDate,
                                                    "idCampaign":this.person.campaigns[posArrCampaign].idCampaign,
                                                    "idCurrency": this.person.campaigns[posArrCampaign].idCurrency,
                                                    "month": this.person.campaigns[posArrCampaign].month,
                                                    "startDate": this.person.campaigns[posArrCampaign].startDate,
                                                    "idLead":campaignsFiltered[i].lead
                                                    }
                                            } 
                                            this.fillAvailableCampaigns(dataCamp);
                                        }
                                    }
                                }
                                console.log("campañas disponibles: ", this.availableCampaigns);
                            }
                    }
                }
            }

            
            
        } 
    },    
    mounted(){
    }
}
</script>