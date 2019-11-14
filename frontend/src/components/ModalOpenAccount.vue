<!-- template for the modal component -->
<template style="position: absolute ; z-index:1000" id="modal-template" >
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" >
        <div class="modal-container">
           <div class="closeModalSimulation"><button @click="$emit('close')">X</button></div>         
          <div class="modal-content">  
                <h1 align="center">Apertura de cuenta</h1>
                <ReusableOpenAccount></ReusableOpenAccount>
                <div align="center"><button class="openNewAccount" @click="openAccount" >Abrir cuenta</button></div>
          </div>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped src="@/styles/ModalOpenAccount.css"></style>

<script>

import {mapActions,mapState} from 'vuex'
import ReusableOpenAccount from '@/components/Step2Client.vue'
import Swal from 'sweetalert2'
import * as accountDA from '@/dataAccess/accountDA.js';

export default {
    data(){
        return {            
        };
    },
    computed:{
        ...mapState(['person','currency','termsReadLoan','clientAcceptedTerms','processId','showModalAccount','setShowModalAccount']) 
    },
    methods:{
        ...mapActions(['changeCurrency']),
        openAccount (){
            if (this.clientAcceptedTerms){
              //this.$emit('close'); //QUITAR EN ORIGINAL
              
              accountDA.doCreateAccount(this.person.idPerson,this.currency).then((res) =>{
                    let response_create = res.data;
                    console.log("response open account",response_create);
                    //this.captureResponse(response_create);
                    this.$emit('close');
                }).catch(error=>
                {
                    Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error al crear la cuenta'
                    })
                })
            }else{
              Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Por favor, lea y acepte los términos y condiciones'
                    })
            }
            
            
        }
    },
    mounted() {
    },
    components:{
      ReusableOpenAccount
    }
  /*  beforeUpdate(){
      if(this.termsReadLoan){
          //this.$emit('close');
          Swal.fire({
                title: 'Términos y condiciones',
                        
                text: 'TUNKE es una empresa privada que brinda servicios financieros en el Perú. En ese sentido, nos comprometemos a mantener la privacidad y la protección de información de nuestros clientes, proveedores y colaboradores de conformidad con lo establecido en la Ley No. 29733, Ley de Protección de datos personales y su reglamento, adoptando para ello las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados por los titulares de datos personales, asimismo garantizando la mejora continua de dichas medidas. En tal contexto, declaramos los siguientes lineamientos que debemos informar previamente a nuestros clientes, proveedores y colaboradores, de forma clara e inequívoca, cuando se recaben sus datos personales a través de cualquiera de nuestros canales:  \n La existencia del tratamiento de datos de carácter personal, la finalidad de la recolección y destinatarios de la información.'
                                +'\n Carácter obligatorio o facultativo de la respuesta a las preguntas que en su caso les sean planteadas, así como de las consecuencias de la obtención de los datos personales o la negativa a suministrar los mismos.'                      })
          //this.setShowModalAccount(true);
      }//mostrar mensaje 
    }*/
    
}
</script>