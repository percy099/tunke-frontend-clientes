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
                        <h5 class="detail" align="center">Pagar en {{simulationList[0].term}} meses</h5>
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">Pagar en {{simulationList[1].term}} meses</h5>   
                    </div>
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">Pagar en {{simulationList[2].term}} meses</h5>   
                    </div>  
                </div> 
                <div class="row">                  
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">Cuota</h5>
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
                <div class="row">    
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center">TCEA</h5>
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
                <div class="row">                  
                    <div class="col-sm-3 benefit">
                        <h5 class="detail" align="center"></h5>
                    </div>
                    <div class="col-sm-3 benefit" align="center">
                        <button class="simulation" @click="activaModalSch(0)">Detalle de crédito</button>
                    </div>
                    <div class="col-sm-3 benefit" align="center">
                        <button class="simulation" @click="activaModalSch(1)">Detalle de crédito</button>
                    </div>  
                    <div class="col-sm-3 benefit" align="center">
                        <button class="simulation" @click="activaModalSch(2)">Detalle de crédito</button>
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
    data(){
        return {   
            selectedCurrencySymbol:''     
        };
    },
    computed:{
        ...mapState(['person','showModalSchedule','simulationList'])
    },
    methods:{
        ...mapActions(['changeCurrency','fillShowModalSchedule','fillSimulationsData']),
        activaModalSch: function(simulationOption){
            let data={
                "status":true,
                "simulation":simulationOption
            }
            this.fillShowModalSchedule(data);
            console.log(simulationOption);
        },
        updateCurrencySymbol:function(){
            if (this.person.campaign.idCurrency==1){
                this.selectedCurrencySymbol="S/.";
            }else if (this.person.campaign.idCurrency==2){
                this.selectedCurrencySymbol="$";
            }          
        }    
    },
    mounted() {
        this.updateCurrencySymbol();
    },
    components:{
        
    }
    
}
</script>