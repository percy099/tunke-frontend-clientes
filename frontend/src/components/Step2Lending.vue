<template>
    <div id="step3">
        <!-- Tab content -->
        <div id="simpleAccount" class="tabcontent">
            <div class="row">
               <div class="col-sm-6" id="firstBlock">
                    <div class="pl-1" id="simpleAccount">
                        <img src="@/images/piggy.png" width="25%" id="first">
                        <h3>Préstamo con garantía hipotecaria</h3>
                        <p align="justify">Es una cuenta en la que puedes guardar tu dinero de manera segura y a la vez ganar intereses por el tiempo en que este se mantenga en el banco.
                        </p>
                        <p align="justify">Operaciones ilimitadas sin costo entre cuentas Tunke en todos nuestros canales y cajeros de otros bancos.</p>
                    </div>
                </div>
                <div class="col-sm-6" id="secondBlock">
                    <div class="pl-3">
                        <img src="@/images/planta.png" width="25%" id="second">
                        <h3>Crédito vehicular</h3>
                        <p align="justify">Es una cuenta en la que puedes guardar tu dinero de manera segura y a la vez ganar intereses por el tiempo en que este se mantenga en el banco.
                        </p>
                        <p align="justify">Operaciones ilimitadas sin costo entre cuentas Tunke en todos nuestros canales y cajeros de otros bancos.</p>
                    </div>
                </div>
                <div class="col-sm-6" id="thirdBlock">
                    <div class="pl-3">
                        <img src="@/images/protection.png" width="25%" id="third">
                        <h3>Préstamos para estudios</h3>
                        <p align="justify">Es una cuenta en la que puedes guardar tu dinero de manera segura y a la vez ganar intereses por el tiempo en que este se mantenga en el banco.
                        </p>
                        <p align="justify">Operaciones ilimitadas sin costo entre cuentas Tunke en todos nuestros canales y cajeros de otros bancos.</p>
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

export default {
    data(){
        return {
          termsRead:false
        };
    },
    computed:{
        ...mapState(['currency'])
    },
    methods:{
        ...mapActions(['changeCurrency']),
        openAccount: function(accountType){
        
        var i, tabcontent, tablinks, btn, buttons;
        if(accountType === 'simpleAccount'){
            btn = 'btnSimple';
        }
        else if(accountType === 'millionaireAccount'){
            btn = 'btnMillionaire'
        }
        else if(accountType === 'superRate'){
            btn = 'btnSuperRate';
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
        changeCurr(cur){
            this.changeCurrency(cur);
        },
        goTermsAndConds(){
            this.termsRead=true;
            Swal.fire({
                      title: 'Términos y condiciones',
                      
                      text: 'TUNKE es una empresa privada que brinda servicios financieros en el Perú. En ese sentido, nos comprometemos a mantener la privacidad y la protección de información de nuestros clientes, proveedores y colaboradores de conformidad con lo establecido en la Ley No. 29733, Ley de Protección de datos personales y su reglamento, adoptando para ello las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados por los titulares de datos personales, asimismo garantizando la mejora continua de dichas medidas. En tal contexto, declaramos los siguientes lineamientos que debemos informar previamente a nuestros clientes, proveedores y colaboradores, de forma clara e inequívoca, cuando se recaben sus datos personales a través de cualquiera de nuestros canales:  \n La existencia del tratamiento de datos de carácter personal, la finalidad de la recolección y destinatarios de la información.'
+'\n Carácter obligatorio o facultativo de la respuesta a las preguntas que en su caso les sean planteadas, así como de las consecuencias de la obtención de los datos personales o la negativa a suministrar los mismos.'                      })
        }
    },
    mounted() {
        document.getElementById('simpleAccount').style.display = "block";   
        document.getElementById('btnSimple').classList.add('active');
    }
    
}
</script>