<template>
    <div id="step3">
        <div class="tab">
            <button id="btnSimple" class="tablinks inactive" v-on:click="openAccount('simpleAccount')">Cuenta Simple  <img width="25" src="@/images/credit-cards.png"></button>
            <button id="btnMillionaire" class="tablinks inactive" v-on:click="openAccount('millionaireAccount')">Cuenta Millonaria <img width="25" src="@/images/credit-cards.png"></button>
            <button id="btnSuperRate" class="tablinks inactive" v-on:click="openAccount('superRate')">Cuenta Supertasa <img width="25" src="@/images/credit-cards.png"></button>
        </div>
        <!-- Tab content -->
        <div id="simpleAccount" class="tabcontent">
            <div class="row">
                <div class="col-6">
                    <div class="pl-4">
                        <h3>Cuenta Simple</h3>
                        <p>Lorem ipsum is simply dummy text
                            of the printing and typesetting <br>
                            industry.
                        </p>
                        <p>Lorem ipsum has been the <br>
                            industry's standard dummy text <br>
                            ever since the 1500's, when an, <br>
                            unknown printer took a galley of <br>
                            type and scrambled it to make a <br>
                            type specimen book.</p>
                        <img src="@/images/piggy.png" width="25%">
                        <img src="@/images/planta.png" width="25%" class="ml-4">
                        <img src="@/images/protection.png" width="25%" class="ml-4">
                    </div>
                </div>
                <div class="col-6">
                    <div class="pl-3">
                        <h3>Beneficios</h3>
                        <ul>
                            <li>
                                <h5>Ahorro</h5>
                                <h6>Lorem ipsum dolor sit amet,<br>
                                consectet ur adipiscing elit.</h6>
                            </li>
                            <li class="mt-3">
                                <h5>Crecimiento</h5>
                                <h6>Lorem ipsum dolor sit amet,<br>
                                consectet ur adipiscing elit.</h6>
                            </li>
                            <li class="mt-3">
                                <h5>Seguridad</h5>
                                <h6>Lorem ipsum dolor sit amet,<br>
                                consectet ur adipiscing elit.</h6>
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center mt-5">

                            <label for="opt1" class="radio">
                                <input type="radio" name="rdo" id="opt1" class="hidden" checked="true"/>
                                <span class="label"></span>Soles
                            </label>
                            
                            <label for="opt2" class="radio">
                                <input type="radio" name="rdo" id="opt2" class="hidden"/>
                                <span class="label"></span>Dólares
                            </label>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="millionaireAccount" class="tabcontent">
            <h3>Cuenta Millonaria</h3>
        </div>

        <div id="superRate" class="tabcontent">
            <h3>Cuenta Supertasa</h3>
        </div>
    </div>
</template>

<style scoped src="@/styles/Step3NoClient.css">

</style>

<script>
export default {
    methods:{
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
        }
    },
    mounted() {
        document.getElementById('simpleAccount').style.display = "block";   
        document.getElementById('btnSimple').classList.add('active');
    }
    
}
</script>