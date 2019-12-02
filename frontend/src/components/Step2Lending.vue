<template>
    <div id="step2">
        <div class="hover-table-layout">
            
            <div class="listing-item" @click="enableWindow(0)" v-on:mouseover="mouseOver(0)">
            <div v-bind:class="{'disabled-item':(this.availableCampaigns[0].month=='')}" >
                <figure class="image">
                    <img src="@/images/hipotecario.jpg" alt="image">
                    <figcaption>
                        <div class="caption">
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
            <div class="listing-item" @click="enableWindow(1)" v-on:mouseover="mouseOver(1)">
                <div v-bind:class="{'disabled-item':(this.availableCampaigns[1].month=='')}">
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
            </div> 
            <div class="listing-item" @click="enableWindow(2)" v-on:mouseover="mouseOver(2)">
                <div v-bind:class="{'disabled-item':(this.availableCampaigns[2].month=='')}">
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
        <div class="row">
            <div class="col-4"  @click="changeSelectCampaign(0)"><hr  v-bind:class="{'selected':(this.campaignWindowSelected==0)}"></div>
            <div class="col-4"  @click="changeSelectCampaign(1)"><hr  v-bind:class="{'selected':(this.campaignWindowSelected==1)}"></div>
            <div class="col-4"  @click="changeSelectCampaign(2)"><hr  v-bind:class="{'selected':(this.campaignWindowSelected==2)}"></div>            
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
            
        };
    },
    computed:{
        ...mapState(['person','availableCampaigns','campaignWindowSelected']) 
    },
    methods:{
        ...mapActions(['changeCurrency','fillAvailableCampaigns','fillcampaignWindowSelected']),
        disableWindow: function(){
            this.showModal=false;
        },
        enableWindow: function(campaignOption){           
            if(this.availableCampaigns[campaignOption].month!=''){
                this.fillcampaignWindowSelected(campaignOption);
                console.log("en step2 ventana:",this.campaignWindowSelected);
                this.showModal=true;
            }
        },
        changeSelectCampaign : function(campaignOption){           
            if(this.availableCampaigns[campaignOption].month!=''){
                this.fillcampaignWindowSelected(campaignOption);
            }    
        },
        mouseOver:function (campaignOption) {
            if(this.availableCampaigns[campaignOption].month!=''){
                this.fillcampaignWindowSelected(campaignOption);
            } 
        }
    },
    components:{
        ModalStep2Lending
    }
    
}
</script>