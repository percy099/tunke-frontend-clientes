<template>
    <div id="step3">
        <h1> {{lead.idShareType}}</h1>
        <h1> {{lead.minimumLoan}}</h1>
        <h1> {{lead.maximumLoan}}</h1>
        <h1> {{lead.active}}</h1>
        <h1> {{lead.idCampaign}}</h1>
        <h1> {{lead.idClient}}</h1>
    </div>
</template>

<style scoped src="@/styles/Step2Lending.css">

</style>

<script>

import * as loanDA from '@/dataAccess/loanDA.js'
import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'

export default {
    data(){
        return {
        };
    },
    computed:{
        ...mapState(['person','currency','lead'])
    },
    methods:{
        ...mapActions(['changeCurrency','fillLead']),
        goCampaignSimulation: function(){
            Swal.fire({
                    title: 'Mayor informacion',
                    html: 'Dar mayor información de la campaña'
                    })
        },
        getLeadClient:function(){
            loanDA.doRequestLead(this.person.idClient,this.person.campaign.idCampaign).then((res) =>{
                let lead_data = res.data;
                this.fillLead(lead_data);
            }).catch(error=>
                  {
                      Swal.fire({
                      title: 'Error',
                      type: 'error',
                      text: 'Error en la captura del Lead del cliente'
                      })
            })
        }
    },
    created() {
        this.getLeadClient();
    }
    
}
</script>