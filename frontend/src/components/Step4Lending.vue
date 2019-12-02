<template>
    <div id="step4" class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="false"></loading>
 
        <div class=""><h1 align="left">Selecciona tu cuenta</h1></div>
        <div class="mt-4" v-if="hasAccounts"><h4>Selecciona la cuenta donde se realizará el depósito</h4></div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="my-4 "> 
                    <v-select v-if="hasAccounts" class="inpt" v-model="selectedAccount" :required="!selectedAccount" :options="accountsAvailables"  label="accountNumber" @input="setActiveAccountF"/>
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    data(){
        return {
            selectedAccount:false,
            showModalAccount:false,
            typeAccount:'',
            isLoading : false
        };
    },
    computed:{
        ...mapState(['person',,'lead','currency','activeAccountLoan','activeShare','activeTerm','activeValueLoan','parameterSetting','activeAccountLoan','simulationShareSelected','simulationList','selectedFirstButton','currencyCampaignSelected','campaignWindowSelected','availableCampaigns','accountsAvailables','hasAccounts']) 
    },
    methods:{
        ...mapActions(['changeCurrency','setActiveAccountLoans','setShowModalAccount','setSimulationShareSelected','setSelectedFirstButton','fillAccountsAvailables','fillHasAccounts']),
        setActiveAccountF: function(val){
            this.setActiveAccountLoans(val);
            if(this.activeAccountLoan.idAccountType==1) {
                this.typeAccount="Cuenta corriente";
            }else if(this.activeAccountLoan.idAccountType==2) {
                this.typeAccount="Cuenta Sueldo";
            }else if(this.activeAccountLoan.idAccountType==3) {
                this.typeAccount="Cuenta Fantasy";
            }   
        },
        requestLoan:function(){
            //validar el tipo de moneda de la cuenta
            
            if (this.activeAccountLoan!='' && this.activeAccountLoan.idCurrency==this.currencyCampaignSelected.idCurrency){
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
                    console.log("Se ingreso desde pidelo aqui222");
                    console.log("aheee:",this.activeTerm);
                    shareTerm=this.activeTerm.value;
                    
                    let shareNumber=0;
                    let numberExtra=0;
                    //calcular cuota
                    let tea=this.lead.interestRate;      
                    let tem=Math.pow(1+(tea/100),1/12)-1;
                    let amount=this.activeValueLoan;    

                    if (this.activeShare.value==2){                          //cuota extraordinaria
                        //buscar si hay julio y diciembre
                        numberExtra=this.findExtraMonths(shareTerm); //0, 1, 2...
                    }

                    //calculo de la cuota
                    shareNumber=amount*(Math.pow(1+tem,shareTerm+numberExtra)*tem)/(Math.pow(1+tem,shareTerm+numberExtra)-1);
                    console.log("cuota calculada: ",shareNumber);           
                    let comisionAmount=amount*this.parameterSetting.commissionPercentage/100;
                    shareLoan=(comisionAmount+shareNumber).toFixed(2); //per month
                    console.log("cuota mensual: ",shareLoan);    
                }
                
                let commissionLoan=(this.parameterSetting.commissionPercentage*this.activeValueLoan/100).toFixed(2);

                /**/
                console.log("idclient",this.person.idClient);              //cliente
                console.log("num meses",shareTerm);                         //plazos
                console.log("monto",this.activeValueLoan);              //monto
                console.log("interes tea",this.lead.interestRate); //interes
                console.log("idcampaign",this.availableCampaigns[this.campaignWindowSelected].idCampaign);   //id campaña   
                console.log("cuota mensual",shareLoan);             //cuota
                console.log("idcuenta",this.activeAccountLoan.idAccount);  //idcuenta
                console.log("comision monto",commissionLoan);                    //comision
                this.isLoading = true;
                loanDA.doCreateLoan(this.person.idClient,shareTerm,parseFloat(this.activeValueLoan),parseFloat(this.lead.interestRate),this.availableCampaigns[this.campaignWindowSelected].idCampaign,this.activeShare.value,shareLoan, this.activeAccountLoan.idAccount, parseFloat(commissionLoan),this.lead.idLead).then((res) =>{
                    this.isLoading = false;
                    let response_create = res.data;
                    console.log("Resultado query cuentas: ",response_create);
                    this.$router.push('/summaryLoan');
                    
                }).catch(error=>
                {
                    this.isLoading = false;
                    console.log("error de registro de nuevo prestamo:",error);
                    Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en la solicitud de préstamo'
                    })
                })
                this.hasAccounts=false;

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
        },
        activaVentana: function(){
            this.showModalAccount=true;
        },
        addDays:function (dateIn_, n) {
            let moment = require('moment');
            let days = parseInt(n);
            let result = moment(dateIn_).add(days, 'days');
            return result;
        },
        findExtraMonths(termInput){
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
    components:{
        ModalOpenAccount,
        Loading
    },
    mounted() {
         
    }
    
}
</script>