<!-- template for the modal component -->
<template id="modal-template" >
  <transition name="modal">

        <div class="modal-container">
           <div class="closeModalSimulation"><button @click="$emit('close')">X</button></div>
           <h1 align="center">Resultado de Simulación</h1>

          <div class="modal-content">                
                <div class="row">                  
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center"></h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail boldWords" align="center">Pagar en {{simulationList[0].term}} meses</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail boldWords" align="center">Pagar en {{simulationList[1].term}} meses</h5>   
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail boldWords" align="center">Pagar en {{simulationList[2].term}} meses</h5>   
                    </div>  
                </div> 
                <div class="row mt-4">                  
                    <div class="col-sm-3 benefit">
                        <h5 class="detail boldWords" align="center">Cuota</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">{{selectedCurrencySymbol}} {{simulationList[0].share}}</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">{{selectedCurrencySymbol}} {{simulationList[1].share}}</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">{{selectedCurrencySymbol}} {{simulationList[2].share}}</h5>
                    </div>  
                </div> 
                <div class="row mt-4">    
                    <div class="col-sm-3 benefit">
                        <h5 class="detail boldWords" align="center">TCEA</h5>
                    </div>              
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">{{simulationList[0].tcea}}%</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">{{simulationList[1].tcea}}%</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">{{simulationList[2].tcea}}%</h5>
                    </div>  
                </div> 
                <div class="row mt-4">                  
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center"></h5>
                    </div>
                    <div class="col-sm-3 benefit" align="center">
                        <a class="simulation" @click="activeModalSch(0)">Detalle de crédito</a>
                    </div>
                    <div class="col-sm-3 benefit" align="center">
                        <a class="simulation" @click="activeModalSch(1)">Detalle de crédito</a>
                    </div>  
                    <div class="col-sm-3 benefit" align="center">
                        <a class="simulation" @click="activeModalSch(2)">Detalle de crédito</a>
                    </div>  
                </div> 
                <div class="row">                  
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center"></h5>
                    </div>
                    <div class="col-sm-3 benefit" align="center">
                        <button class="simulation btn p-2 mt-3 req text-white" @click="requestLoan(0)">Solicitar préstamo</button>
                    </div>
                    <div class="col-sm-3 benefit" align="center">
                        <button class="simulation btn p-2 mt-3 req text-white" @click="requestLoan(1)">Solicitar préstamo</button>
                    </div>  
                    <div class="col-sm-3 benefit" align="center">
                        <button class="simulation btn p-2 mt-3 req text-white" @click="requestLoan(2)">Solicitar préstamo</button>
                    </div>  
                </div> 
          </div>

    </div>
  </transition>
</template>

<style scoped src="@/styles/ModalStep3Lending.css"></style>

<script>

import {mapActions,mapState} from 'vuex'

export default {
    props:{
        next: { type: Function }
    },
    data(){
        return {   
            selectedCurrencySymbol:''  /*,
            calculatedShares:[]  ,
            termLoanAux:this.simulationList[0].term,
            shareLoanAux:this.simulationList[0].share,
            tceaLoanAux:this.simulationList[0].tcea,
            valueLoanAux:this.activeValueLoan*/
        };
    },
    computed:{
        ...mapState(['person','showModalSchedule','simulationList','simulationShareSelected','selectedFirstButton','activeValueLoan','parameterSetting','activeValueLoan'])  
    },
    methods:{
        ...mapActions(['changeCurrency','fillShowModalSchedule','fillSimulationsData','setSimulationShareSelected','setSelectedFirstButton']),
        activeModalSch: function(simulationOption){
            let data={
                "status":true,
                "simulation":simulationOption
            }
            this.fillShowModalSchedule(data);
            //console.log(simulationOption);
        },
        requestLoan: function(simulationOption){
            this.setSimulationShareSelected(simulationOption);
            this.setSelectedFirstButton(false);
            this.next();
        },
        updateData:function(){
            if (this.person.campaigns[0].idCurrency==1){
                this.selectedCurrencySymbol="S/.";
            }else if (this.person.campaigns[0].idCurrency==2){
                this.selectedCurrencySymbol="$";
            }   
            /*
            let amount=this.activeValueLoan;
            let comisionAmount=amount*this.parameterSetting.commissionPercentage/100; 

            this.calculatedShares=[];
            let calculatedShare=0;
            for(let i=0;i<3;i++){
                //calculatedShare=(this.simulationList[i].share+ comisionAmount).toFixed(2); //per month
                calculatedShare=(this.simulationList[i].share).toFixed(2); //per month
                console.log("calculated share",calculatedShare);
                this.calculatedShares.push(calculatedShare);
            }
            console.log("los que se estan mostrando",this.calculatedShares);*/
        }    
    },
    mounted() {
        this.updateData(); 
    },
    updated(){
        //this.updateData();
    },
    components:{
        
    }
    
}
</script>