<template>
    <div id="step3">
        <div class="tab">
            <button id="btnSimple" class="tablinks inactive" v-on:click="openAccount('simpleAccount')">Cuenta Simple  <img class="cards" width="25" src="@/images/credit-cards.png"></button>
            <button id="btnMillionaire" class="tablinks inactive" v-on:click="openAccount('millionaireAccount')">Cuenta Sueldo <img class="cards" width="25" src="@/images/credit-cards.png"></button>
            <button id="btnSuperRate" class="tablinks inactive" v-on:click="openAccount('superRate')">Cuenta Fantasy <img class="cards" width="25" src="@/images/credit-cards.png"></button>
        </div>
        <!-- Tab content -->
        <div id="simpleAccount" class="tabcontent">
            <div class="row">
               <div class="col-sm-6" id="firstBlock">
                    <div class="pl-4" id="simpleAccount">
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

                            <label for="opt1" class="radio">
                                <input @click="setCur1(1)" type="radio" name="rdo1" id="opt1" class="hidden" checked="true"/>
                                <span class="label"></span>Soles
                            </label>
                            
                            <label for="opt2" class="radio">
                                <input @click="setCur1(2)" type="radio" name="rdo1" id="opt2" class="hidden"/>
                                <span class="label"></span>Dólares
                            </label>
                    
                        </div>
                        <div class="ml-5">
                            <input  class="form-check-input" :disabled="!termsRead" type="checkbox" id="autoSizingCheck" @click="changeTerms">
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

                            <label for="opt3" class="radio">
                                <input @click="setCur2(1)" type="radio" name="rdo2" id="opt3" class="hidden" checked="true"/>
                                <span class="label"></span>Soles
                            </label>
                            
                            <label for="opt4" class="radio">
                                <input @click="setCur2(2)" type="radio" name="rdo2" id="opt4" class="hidden"/>
                                <span class="label"></span>Dólares
                            </label>
                    
                        </div>
                        <div class="ml-5">
                            <input  class="form-check-input" :disabled="!termsRead" type="checkbox" id="autoSizingCheck" @click="changeTerms">
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

                            <label for="opt5" class="radio">
                                <input @click="setCur3(1)" type="radio" name="rdo3" id="opt5" class="hidden" checked="true"/>
                                <span class="label"></span>Soles
                            </label>
                            
                            <label for="opt6" class="radio">
                                <input @click="setCur3(2)" type="radio" name="rdo3" id="opt6" class="hidden"/>
                                <span class="label"></span>Dólares
                            </label>
                    
                        </div>
                        <div class="ml-5">
                            <input  class="form-check-input" :disabled="!termsRead" type="checkbox" id="autoSizingCheck" @click="changeTerms">
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
</template>

<style scoped src="@/styles/Step3NoClient.css">

</style>

<script>

import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'
import M from 'minimatch';

export default {
    data(){
        return {
          termsRead:false,
          tipoCuenta: 1,
        };
    },
    computed:{
        ...mapState(['currency1','accountType','currency2','currency3'])
    },
    methods:{
        ...mapActions(['changeCurrency1','setAccountType','changeCurrency2','changeCurrency3','changeClientTerms']),
        setCur1(value){
            this.changeCurrency1(value);
            console.log(this.currency1);
        },
        setCur2(value){
            this.changeCurrency2(value);
            console.log(this.currency2);
        },
        setCur3(value){
            this.changeCurrency3(value);
            console.log(this.currency3);
        },
        openAccount: function(accountType){
        
        var i, tabcontent, tablinks, btn, buttons;
        if(accountType === 'simpleAccount'){
            btn = 'btnSimple';
            this.setAccountType(1);
            console.log(this.accountType);
        }
        else if(accountType === 'millionaireAccount'){
            btn = 'btnMillionaire';
            this.setAccountType(2);
            console.log(this.accountType);
        }
        else if(accountType === 'superRate'){
            btn = 'btnSuperRate';
            this.setAccountType(3);
            console.log(this.accountType);
        }
        
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

       
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(accountType).style.display = "block";
        document.getElementById(btn).classList.add('active');
        },
        changeCurr(cur){
            this.changeCurrency(cur);
        },
        goTermsAndConds(){
            this.termsRead=true;
            Swal.fire({
                      title: 'Términos y condiciones',
                      
                      text: 'TUNKE es una empresa privada que brinda servicios financieros en el Perú. En ese sentido, nos comprometemos a mantener la privacidad y la protección de información de nuestros clientes, proveedores y colaboradores de conformidad con lo establecido en la Ley No. 29733, Ley de Protección de datos personales y su reglamento, adoptando para ello las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados por los titulares de datos personales, asimismo garantizando la mejora continua de dichas medidas. En tal contexto, declaramos los siguientes lineamientos que debemos informar previamente a nuestros clientes, proveedores y colaboradores, de forma clara e inequívoca, cuando se recaben sus datos personales a través de cualquiera de nuestros canales:  \n La existencia del tratamiento de datos de carácter personal, la finalidad de la recolección y destinatarios de la información.'
+'\n Carácter obligatorio o facultativo de la respuesta a las preguntas que en su caso les sean planteadas, así como de las consecuencias de la obtención de los datos personales o la negativa a suministrar los mismos.'                      })
        },
        changeTerms(){
            this.changeClientTerms(true);
        }
    },
    mounted() {
        document.getElementById('simpleAccount').style.display = "block";   
        document.getElementById('btnSimple').classList.add('active');
    }
    
}
</script>