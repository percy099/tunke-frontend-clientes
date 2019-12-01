<template>
    <div id="step2">
        <div class="hover-table-layout">
            
            <div class="listing-item">
            <div class="disabled-item">
                <figure class="image">
                    <img src="@/images/hipotecario.jpg" alt="image">
                    <figcaption>
                    <div class="caption">
                        <h1> </h1>
                        </div>
                    </figcaption>
                </figure>
                <div class="titleCamp">
                    <h5 align="center">{{availableCampaigns[0].name}}</h5>
                </div>      
                <div class="listing">
                    <h4>El préstamo que necesitas en muy pocos pasos. ¡Consíguelo ahora!</h4>
                </div>
            </div>
            </div>
            <div class="listing-item" @click="enableWindow">
                <figure class="image">
                    <img src="@/images/vehicular.jpeg" alt="image">
                    <figcaption>
                    <div class="caption">
                        <h1> </h1>
                        </div>
                    </figcaption>
                </figure>
                <div class="titleCamp">
                    <h5 align="center">{{availableCampaigns[1].name}}</h5>
                    <h5 align="center"></h5>
                </div>      
                <div class="listing">
                    <h4>Tenemos un plan de cuotas de acuerdo a tus necesidades. ¡Pídelo ya!</h4>
                </div>

            </div> 
            <div class="listing-item" >
                <div class="disabled-item">
                    
                <figure class="image">
                    <img src="@/images/educativo.jpg" alt="image">
                    <figcaption>
                    <div class="caption">
                        <h1> </h1>
                        </div>
                    </figcaption>
                </figure>
                <div class="titleCamp">
                    <h5 align="center">{{availableCampaigns[2].name}}</h5>
                </div>      
                <div class="listing">
                    <h4>Aprovecha la oportunidad e incrementa tu talento con este préstamo pensado para ti.</h4>
                </div>
            </div> 
            </div>
        </div>
        <!--Ventana modal de información de la campaña-->  
        <ModalStep2Lending v-if="showModal" @close="disableWindow">
            <h3 slot="header">custom header</h3>
        </ModalStep2Lending>
               
    </div>
</template>

<style scoped src="@/styles/Step2Lending.css"></style>

<script>

import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'
import ModalStep2Lending from '@/components/ModalStep2Lending.vue'

export default {
    data(){
        return {
            showModal:false
            /*,
            campaignsActive:[
                {
                    active:'',
                    endDate:'',
                    idCampaign:'',
                    idCurrency: '',
                    month: '',
                    name: '',
                    startDate: ''
                },
                {
                    active:'',
                    endDate:'',
                    idCampaign:'',
                    idCurrency: '',
                    month: '',
                    name: '',
                    startDate: ''
                },
                {
                    active:'',
                    endDate:'',
                    idCampaign:'',
                    idCurrency: '',
                    month: '',
                    name: '',
                    startDate: ''
                }

            ]*/
        };
    },
    computed:{
        ...mapState(['person','availableCampaigns']) //fillAvailableCampaigns availableCampaigns
    },
    methods:{
        ...mapActions(['changeCurrency','fillAvailableCampaigns']),
        disableWindow: function(){
            this.showModal=false;
        },
        enableWindow: function(){
            this.showModal=true;
        },
        fillCampaigns: function(){
            if (this.person.campaigns.length!=0){
                //this.campaignsActive=[];
                //this.campaignsActive=this.person.campaigns;
            }
        }
    },
    mounted() {
        //this.fillCampaigns();
    },
    components:{
        ModalStep2Lending
    }
    
}
</script>