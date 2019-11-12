<!-- template for the modal component -->
<template id="modal-template" >
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container">
           <div class="closeModalSimulation"><button @click="$emit('close')">X</button></div>         
          <div class="modal-content">                
                <div class="row">                  
                    <div class="col-sm-4 benefit">
                        <h5 class="detail" align="center">Plazos</h5>
                        <h6 class="detail" align="justify">Tienes hasta 48 meses para pagar tus préstamos. No te compliques y solicita el préstamo que necesitas</h6>   
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

<style scoped src="@/styles/ModalOpenAccount.css"></style>

<script>

import {mapActions,mapState} from 'vuex'

export default {
    data(){
        return {            
        };
    },
    computed:{
        ...mapState(['person'])
    },
    methods:{
        ...mapActions(['changeCurrency'])
    },
    mounted() {
    },
    components:{
    }
    
}
</script>