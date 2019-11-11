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
                    <div class="col-sm-4"> <v-select class="inpt" v-model="selectedTypeLoan" :required="!selectedTypeLoan" :options="optionsTypeLoan"  label="text" @input="setActiveTypeLoanF"/></div>
                    <div class="col-sm-4"> <v-select class="inpt" v-model="selectedTypeShare" :required="!selectedTypeShare" :options="optionsShare"  label="text" @input="setActiveShareF"/></div>
                    <div class="col-sm-4"> <v-select class="inpt" v-model="selectedTerm" :required="!selectedTerm" :options="optionsTerm"  label="text" @input="setActiveTermF"/></div>
                </div>
            </div>
            <div class="parameters2">
                <div class="row"> 
                  
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3"><h3>Tipo de moneda</h3></div>
                    <div class="col-sm-3"><h3>Monto</h3></div>
                    <div class="col-sm-3"><h3></h3></div>
                  
                </div>
                <div class="row"> 
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3"><v-select class="inpt" v-model="selectedCoin" :required="!selectedCoin" :options="optionsTypeCoin"  label="text" @input="setActiveTypeCoinF"/></div>
                    <div class="col-sm-3"><input class="inpt" type="number" v-model="valueLoan"></div>
                    <!--vue-range-slider ref="slider" v-model="activeValueLoan" :min="minLoan" :max="maxLoan" :bg-style="bgStyle" :tooltip-style="tooltipStyle" :process-style="processStyle"></vue-range-slider-->
                    <div class="col-sm-3"><h3></h3></div>
                </div>
                <div class="row"> 
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3 button_pos" align="center"><button class="simulation" @click="activaVentana">Simular </button></div>
                    <div class="col-sm-3 button_pos" align="center"><button class="request">Pídelo aquí</button></div>
                   <div class="col-sm-3"><h3></h3></div>
                </div>
            </div>
            
        </div>
        <!--Ventana modal de la simulacion-->  
        <ModalStep3Lending v-if="showModal" @close="desactivaVentana">
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
/*
:bg-style="bgStyle" :tooltip-style="tooltipStyle" :process-style="processStyle"
 :min="minLoan" :max="maxLoan"

<h1> {{lead.idShareType}}</h1>
        <h1> {{lead.minimumLoan}}</h1>
        <h1> {{lead.maximumLoan}}</h1>
        <h1> {{lead.active}}</h1>
        <h1> {{lead.idCampaign}}</h1>
        <h1> {{lead.idClient}}</h1>*/

import * as loanDA from '@/dataAccess/loanDA.js'
import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import ModalStep3Lending from '@/components/ModalStep3Lending.vue'
import ModalScheduleLending from '@/components/ModalScheduleLending.vue'

export default {
    data(){
        return {
            showModal:false,
            comision:0.25,
            //seguros:1.5,
            minLoan:50,
            maxLoan:1000,
            valueLoan: '',
         /*   bgStyle : {
        backgroundColor: '#fff',
        boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        tooltipStyle : {
        backgroundColor: '#666',
        borderColor: '#666'
        },
        processStyle : {
        backgroundColor: '#999'
        },*/
            //Tipo de prestamo
            selectedTypeLoan:false,
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
            optionsTerm: [],
            //Tipo de moneda
            selectedCoin:false,
            optionsTypeCoin: [{
                value:1, text:'Soles'
            },{
                value:2, text:'Dólares'
            }]
        }
    },
    computed:{
        ...mapState(['person','currency','lead','activeTypeLoan','activeShare','activeTerm','activeTypeCoin','activeValueLoan','showModalSchedule','simulationList'])
    },
    methods:{
        ...mapActions(['changeCurrency','fillLead','setActiveTypeLoans','setActiveShares','setActiveTerms','setActiveTypeCoins','setActiveValueLoans','fillShowModalSchedule','fillSimulationsData']),
        desactivaVentana: function(){
            this.showModal=false;
        },
        activaVentana: function(){
            /*
            console.log(this.activeTypeLoan);
            console.log(this.activeShare);
            console.log(this.activeTerm);
            console.log(this.activeTypeCoin);
            console.log(this.activeValueLoan);*/
            if (this.activeTypeLoan!=null && this.activeShare!=null && this.activeTerm!=null && this.activeTypeCoin!=null && this.activeValueLoan!=0){
                
                //buscar la posicion del regMain y escoger dos simulaciones adicionales
                let periodsList=[]
                
                for (let i=this.person.campaign.minimumPeriod;i<=this.person.campaign.maximumPeriod;i++){
                    periodsList.push(i);
                }
                let termMain=this.activeTerm.value;
                let termMainPos=periodsList.indexOf(termMain);

                let primero=this.optionsTerm[0];
                let tercero=this.optionsTerm[periodsList.length-1];
                let segundo=null;

                if (termMainPos==0 || termMainPos==(periodsList.length-1)){
                    //esta en el inicio o en el final
                     segundo=this.optionsTerm[1];
                }else{
                    //esta en otra posicion
                     segundo=this.optionsTerm[termMainPos];
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
            }
        },
        calculateDataGeneral:function(termInput){
            //let tea=this.person.campaign.interestRate;                  
            let tea=22;

            let tem=Math.pow(1+(tea/100),1/12)-1;
            let amount=this.activeValueLoan;

            //calculo de la cuota
            //let shareNumber=amount*(Math.pow(1+tem,termInput)*tem)/(Math.pow(1+tem,termInput)-1);
            //let share=shareNumber.toFixed(2);
            let shareNumber=amount*((1/termInpt)+(tem/100)+(this.comision/100));

            let comisionAmount=amount*this.comision/100;
            //let segurosAmount=amount*this.seguros/100;
            let interesAmount=amount*(Math.pow(1+(tea/100),30*termInput/360)-1);
            //let interesAmountSum=interesAmount+comisionAmount+segurosAmount;
            let interesAmountSum=interesAmount+comisionAmount;

            let totalLoan=parseFloat(interesAmountSum)+parseFloat(amount);
            //calculo de la tcea
            let tceaNumber=((totalLoan/amount)-1)*100;
            let tcea=tceaNumber.toFixed(2);

            let response=[share,tcea];  //share, tcea
            return response;
        },
        desactivaModalSch: function(){
            this.fillShowModalSchedule(false,'');
        },
        getLeadClient:function(){
            console.log(this.person.idLead);
            loanDA.doRequestLead(this.person.idLead).then((res) =>{
                let lead_data = res.data;
                console.log(lead_data)
                this.fillLead(lead_data);
            }).catch(error=>
                  {
                      Swal.fire({
                      title: 'Error',
                      type: 'error',
                      text: 'Error en la captura del Lead del cliente'
                      })
            })
        },
        setActiveTypeLoanF:function(val){
            this.setActiveTypeLoans(val);
        },
        setActiveShareF:function(val){
            this.setActiveShares(val);
        },
        setActiveTermF:function(val){
            this.setActiveTerms(val);
        },
        setActiveTypeCoinF:function(val){
            this.setActiveTypeCoins(val);
        },
        setActiveValueLoanF:function(val){
            this.setActiveValueLoans(val);
        },
        fillDataTerms: function(){
            let min_Periodo=this.person.campaign.minimumPeriod;
            let max_Periodo=this.person.campaign.maximumPeriod;
            
            for (let period=min_Periodo;period<=max_Periodo;period++){
                let text_period=period + ' meses';
                let reg={value: period, text:text_period};
                this.optionsTerm.push(reg);
            }
        }
        
    },
    mounted() {
        this.getLeadClient();
        this.fillShowModalSchedule(false,'');
        
    },
    components:{
        VueRangeSlider,
        ModalStep3Lending,
        ModalScheduleLending
    },
    created() {
        this.fillDataTerms();
        /*
        this.enableCross = false;
        this.bgStyle = {
        backgroundColor: '#fff',
        boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        };
        this.tooltipStyle = {
        backgroundColor: '#666',
        borderColor: '#666'
        };
        this.processStyle = {
        backgroundColor: '#999'
        };*/
    },
    updated(){
        this.setActiveValueLoans(this.valueLoan);
    }
}
</script>