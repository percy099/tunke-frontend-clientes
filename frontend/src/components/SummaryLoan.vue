<template>
    <div id="step4">
        <div class="container mt-5">
            <div class="row pt-5">
                <div class="col-2"></div>
                <div class="col-1">
                    <img class="pl-3" src="@/images/tick.png" height="45">
                </div>
                <div class="col-9">
                    <h2>Se depositó con éxito a la siguiente cuenta:</h2>
                </div>
            </div>
            
            <h5 class="text-center mt-5">Fecha de depósito: {{currentDate}}</h5>


            <div class="row mt-4">
                <div class="col-4"></div>
                <div class="col-1">
                    <h5 class="firstWords">Beneficiario:</h5>
                </div>
                <div class="col-7">
                    <h5>{{person.firstName}} {{person.middleName}} {{person.fatherLastname}} {{person.motherLastname}}</h5>
                    <!--h5>{{activeAccountLoan.accountNumber}}</h5-->
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-4"></div>
                <div class="col-1">
                    <h5 class="firstWords">Cuenta de depósito:</h5>
                </div>
                <div class="col-7">
                    <!--h5>{{person.firstName}} {{person.middleName}} {{person.fatherLastname}} {{person.motherLastname}}</h5-->
                    <h5>{{activeAccountLoan.accountNumber}}</h5>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-4"></div>
                <div class="col-1">
                    <h5 class="firstWords">Monto del préstamo:</h5>
                </div>
                <div class="col-7">
                    <h5>{{activeAccountLoan.currencySymbol}} {{activeValueLoan}}</h5>
                </div>
            </div>

        </div>
        <div class="text-center mt-5">
            <button class="btn btn-primary text-white p-2 mt-5"  @click="goPrincipal">Página Principal</button>
        </div>
    </div>
</template>



<script>

import {mapActions,mapState} from 'vuex'
import router from '@/router.js'

export default {
    data(){
        return {
            currentDate:new Date()
        }
    },
    computed:{
        ...mapState(['person','currency','activeAccountLoan','activeShare','activeTerm','activeValueLoan','parameterSetting','activeAccountLoan','simulationShareSelected','simulationList']) //showModalAccount
    },
    mounted(){
        let moment = require('moment');
        this.currentDate=moment().format("DD/MM/YYYY hh:mm A");
    },
    methods:{
        goPrincipal: function(){
            this.$router.push('/');
        }
    }
    
}
</script>

<style src="@/styles/SummaryLoan.css" scoped>

</style>