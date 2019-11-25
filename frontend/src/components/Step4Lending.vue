<template>
    <div id="step4">
        <div class=""><h1 align="left">Selecciona tu cuenta</h1></div>
        <div class="mt-4" v-if="hasAccounts"><h4>Selecciona la cuenta donde se realizará el depósito</h4></div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="my-4 "> 
                    <v-select v-if="hasAccounts" class="inpt" v-model="selectedAccount" :required="!selectedAccount" :options="optionsAccount"  label="accountNumber" @input="setActiveAccountF"/>
                    <h5 class="noAccounsts" align=center v-else>Usted no cuenta con cuentas de la moneda de la campaña</h5>
                </div>
            </div>
        </div>
        <div class="row mt-4">                  
            <div class="col-md-6 benefit"><h5 class="boldWords" align="left">Cuenta seleccionada</h5></div>
            <div class="col-md-1 benefit"><h5 class="boldWords" align="left">:</h5></div>
            <div class="col-md-4 benefit"><h5 class="detail" align="left">{{activeAccountLoan.accountNumber}}</h5></div>
        </div>
        <div class="row mt-4">                  
            <div class="col-md-6 benefit"><h5 class="boldWords" align="left">Tipo de cuenta</h5></div>
            <div class="col-md-1 benefit"><h5 class="boldWords" align="left">:</h5></div>
            <div class="col-md-4 benefit"><h5 class="detail" align="left">{{typeAccount}}</h5></div>
        </div>
        <div class="row mt-4">                  
            <div class="col-md-6 benefit"><h5 class="boldWords" align="left">Fecha de apertura</h5></div>
            <div class="col-md-1 benefit"><h5 class="boldWords" align="left">:</h5></div>
            <div class="col-md-4 benefit"><h5 class="detail" align="left">{{activeAccountLoan.openingDate}}</h5></div>
        </div>
        <div class="row mt-4">                  
            <div class="col-md-6 benefit"><h5 class="boldWords" align="left">Moneda</h5></div>
            <div class="col-md-1 benefit"><h5 class="boldWords" align="left">:</h5></div>
            <div class="col-md-4 benefit"><h5 class="detail" align="left">{{activeAccountLoan.currencyName}}</h5></div>
        </div>
        <div align="center">
            <button class="openAccount text-white p-2 btn btn-primary" @click="activaVentana">Abrir cuenta</button>
            <button class="finish ml-5 text-white p-2 btn btn-primary btnNu" @click="requestLoan" :disabled="!hasAccounts">Depositar</button>
        </div>
        <!--Ventana modal de la simulacion-->  
        <ModalOpenAccount style="z-index:9000" v-if="showModalAccount" @close="desactivaVentana">
            <h3 slot="header" style="z-index:9000">custom header</h3>
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
import * as accountDA from '@/dataAccess/accountDA.js';

export default {
    data(){
        return {
            //Accounts
            selectedAccount:false,
            optionsAccount: [],
            showModalAccount:false,
            hasAccounts : false,
            typeAccount:''
        };
    },
    computed:{
        ...mapState(['person','currency','activeAccountLoan','activeShare','activeTerm','activeValueLoan','parameterSetting','activeAccountLoan','simulationShareSelected','simulationList','selectedFirstButton']) //showModalAccount
    },
    methods:{
        ...mapActions(['changeCurrency','setActiveAccountLoans','setShowModalAccount','setSimulationShareSelected','setSelectedFirstButton']),
        setActiveAccountF: function(val){
            this.setActiveAccountLoans(val);
            if(this.activeAccountLoan.idAccountType) {this.typeAccount="Cuenta corriente";}
        },
        updateAccounts: function(){
            loanDA.doRequestAccountsByClient(this.person.idClient).then((res) =>{
                console.log(res.data);
                  let response_create = res.data;
                  this.optionsAccount=[];                
                  for (let i=0; i<response_create.accounts.length;i++){
                      if(this.person.campaign.idCurrency==response_create.accounts[i].idCurrency)
                        this.optionsAccount.push(response_create.accounts[i]);
                      else 
                        continue;
                      this.hasAccounts = true;
                  }
              }).catch(error=>
              {
                  Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: 'Error en la captura de cuentas por cliente'
                  })
              })
        },
        requestLoan:function(){
            //validar el tipo de moneda de la cuenta
            
            if (this.activeAccountLoan!='' && this.activeAccountLoan.idCurrency==this.person.campaign.idCurrency){
                let shareLoan=0;
                let shareTerm=0;
                //obtain share
                console.log("simulationSelected:", this.simulationShareSelected);
                if (this.simulationShareSelected!=-1 && !this.selectedFirstButton ){
                    console.log("Se ingreso desde alguna simulacion")
                    shareLoan=this.simulationList[this.simulationShareSelected].share;
                    shareTerm=this.simulationList[this.simulationShareSelected].term;

                }else if (this.selectedFirstButton){
                        //calcular share
                    console.log("Se ingreso desde pidelo aqui")

                    shareTerm=this.activeTerm.value;
                    //calcular cuota
                    let tea=this.person.campaign.interestRate;      
                    let tem=Math.pow(1+(tea/100),1/12)-1;
                    let amount=this.activeValueLoan;    
                    /*
                    let amortization=amount*(1/shareTerm);
                    let interesA=amount*tem;
                    let comisionAmount=amount*this.parameterSetting.commissionPercentage/100;
                    let shareNumber=amortization+interesA+comisionAmount;
                    shareLoan=shareNumber.toFixed(2);  //cuota mensual
                    */
                   
                    //calculo de la cuota
                    let shareNumber=amount*(Math.pow(1+tem,shareTerm)*tem)/(Math.pow(1+tem,shareTerm)-1);
                    console.log("cuota calculada: ",shareNumber);           
                    let comisionAmount=amount*this.parameterSetting.commissionPercentage/100;
                    shareLoan=(comisionAmount+shareNumber).toFixed(2); //per month
                    console.log("cuota mensual: ",shareLoan);    
                }
                
                let commissionLoan=(this.parameterSetting.commissionPercentage*this.activeValueLoan/100).toFixed(2);

                /**/
                console.log(this.person.idClient);              //cliente
                console.log(shareTerm);                         //plazos
                console.log(this.activeValueLoan);              //monto
                console.log(this.person.campaign.interestRate); //interes
                console.log(this.person.campaign.idCampaign);   //id campaña
                console.log("shareLoan",shareLoan);             //cuota
                console.log(this.activeAccountLoan.idAccount);  //idcuenta
                console.log(commissionLoan);                    //comision

                loanDA.doCreateLoan(this.person.idClient,shareTerm,parseFloat(this.activeValueLoan),parseFloat(this.person.campaign.interestRate),this.person.campaign.idCampaign,this.activeShare,shareLoan, this.activeAccountLoan.idAccount, parseFloat(commissionLoan)).then((res) =>{
                    let response_create = res.data;
                    console.log("Resultado query cuentas: ",response_create);
                    this.$router.push('/summaryLoan');
                    
                }).catch(error=>
                {
                    Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en la solicitud de préstamo'
                    })
                })

            }else{
                //no tienen el mismo tipo de moneda
                Swal.fire({
                    title: 'Tipo de moneda incoherente',
                    type: 'error',
                    html: 'El tipo de moneda de la cuenta no coincide con el tipo de moneda del préstamo solicitado. <br /><br />'+
                            'Por favor, seleccione otra cuenta para realizar el depósito.'
                    })
            }
        },
        desactivaVentana: function(){
            this.showModalAccount=false;
            this.updateAccounts();
            //this.setShowModalAccount(false);
        },
        activaVentana: function(){
            this.showModalAccount=true;
            //this.setShowModalAccount(true);
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