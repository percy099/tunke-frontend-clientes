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
            counterTries:3,
            campaingsListAux:[]
        }
    },
    computed:{
        ...mapState(['person','currency','token','flagRestartTimer','clientAcceptedTerms','nameWizardNext','lead','activeShare','activeTerm','activeValueLoan','activeValueLoan','termsLead','flagErrorLead','availableCampaigns'])
        
    },
    methods:{
        ...mapActions(['captureResponse','changeFlagTimer','changeClientTerms','fillToken','fillLead','fillTermsLead','setFlagErrorLead','fillAvailableCampaigns']),
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
        }
    },
    components:{
        Step1Lending,
        Step2Lending,
        Step3Lending,
        Step4Lending
    },
    beforeMount(){
        console.log("este es el before mount");
        if (!this.person.activeLoans & this.person.activeCampaigns){
            if(this.person.idLeads.length!=0){
                loanDA.doRequestLead(this.person.idLeads[0]).then((res) =>{
                    let lead_data = res.data;
                    console.log("LEAD llamado en el wizard: ",lead_data);
                    this.fillLead(lead_data);
                    let min_Periodo=this.lead.minimumPeriod;
                    let max_Periodo=this.lead.maximumPeriod;

                    let optionsTerm=[];
                    console.log("..1..");
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

                    //if(!this.person.idLead){                      
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'Error en la captura del Lead del cliente'
                        });
                        this.$router.push('/');
                    //}

                })

                //fillAvailableCampaigns availableCampaigns
                let moment = require('moment');
                moment.locale('es-es');
                let todayMonth=moment().format("MMMM");
                console.log(todayMonth);
                console.log("..2..");

                let campaignsFiltered=[]; //las campañas del mes actual
                for (let i=0;i<this.person.campaigns.length;i++){
                    if(this.person.campaigns[i].month.toUpperCase()==todayMonth.toUpperCase()){

                        loanDA.doRequestLead(this.person.idLeads[i]).then((res) =>{
                            let lead_data = res.data;
                            let set_={
                                "lead": lead_data,
                                "campaignPos":i
                            }
                            campaignsFiltered.push(set_);
                            console.log("size en push ...3...",campaignsFiltered.length);

                        }).catch(error=>{
                            console.log("Error en la captura de data en la lista de leads--WizardLending")
                        })
                    }
                }
                this.campaingsListAux=[];
                this.campaingsListAux=campaignsFiltered;
                console.log("..4..");
/*
                //let campaignsFiltered=[];
                //ordenamos las campañas por monto maximo de lead
                campaignsFiltered.sort(function(a, b){return b.lead.maximumLoan-a.lead.maximumLoan});

                console.log("CAMPAÑAS RECIBIDOS DEL MES (ordenadas):");
                console.log(campaignsFiltered);
                console.log("size:",campaignsFiltered.length);
                if(campaignsFiltered.length==1){ //ubicar en arreglo en las posicion central
                console.log("igual a 1");
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
                }else if (campaignsFiltered.length>1){
                    console.log("mayor a 1");
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

                }else{
                    //tras filtrar campañas, no hay para este mes
                    console.log("no tiene campañas");
                    this.person.activeCampaigns=false;
                }*/
            }

            
            
        } 
    },    
    mounted(){
        console.log("este es el mounted");
        if (!this.person.activeLoans & this.person.activeCampaigns){
            if(this.person.idLeads.length!=0){
/*
                //fillAvailableCampaigns availableCampaigns
                let moment = require('moment');
                moment.locale('es-es');
                let todayMonth=moment().format("MMMM");
                console.log(todayMonth);

                let campaignsFiltered=[]; //las campañas del mes actual
                
                for (let i=0;i<this.person.campaigns.length;i++){
                    if(this.person.campaigns[i].month.toUpperCase()==todayMonth.toUpperCase()){

                        loanDA.doRequestLead(this.person.idLeads[i]).then((res) =>{
                            let lead_data = res.data;
                            let set_={
                                "lead": lead_data,
                                "campaignPos": i
                            }
                            campaignsFiltered.push(set_);
                            console.log("size en push",campaignsFiltered.length);

                        }).catch(error=>{
                            console.log("Error en la captura de data en la lista de leads--WizardLending")
                        })
                    }
                }
*/
                //ordenamos las campañas por monto maximo de lead
                //this.campaingsListAux.sort(function(a, b){return b.lead.maximumLoan-a.lead.maximumLoan});
                console.log("..6..");
                console.log("CAMPAÑAS RECIBIDOS DEL MES (ordenadas):");
                console.log(this.campaingsListAux);
                console.log("size:", this.campaingsListAux.length);

                if(this.campaingsListAux.length==1){ //ubicar en arreglo en las posicion central
                console.log("igual a 1");
                console.log("..7..");
                    let posArrCampaign=this.campaingsListAux[0].campaignPos;
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
                            "idLead":this.campaingsListAux[0].lead
                        }
                    }
                    console.log("..8..");
                    this.fillAvailableCampaigns(dataCamp);
                }else if (this.campaingsListAux.length>1){
                    console.log("mayor a 1");
                    console.log("..7..");
                    for(let i=0; i<3;i++){
                        if(this.campaingsListAux.length>i){
                           let posArrCampaign=this.campaingsListAux[i].campaignPos;
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
                                    "idLead":this.campaingsListAux[i].lead
                                }
                            } 
                            this.fillAvailableCampaigns(dataCamp);
                            console.log("..8..");
                        }
                    }

                }else{
                    //tras filtrar campañas, no hay para este mes
                    console.log("no tiene campañas");
                    console.log("..7..");
                    this.person.activeCampaigns=false;
                }
            }

            
            
        }

    }

}
</script>