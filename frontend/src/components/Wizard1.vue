<template>
    <div class="">
        <form-wizard next-button-text="Siguiente" title="" subtitle="" color="#2CFFBA" shape="circle" 
        back-button-text="Atrás" finish-button-text="Abrir cuenta" @on-complete="onComplete"
        step-size="sm" id="container">
            <tab-content title="Identifícate">
               <Step1NoClient></Step1NoClient>
            </tab-content>
            <tab-content title="Permítenos conocerte" :before-change="registerCurrency">>
                <Step2NoClient></Step2NoClient>
            </tab-content>
            <tab-content title="Elige tu cuenta" class="">
                <Step3NoClient></Step3NoClient>
            </tab-content>
        </form-wizard>
    </div>
</template>

<style src="@/styles/Wizard.css" scoped>

</style>

<script>

import Step1NoClient from "@/components/Step1NoClient.vue";
import Step2NoClient from '@/components/Step2NoClient.vue';
import Step3NoClient from '@/components/Step3NoClient.vue';
import * as accountDA from '@/dataAccess/accountDA.js';
import * as personDA from '@/dataAccess/personDA.js';
import {mapState, mapActions} from 'vuex';

export default {
    computed:{
        ...mapState(['person','currency'])
    },
    methods:{
        ...mapActions(['captureResponse']),
        onComplete (){
            accountDA.doCreateAccount(this.person.idPerson,this.currency).then((res) =>{
                  let response_create = res.data;
                  this.captureResponse(response_create);
                  this.$router.push('/summarySale');
              }).catch(error=>
              {
                  Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: 'Error al crear la cuenta'
                  })
              })
        },
        registerCurrency(){
            personDA.doRegisterProspect(this.person.idPerson,this.person.email1,this.person.email2,this.person.cellphone1,this.person.cellphone2).then((res) =>{
                console.log(res.data);
            }).catch(error=>
            {
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error en los datos'
                })
            })
            return true;
        }
    },
    components:{
        Step1NoClient,
        Step2NoClient,
        Step3NoClient
    }

}
</script>