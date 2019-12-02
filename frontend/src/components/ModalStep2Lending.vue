<!-- template for the modal component -->
<template id="modal-template" >
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container">
           
            <figure class="top-part">
              <img src="@/images/vehicularO.jpg" alt="image">            
                <div class="caption">
                  <h2 align="left">{{availableCampaigns[campaignWindowSelected].name}}</h2>
                  <h5 align="left">Aprovecha la oportunidad para obtener lo que tanto deseas</h5>
                </div>              
            </figure>
          
          <div class="modal-content">                
                <div class="row">                  
                    <div class="col-sm-4 benefit">
                        <h5 class="detail" align="center">Plazos</h5>
                        <h6 class="detail" align="justify">Tienes hasta {{maxTerm}} meses para pagar tus préstamos. No te compliques y solicita el préstamo que necesitas</h6>   
                    </div>
                    <div class="col-sm-4 benefit">
                        <h5 class="detail" align="center">Cuotas flexibles</h5>
                        <h6 class="detail" align="justify">Te brindamos facilidades de pago con un plan de acuerdo a tus necesidades</h6>   
                    </div>
                    <div class="col-sm-4 benefit">
                        <h5 class="detail" align="center">Tasa especial</h5>
                        <h6 class="detail" align="justify">Aprovecha una tasa más baja solicitando tu préstamo ahora</h6>
                    </div>  
                  </div> 
          </div>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped src="@/styles/ModalStep2Lending.css"></style>

<script>

import {mapActions,mapState} from 'vuex'

export default {
    data(){
        return {        
          maxTerm:0
        };
    },
    computed:{
        ...mapState(['person','availableCampaigns','campaignWindowSelected'])
    },
    methods:{
        ...mapActions(['changeCurrency','fillAvailableCampaigns','fillcampaignWindowSelected']),
        calculateMaxTerm: function(){
            let maxPeriod=this.availableCampaigns[this.campaignWindowSelected].idLead.maximumPeriod;
            let minPeriod=this.availableCampaigns[this.campaignWindowSelected].idLead.minimumPeriod;
            let maxAux=0;
            for(let i=minPeriod;i<=maxPeriod;i++){
              let resto=i%6;
              if(resto==0){
                maxAux=i;
              }
            }
            this.maxTerm=maxAux;
        }
    },
    mounted() {
      this.calculateMaxTerm();
    }    
}
</script>