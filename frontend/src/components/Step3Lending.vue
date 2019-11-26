<template>
    <div id="step3">
        <div class="container-ext">
            
            <h1 align="center">Simula tu préstamo</h1>
            
            <div class="parameters1">
                <div class="row"> 
                    <div class="col-sm-4"><h3>Tipo de préstamo</h3></div>
                    <div class="col-sm-4"><h3>Tipo de cuota</h3></div>
                    <div class="col-sm-4"><h3>Plazos</h3></div>
                </div>
                <div class="row">
                    <div class="col-sm-4"><input disabled type="text" class="form-control inpt" v-model="selectedTypeLoan" @input="setActiveTypeLoanF"></div>
                    <div class="col-sm-4"> <v-select class="inpt" v-model="selectedTypeShare" :required="!selectedTypeShare" :options="optionsShare"  label="text" @input="setActiveShareF"/></div>
                    <div class="col-sm-4"> <v-select class="inpt" v-model="selectedTerm" :required="!selectedTerm" :options="termsLead"  label="text" @input="setActiveTermF"/></div>
                </div>
            </div>
            <div class="parameters2">
                <div class="row"> 
                  
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3"><h3>Tipo de moneda</h3></div>
                    <div class="col-sm-3">
                            <h3>Monto a solicitar </h3><h3 align='center' style="font-weight:bold;font-size:12px;">{{selectedCurrencySymbol}} {{valueLoan}}</h3>  
                    </div>
                    <div class="col-sm-3"><h3></h3></div>
                  
                </div>
                <div class="row"> 
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3"><input disabled type="text" class="form-control inpt" v-model="selectedCurrency" @input="setActiveTypeCurrencyF"></div>
                    <div class=" col-sm-3 slidecontainer">
                        <h5>{{minLoan}}</h5>
                        <input type="range"  :min="minLoan" :max="maxLoan" step="50" v-model="valueLoan"  class="slider" id="myRange">            
                    </div>
                        <h5 align='left'>{{maxLoan}}</h5>
                    <div class="col-sm-3"><h3></h3></div>
                </div>
                <div class="row"> 
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3 button_pos" align="center"><button class="simulation" @click="activaVentana">Simular </button></div>
                    <div class="col-sm-3 button_pos" align="center"><button class="request" @click="solicitudeHere">Pídelo aquí</button></div>
                   <div class="col-sm-3"><h3></h3></div>
                </div>
            </div>
            
        </div>
        <!--Ventana modal de la simulacion-->  
        <ModalStep3Lending :next="loanSolicitude" v-if="showModal" @close="desactivaVentana">
            <h3 slot="header">custom header</h3>
        </ModalStep3Lending>
        <!--Ventana modal del calendario de pagos-->  
        <ModalScheduleLending v-if="showModalSchedule.status" @close="desactivaModalSch">
            <h3 slot="header">custom header</h3>
        </ModalScheduleLending>
    </div>
</template>

<style scoped src="@/styles/Step3Lending.css">

</style>

<script>

import * as loanDA from '@/dataAccess/loanDA.js'
import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'
import ModalStep3Lending from '@/components/ModalStep3Lending.vue'
import ModalScheduleLending from '@/components/ModalScheduleLending.vue'

export default {
    props:{
        method: { type: Function }
    },
    data(){
        return {
            showModal:false,
            comision:'',
            minLoan:0,
            maxLoan:0,
            valueLoan: '',
            sliderValue:0,

            //Tipo de prestamo
            selectedTypeLoan:'Préstamo Efectivo',
            optionsTypeLoan: [{
                value:1, text:'Préstamo Efectivo'
            },{
                value:2, text:'Préstamo No Efectivo'
            }],
            //Cuota
            selectedTypeShare:false,
            optionsShare: [{
                value:1, text:'Simple'
            },{
                value:2, text:'Extraordinario'
            }],
            //Plazo de prestamo
            selectedTerm:false,
            currentTerm:0,
            //Tipo de moneda
            selectedCurrency:'',
            selectedCurrencySymbol:''
        }
    },
    computed:{
        ...mapState(['person','lead','activeTypeLoan','activeShare','activeTerm','activeTypeCurrency','activeValueLoan','showModalSchedule','simulationList','parameterSetting','simulationShareSelected','selectedFirstButton','termsLead'])
    },
    methods:{
        ...mapActions(['changeCurrency','fillLead','setActiveTypeLoans','setActiveShares','setActiveTerms','setActiveTypeCurrencys','setActiveValueLoans','fillShowModalSchedule','fillSimulationsData','setSimulationShareSelected','setSelectedFirstButton','fillTermsLead']),
        loanSolicitude(){
            if (this.activeShare!=null && this.activeTerm!=null && this.activeValueLoan!=0 && this.activeValueLoan>0){
                console.log("monto de prestamo: ",this.activeValueLoan);
                this.method();
            }else{
                Swal.fire({
                      title: 'Datos incompletos',
                      text: 'Por favor, complete todos los campos requeridos para solicitar un préstamo'
                      })
            }
        },
        solicitudeHere(){
            this.setSelectedFirstButton(true);
            console.log("pidelo aqui");
            this.loanSolicitude();
        }
        ,
        desactivaVentana: function(){
            this.showModal=false;
        },
        activaVentana: function(){
            console.log("tipo de cuota",this.activeShare.value);
            /*
            console.log(this.activeTypeLoan);
            console.log(this.activeShare);
            console.log(this.activeTerm);
            console.log(this.activeTypeCoin);
            console.log(this.activeValueLoan);*/

            if (this.activeShare!=null && this.activeTerm!=null && this.activeValueLoan!=0 && this.activeValueLoan>0){
                
                //buscar la posicion del regMain y escoger dos simulaciones adicionales
                let periodsList=[]
                
                for (let i=this.lead.minimumPeriod;i<=this.lead.maximumPeriod;i++){
                    let resto=i%6;
                    if(!resto){
                        periodsList.push(i);
                    }
                }
                
                let termMain=this.activeTerm.value;         
                let termMainPos=periodsList.indexOf(termMain);

                let primero=this.termsLead[0];
                let tercero=this.termsLead[periodsList.length-1];
                let segundo=null;

                if (termMainPos==0 || termMainPos==(periodsList.length-1)){
                    //esta en el inicio o en el final
                    
                    if(periodsList.length==1){
                     segundo=this.termsLead[0];
                    }else{
                     segundo=this.termsLead[1];
                    }
                }else{
                    //esta en otra posicion     
                     segundo=this.termsLead[termMainPos];
                }

                let terms=[primero.value,segundo.value, tercero.value];
                let simGeneral1=this.calculateDataGeneral(terms[0]);
                let simGeneral2=this.calculateDataGeneral(terms[1]);
                let simGeneral3=this.calculateDataGeneral(terms[2]);
                
                let results=[simGeneral1,simGeneral2,simGeneral3];

                let simulations=[];
                for(let i=0;i<3;i++){
                    simulations.push({
                        term: terms[i],
                        share: results[i][0],
                        tcea: results[i][1]
                    });
                }

                this.fillSimulationsData(simulations);
                console.log(this.simulationList);
                this.showModal=true;
            }else{
                Swal.fire({
                      title: 'Datos incompletos',
                      text: 'Por favor, complete todos los campos requeridos para solicitar realizar la simulación'
                      })
            }
        },
        calculateDataGeneral:function(termInput){
            let tea=this.lead.interestRate;      
            //console.log("tea: ",this.person.campaign.interestRate);

            let tem=Math.pow(1+(tea/100),1/12)-1;
            //console.log("tem: ",tem);
            let amount=this.activeValueLoan;
            let comisionAmount=amount*this.comision/100;
            let shareBase=0;
            let share=0;
            let numberExtra=0;
            //calculo de la cuota
                  
            if (this.activeShare.value==2){                          //cuota extraordinaria
                //buscar si hay julio y diciembre
                numberExtra=this.findExtraMonths(termInput); //0, 1, 2
                /*if (numberExtra==0){
                    shareBase=-1; //ya se vera que se hace
                }*/
            }

            shareBase=amount*(Math.pow(1+tem,termInput+numberExtra)*tem)/(Math.pow(1+tem,termInput+numberExtra)-1);
            console.log("cuota base: ",shareBase);     
            share=(comisionAmount+shareBase).toFixed(2); //per month
            console.log("cuota mensual: ",share); 

            let tcea=(this.calculateTCEA(amount,comisionAmount,shareBase,termInput,numberExtra)).toFixed(2);
            let response=[share,tcea];  //share, tcea

            return response;
        },
        desactivaModalSch: function(){
            this.fillShowModalSchedule(false,'');
        },
        setActiveTypeLoanF:function(val){
            this.setActiveTypeLoans(val);
        },
        setActiveShareF:function(val){
            this.setActiveShares(val);
        },
        setActiveTermF:function(val){
            this.setActiveTerms(val);
            this.currentTerm=val.value;
        },
        setActiveTypeCurrencyF:function(val){
            this.setActiveTypeCurrencys(val);
        },
        setActiveValueLoanF:function(val){
            this.setActiveValueLoans(val);
        },
        updateTypeCurrency:function(){
            if (this.person.campaign.idCurrency==1){
                this.selectedCurrency="Soles";
            }else if (this.person.campaign.idCurrency==2){
                this.selectedCurrency="Dólares";
            }          
        } , 
        calculateTCEA :function(amount,comisionAmount, shareBase, termInput,numberExtra){
            let entry=(-1)*amount;
            let arr=[];
            arr.push(entry);
            let share=(comisionAmount+shareBase).toFixed(2); //simple
            for (let i=0;i<termInput-numberExtra;i++){
                    arr.push(parseFloat(share));
            }

            if (this.activeShare.value==2){ //cuota extraordinaria
                let extraShare=((shareBase*2)+comisionAmount).toFixed(2);
                for (let i=0;i<numberExtra;i++){
                    arr.push(parseFloat(extraShare));
                }
            }          

            let tir=this.computeIRR(arr,termInput+1);
            let tcea=(Math.pow(1+(tir/100),12)-1)*100;
            return tcea;
        }
        ,
        computeIRR(cf, numOfFlows){
            let LOW_RATE =0.01;
            let HIGH_RATE =0.5;
            let MAX_ITERATION =1000;
            let PRECISION_REQ =0.00000001;
            let i = 0;
            let j = 0;
            let m = 0.0;
            let old = 0.00;
            let new1 = 0.00;
            let oldguessRate = LOW_RATE;
            let newguessRate = LOW_RATE;
            let guessRate = LOW_RATE;
            let lowGuessRate = LOW_RATE;
            let highGuessRate = HIGH_RATE;
            let npv = 0.0;
            let denom = 0.0;

            for(i=0; i<MAX_ITERATION; i++){
                npv = 0.00;
                for(j=0; j<numOfFlows; j++){
                    denom = Math.pow((1 + guessRate),j);
                    npv = npv + (cf[j]/denom);
                }
                /* Stop checking once the required precision is achieved */
                if((npv > 0) && (npv < PRECISION_REQ))
                    break;

                if(old == 0)
                    old = npv;
                else
                    old = new1;
            
                new1 = npv;
            
                if(i > 0){
                    if(old < new1){
                        if(old < 0 && new1 < 0)
                            highGuessRate = newguessRate;
                        else
                            lowGuessRate = newguessRate;
                    }
                    else{
                        if(old > 0 && new1 > 0)
                        lowGuessRate = newguessRate;
                        else
                        highGuessRate = newguessRate;
                    }
                }

                oldguessRate = guessRate;
                guessRate = (lowGuessRate + highGuessRate) / 2;
                newguessRate = guessRate;
            }
            return guessRate*100;
        },
        addDays:function (dateIn_, n) {
            let moment = require('moment');
            let days = parseInt(n);
            let result = moment(dateIn_).add(days, 'days');
            return result;
        },
        findExtraMonths:function(termInput){
            let moment = require('moment');
            let month=moment();
            let countExtraMonths=0;
            for (let i=0;i<termInput;i++){
              let dateAdded=this.addDays(month,30);  
              month=moment(dateAdded).format("MM");
              if (month=='07' || month=='12'){
                  countExtraMonths=countExtraMonths+1;
              }
              month=dateAdded;
            }
            return countExtraMonths;
        }   
    },
    mounted() {
        this.fillShowModalSchedule(false,'');
        this.updateTypeCurrency();
        this.setSelectedFirstButton(false);
    },
    components:{
        ModalStep3Lending,
        ModalScheduleLending
    },
    created() {
        this.comision=this.parameterSetting.commissionPercentage;
    },
    updated(){
        console.log("updateando");
        this.setActiveValueLoans(this.valueLoan);

        this.minLoan=this.lead.minimumLoan;
        this.maxLoan=this.lead.maximumLoan; 
        if (this.valueLoan!=''){
            if (this.person.campaign.idCurrency==1){
                    this.selectedCurrencySymbol="S/.";
            }else if (this.person.campaign.idCurrency==2){
                    this.selectedCurrencySymbol="$";
            }
        }

        if(this.showModal){
            this.activaVentana();
        }
        
    }
}
</script>