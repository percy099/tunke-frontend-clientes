<!-- template for the modal component -->
<template id="modal-template" >
  <transition name="modal">
    <div class="modal-mask">
      <div style="z-index:9500" class="modal-wrapper">
        <div class="modal-container">
           <div class="closeModalSimulation"><button @click="$emit('close')">X</button></div>         
          <div class="modal-content">  
                <h1 align="center">Apertura de cuenta</h1>
                <div id="step3">
                  <div class="tab">
                      <button id="btnSimple" class="tablinks" v-on:click="openTab('simpleAccount')">Cuenta Simple  <img class="cards" width="25" src="@/images/credit-cards.png"></button>
                      <button id="btnMillionaire" class="tablinks inactive" v-on:click="openTab('millionaireAccount')">Cuenta Sueldo <img class="cards" width="25" src="@/images/credit-cards.png"></button>
                      <button id="btnSuperRate" class="tablinks inactive" v-on:click="openTab('superRate')">Cuenta Fantasy <img class="cards" width="25" src="@/images/credit-cards.png"></button>
                  </div>
                  <!-- Tab content -->
                  <div id="simpleAccount" class="tabcontent">
                      <div class="row">
                        <div class="col-sm-6" id="firstBlock">
                              <div class="pl-4">
                                  <h3>Cuenta Simple</h3>
                                  <p align="justify">Es una cuenta en la que puedes guardar tu dinero de manera segura y a la vez ganar intereses por el tiempo en que este se mantenga en el banco.
                                  </p>
                                  <p align="justify">Operaciones ilimitadas sin costo entre cuentas Tunke en todos nuestros canales y cajeros de otros bancos.</p>
                                  <img src="@/images/piggy.png" width="25%" id="pig">
                                  <img src="@/images/planta.png" width="25%" class="ml-4">
                                  <img src="@/images/protection.png" width="25%" class="ml-4">
                              </div>
                          </div>
                          <div class="col-sm-6" id="secondBlock">
                              <div class="pl-3">
                                  <h3>Beneficios</h3>
                                  <ul id="benefits">
                                      <li>
                                          <h5>Ahorro</h5>
                                          <h6 align="justify">Disfrutar de un futuro financiero saludable</h6>
                                      </li>
                                      <li class="mt-3">
                                          <h5>Crecimiento</h5>
                                          <h6 align="justify">Alcanza tus planes y metas al realizar inversiones inteligentes</h6>
                                      </li>
                                      <li class="mt-3">
                                          <h5>Seguridad</h5>
                                          <h6 align="justify">Estar protegido frenta a alguna emergencia.</h6>
                                      </li>
                                  </ul>
                                  <div class="d-flex justify-content-center mt-3">

                                      <label for="opt1" class="radio" v-if="currencyCampaignSelected.idCurrency==1" >
                                          <input type="radio" name="rdo" id="opt1" class="hidden" checked="true"/>
                                          <span class="label"></span>Soles
                                      </label>
                                      
                                      <label for="opt2" class="radio"  v-if="currencyCampaignSelected.idCurrency==2">
                                          <input type="radio" name="rdo" id="opt2" class="hidden" checked="true"/>
                                          <span class="label"></span>Dólares
                                      </label>
                              
                                  </div>
                                  <div class="ml-5">
                                      <input  class="form-check-input" :disabled="!termsRead" type="checkbox" id="autoSizingCheck" @click="changeStateTerms">
                                      <label class="form-check-label" for="autoSizingCheck">
                                      <h6>He leído y acepto los 
                                      <a href="#" @click="goTermsAndConds"> términos y condiciones
                                      </a>
                                      </h6> 
                                      </label>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div id="millionaireAccount" class="tabcontent">
                      <div class="row">
                    <div class="col-sm-6" id="firstBlock">
                            <div class="pl-4" id="simpleAccount">
                                <h3>Cuenta Sueldo</h3>
                                <p align="justify">Es una cuenta en la que puedes guardar tu dinero de manera segura y a la vez ganar intereses por el tiempo en que este se mantenga en el banco.
                                </p>
                                <p align="justify">Operaciones ilimitadas sin costo entre cuentas Tunke en todos nuestros canales y cajeros de otros bancos.</p>
                                <img src="@/images/piggy.png" width="25%" id="pig">
                                <img src="@/images/planta.png" width="25%" class="ml-4">
                                <img src="@/images/protection.png" width="25%" class="ml-4">
                            </div>
                        </div>
                        <div class="col-sm-6" id="secondBlock">
                            <div class="pl-3">
                                <h3>Beneficios</h3>
                                <ul id="benefits">
                                    <li>
                                        <h5>Ahorro</h5>
                                        <h6 align="justify">Disfrutar de un futuro financiero saludable</h6>
                                    </li>
                                    <li class="mt-3">
                                        <h5>Crecimiento</h5>
                                        <h6 align="justify">Alcanza tus planes y metas al realizar inversiones inteligentes</h6>
                                    </li>
                                    <li class="mt-3">
                                        <h5>Seguridad</h5>
                                        <h6 align="justify">Estar protegido frenta a alguna emergencia.</h6>
                                    </li>
                                </ul>
                                <div class="d-flex justify-content-center mt-3">

                                    <label for="opt3" class="radio" v-if="currencyCampaignSelected.idCurrency==1">
                                        <input type="radio" name="rdo2" id="opt3" class="hidden" checked="true"/>
                                        <span class="label"></span>Soles
                                    </label>
                                    
                                    <label for="opt4" class="radio" v-if="currencyCampaignSelected.idCurrency==2">
                                        <input type="radio" name="rdo2" id="opt4" class="hidden" checked="true"/>
                                        <span class="label"></span>Dólares
                                    </label>
                            
                                </div>
                                <div class="ml-5">
                                    <input  class="form-check-input" :disabled="!termsRead" type="checkbox" id="autoSizingCheck" @click="changeStateTerms">
                                    <label class="form-check-label" for="autoSizingCheck">
                                    <h6>He leído y acepto los 
                                    <a href="#" @click="goTermsAndConds()"> términos y condiciones
                                    </a>
                                    </h6> 
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div id="superRate" class="tabcontent">
                      <div class="row">
                        <div class="col-sm-6" id="firstBlock">
                                <div class="pl-4" id="simpleAccount">
                                    <h3>Cuenta Fantasy</h3>
                                    <p align="justify">Es una cuenta en la que puedes guardar tu dinero de manera segura y a la vez ganar intereses por el tiempo en que este se mantenga en el banco.
                                    </p>
                                    <p align="justify">Operaciones ilimitadas sin costo entre cuentas Tunke en todos nuestros canales y cajeros de otros bancos.</p>
                                    <img src="@/images/piggy.png" width="25%" id="pig">
                                    <img src="@/images/planta.png" width="25%" class="ml-4">
                                    <img src="@/images/protection.png" width="25%" class="ml-4">
                                </div>
                            </div>
                            <div class="col-sm-6" id="secondBlock">
                                <div class="pl-3">
                                    <h3>Beneficios</h3>
                                    <ul id="benefits">
                                        <li>
                                            <h5>Ahorro</h5>
                                            <h6 align="justify">Disfrutar de un futuro financiero saludable</h6>
                                        </li>
                                        <li class="mt-3">
                                            <h5>Crecimiento</h5>
                                            <h6 align="justify">Alcanza tus planes y metas al realizar inversiones inteligentes</h6>
                                        </li>
                                        <li class="mt-3">
                                            <h5>Seguridad</h5>
                                            <h6 align="justify">Estar protegido frenta a alguna emergencia.</h6>
                                        </li>
                                    </ul>
                                    <div class="d-flex justify-content-center mt-3">

                                        <label for="opt5" class="radio" v-if="currencyCampaignSelected.idCurrency==1">
                                            <input type="radio" name="rdo3" id="opt5" class="hidden" checked="true"/>
                                            <span class="label"></span>Soles
                                        </label>
                                        
                                        <label for="opt6" class="radio" v-if="currencyCampaignSelected.idCurrency==2">
                                            <input type="radio" name="rdo3" id="opt6" class="hidden" checked="true"/>
                                            <span class="label"></span>Dólares
                                        </label>
                                
                                    </div>
                                    <div class="ml-5">
                                        <input  class="form-check-input" :disabled="!termsRead" type="checkbox" id="autoSizingCheck" @click="changeStateTerms">
                                        <label class="form-check-label" for="autoSizingCheck">
                                        <h6>He leído y acepto los 
                                        <a href="#" @click="goTermsAndConds()"> términos y condiciones
                                        </a>
                                        </h6> 
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>
                <div align="center"><button id="btnOpenAccount" class="btn text-white" @click="openAccount" >Abrir cuenta</button></div>
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
import * as loanDA from '@/dataAccess/loanDA.js'

export default {
    data(){
        return {   
          termsRead:false,
          acceptTerms : false,
          type: 1         
        };
    },
    computed:{
        ...mapState(['person','currency','termsReadLoan','processId','showModalAccount','setShowModalAccount','parameterSetting','currencyCampaignSelected','accountsAvailables','hasAccounts']) 
    },
    methods:{
        ...mapActions(['changeCurrency','setTermsReadLoans','fillAccountsAvailables','fillHasAccounts']), 
        changeStateTerms(){
            this.acceptTerms = !this.acceptTerms;
        },
        changeCurr(cur){
            this.changeCurrency(cur);
        },
        openAccount (){
            if (this.acceptTerms){
                if(this.person.totalAccounts+1<=this.parameterSetting.maxAccountsNumber){ 
                                                                                                            //1 hardcodeado: debe depender del tipo de cuenta
                        accountDA.doCreateAccount(this.person.idPerson,this.currencyCampaignSelected.idCurrency,this.type,'','','','').then((res) =>{
                            let response_create = res.data; 
                                loanDA.doRequestAccountsByClient(this.person.idClient).then((res) =>{
                                    console.log(res.data);
                                    let response_create = res.data;
                                    let optionsAccount=[];                
                                    for (let i=0; i<response_create.accounts.length;i++){
                                        console.log("id currency",this.currencyCampaignSelected.idCurrency);
                                        if(this.currencyCampaignSelected.idCurrency==response_create.accounts[i].idCurrency){
                                            optionsAccount.push(response_create.accounts[i]);
                                            this.fillHasAccounts(true);
                                        }
                                        else 
                                            continue;
                                    }
                                    this.fillAccountsAvailables(optionsAccount);
                                    console.log("cuotas disponibles:",this.accountsAvailables);
                                }).catch(error=>
                                {
                                    Swal.fire({
                                    title: 'Error',
                                    type: 'error',
                                    text: 'Error en la captura de cuentas por cliente'
                                    })
                                })

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
                            title: 'Se superó el límite de cuentas abiertas',
                            type: 'error',
                            text: 'Estimado cliente, usted ya cuenta con muchas cuentas abiertas en Tunke.'
                            });
                }
            }else{
              Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Por favor, lea y acepte los términos y condiciones'
                    })
            }
            
            
        },
        openTab: function(accountType){
        var i, tabcontent, tablinks, btn, buttons;
        if(accountType === 'simpleAccount'){
            btn = 'btnSimple';
            this.type = 1;
            console.log(this.type);
        }
        else if(accountType === 'millionaireAccount'){
            btn = 'btnMillionaire'
            this.type = 2;
            console.log(this.type);
        }
        else if(accountType === 'superRate'){
            btn = 'btnSuperRate';
            this.type = 3;
            console.log(this.type);
        }
        
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

       
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }

        document.getElementById(accountType).style.display = "block";
        document.getElementById(btn).classList.add('active');
        },
        goTermsAndConds(){
            this.termsRead=true;
            Swal.fire({
                        title: 'Términos y condiciones',
                        customClass: {
                          container: 'my-swal'
                        },
                        text: 'TUNKE es una empresa privada que brinda servicios financieros en el Perú. En ese sentido, nos comprometemos a mantener la privacidad y la protección de información de nuestros clientes, proveedores y colaboradores de conformidad con lo establecido en la Ley No. 29733, Ley de Protección de datos personales y su reglamento, adoptando para ello las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados por los titulares de datos personales, asimismo garantizando la mejora continua de dichas medidas. En tal contexto, declaramos los siguientes lineamientos que debemos informar previamente a nuestros clientes, proveedores y colaboradores, de forma clara e inequívoca, cuando se recaben sus datos personales a través de cualquiera de nuestros canales:  \n La existencia del tratamiento de datos de carácter personal, la finalidad de la recolección y destinatarios de la información.'
                                +'\n Carácter obligatorio o facultativo de la respuesta a las preguntas que en su caso les sean planteadas, así como de las consecuencias de la obtención de los datos personales o la negativa a suministrar los mismos.'                      })
        },
        mounted() {
            document.getElementById('simpleAccount').style.display = "block";   
            document.getElementById('btnSimple').classList.add('active');
        }
    },
}
</script>