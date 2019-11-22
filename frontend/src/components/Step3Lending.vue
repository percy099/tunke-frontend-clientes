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
                    <div class="col-sm-4"> <v-select class="inpt" v-model="selectedTerm" :required="!selectedTerm" :options="optionsTerm"  label="text" @input="setActiveTermF"/></div>
                </div>
            </div>
            <div class="parameters2">
                <div class="row"> 
                  
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3"><h3>Tipo de moneda</h3></div>
                    <div class="col-sm-3"><h3>Monto  {{valueLoan}}</h3></div>
                    <div class="col-sm-3"><h3></h3></div>
                  
                </div>
                <div class="row"> 
                    <div class="col-sm-3"><h3></h3></div>
                    <div class="col-sm-3"><input disabled type="text" class="form-control inpt" v-model="selectedCurrency" @input="setActiveTypeCurrencyF"></div>
                    <div class=" col-sm-3 slidecontainer">
                        <h5>{{minLoan}}</h5>
                        <input type="range" :min="minLoan" :max="maxLoan" step="10" v-model="valueLoan"  class="slider" id="myRange">            
                    </div>
                        <h5>{{maxLoan}}</h5>
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
            optionsTerm: [],
            //Tipo de moneda
            selectedCurrency:''
        }
    },
    computed:{
        ...mapState(['person','currency','lead','activeTypeLoan','activeShare','activeTerm','activeTypeCurrency','activeValueLoan','showModalSchedule','simulationList','parameterSetting','simulationShareSelected','selectedFirstButton'])
    },
    methods:{
        ...mapActions(['changeCurrency','fillLead','setActiveTypeLoans','setActiveShares','setActiveTerms','setActiveTypeCurrencys','setActiveValueLoans','fillShowModalSchedule','fillSimulationsData','setSimulationShareSelected','setSelectedFirstButton']),
        loanSolicitude(){
            if (this.activeShare!=null && this.activeTerm!=null && this.activeValueLoan!=0 && this.activeValueLoan>0){
                console.log("monto de prestamo: ",this.activeValueLoan);
                this.method();
            }else{
                Swal.fire({
                      title: 'Error',
                      type: 'error',
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
            /*
            console.log(this.activeTypeLoan);
            console.log(this.activeShare);
            console.log(this.activeTerm);
            console.log(this.activeTypeCoin);
            console.log(this.activeValueLoan);*/
            if (this.activeShare!=null && this.activeTerm!=null && this.activeValueLoan!=0 && this.activeValueLoan>0){
                
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
            let tea=this.person.campaign.interestRate;      
            //console.log("interestRate: ",this.person.campaign.interestRate);
            //let tea=22;

            let tem=Math.pow(1+(tea/100),1/12)-1;
            let amount=this.activeValueLoan;

            //calculo de la cuota
            //let shareNumber=amount*(Math.pow(1+tem,termInput)*tem)/(Math.pow(1+tem,termInput)-1);
            //let share=shareNumber.toFixed(2);
            
            let amortization=amount*(1/termInput);
            let interesA=amount*tem;
            let comisionAmount=amount*this.comision/100;
            let shareNumber=amortization+interesA+comisionAmount;
            let share=shareNumber.toFixed(2);  //cuota mensual

            let interesAmount=amount*(Math.pow(1+(tea/100),30*termInput/360)-1);
            let interesAmountSum=interesAmount+comisionAmount;

            let totalLoan=parseFloat(interesAmountSum)+parseFloat(amount);
            //calculo de la tcea
            let tceaNumber=((totalLoan/amount)-1)*100;
            let tcea=tceaNumber.toFixed(2);

            let response=[share,tcea];  //share, tcea


            /** ##################3PRUEBA */
            /*let prueba=this.calculateTCEA(amount,share, termInput);
            console.log("TCEA calculada:", prueba);*/
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
        },
        setActiveTypeCurrencyF:function(val){
            this.setActiveTypeCurrencys(val);
        },
        setActiveValueLoanF:function(val){
            this.setActiveValueLoans(val);
        },
        fillDataTerms: function(){
            this.minLoan=this.lead.minimumLoan;
            this.maxLoan=this.lead.maximumLoan;


            let min_Periodo=this.person.campaign.minimumPeriod;
            let max_Periodo=this.person.campaign.maximumPeriod;
            
            for (let period=min_Periodo;period<=max_Periodo;period++){
                let text_period=period + ' meses';
                let reg={value: period, text:text_period};
                this.optionsTerm.push(reg);
            }
        },
        updateTypeCurrency:function(){
            if (this.person.campaign.idCurrency==1){
                this.selectedCurrency="Soles";
            }else if (this.person.campaign.idCurrency==2){
                this.selectedCurrency="Dólares";
            }          
        } , 
        calculateTCEA :function(amount,share, termInput){
            let Finance = require('financejs');
            let finance = new Finance();
            
            let arr=[];
            let entry=(-1)*amount;
            arr.push(entry);
            for (let i=0;i<termInput;i++){
                arr.push(parseFloat(share));
                console.log(arr[i]>0);
            }

            console.log("monto: ", amount);
            console.log("entry: ", entry);
            console.log("arr: ", arr);
            //{ depth: 1500, cashFlow: cashFlow }
            let tir=finance.IRR({ depth: entry, cashFlow: [-500,100,200,200]});
            console.log("tir: ", tir);
            
                
            let tcea=(Math.pow(1+(tir/100),12)-1)*100;
            return tcea;

        }
        ,
        getLoan(){
            let slider = document.getElementById("myRange");
            this.sliderValue=slider.value;
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
        this.fillDataTerms();
        this.comision=this.parameterSetting.commissionPercentage;
    },
    updated(){
        this.setActiveValueLoans(this.valueLoan);
    }
}
</script>