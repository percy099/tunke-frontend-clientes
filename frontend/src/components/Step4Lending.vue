<template>
    <div id="step4">
        <div><h1 align="left">Selecciona tu cuenta</h1></div>
        <div class="col-sm-4"> <v-select class="inpt" v-model="selectedAccount" :required="!selectedAccount" :options="optionsAccount"  label="text" @input="setActiveAccountF"/></div>
        <div>
            <h2>Cuenta Seleccionada:</h2>
            <h4>CCI                :</h4>
            <h4>Tipo de cuenta     :</h4>
            <h4>Fecha de apertura  :</h4>
            <h4>Moneda             :</h4>
        </div>
        <div align="center"><button class="openAccount" @click="activaVentana">Abrir cuenta</button></div>
        <div align="center"><button class="finish" @click="requestLoan">Finalizar</button></div>
        <!--Ventana modal de la simulacion-->  
        <ModalOpenAccount v-if="showModal" @close="desactivaVentana">
            <h3 slot="header">custom header</h3>
        </ModalOpenAccount>
    </div>
</template>

<style scoped src="@/styles/Step4Lending.css">

</style>

<script>

import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'
import * as loanDA from '@/dataAccess/loanDA.js'
import ModalOpenAccount from '@/components/ModalOpenAccount.vue'

export default {
    data(){
        return {
            //Accounts
            selectedAccount:false,
            optionsAccount: [],
            showModal:false
        };
    },
    computed:{
        ...mapState(['person','currency'])
    },
    methods:{
        ...mapActions(['changeCurrency']),
        setActiveAccountF: function(){

        },
        updateAccounts: function(){

            loanDA.doRequestAccounts(this.person.idClient).then((res) =>{
                  let response_create = res.data;
                  console.log("Resultado query cuentas: ",response_create);
                  
              }).catch(error=>
              {
                  Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: 'Error en la captura de parámetros de configuración'
                  })
              })

/*
            optionsAccount=[];

            let account_n={
                "value":1,
                "text":2
            }*/
        },
        openAccount:function(){
            //ir a la ventana de apertura de cuenta
        },
        requestLoan:function(){
            loanDA.doCreateLoan(idClient,totalShares,amount,interestRate,idCampaign,idShareType).then((res) =>{
                  let response_create = res.data;
                  console.log("Resultado query cuentas: ",response_create);
                  
              }).catch(error=>
              {
                  Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: 'Error en la solicitud de préstamo'
                  })
              })
        },
        desactivaVentana: function(){
            this.showModal=false;
        },
        activaVentana: function(){
            this.showModal=true;
        }
    },
    components:{
        ModalOpenAccount
    },
    mounted() {
        this.updateAccounts();
    }
    
}
</script>