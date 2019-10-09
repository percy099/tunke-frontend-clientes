<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola {{person.firstName}} {{person.fatherLastname}}!</h1> 
            <h2>{{person.documentNumber}}</h2>
        </div>
        <div class="text-center"> 
            <router-link :to="{path : '/'}" href="#">¿Este no es tu DNI?</router-link>
        </div>
        <p class="mt-3" align="justify">Para tu seguridad, por favor responde estas preguntas para ayudarnos a evitar fraudes.</p>
        <div class="mt-3 row justify-content-between">
            <div class="col-sm-6" id="boxQuestion1">
                <h6 id="question1" style="text-align:justify">1) ¿Qué número de placa tiene tu auto?</h6>
                <hr>
                <div id="checkQuestions1" class="d-flex justify-content-center align-items-center flex-column pr-1 mr-md-5 mt-3 mb-4">
                    <span class="mr-sm-6">
                        <input type="radio" name="option1" value="option1"> SEP-345
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" name="option1" value="option2"> KEC-345
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" name="option1" value="option3"> LAH-345
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" name="option1" value="option4"> RRT-345
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" name="option1" value="option5"> N.A.
                    </span>
                </div>
            </div>
            <div class="col-sm-6" id="boxQuestion2">
                <h6 id="question2" style="text-align:justify">2) ¿Tu RUC está activo?</h6>
                <hr>
                <div id="checkQuestions2" class="d-flex justify-content-center align-items-center flex-column pl-2 ml-md-5 mt-3">
                    <span class="mr-sm-6">
                        <input class="mr-2" type="radio" name="option2" value="option1"> Sí
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-2" type="radio" name="option2" value="option2"> No
                    </span>
                </div>
            </div>
        </div>
        <br>
        <h6 id="question3">3) ¿Cuál es el segundo apellido de tu papá?</h6>
        <hr>
        <div class="d-flex justify-content-center align-items-center flex-column">
            <span class="mr-sm-6">
                <input class="mr-2" type="radio" name="option3" value="option1">Callali
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" type="radio" name="option3" value="option2">Meza 
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" type="radio" name="option3" value="option3">Concha
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" type="radio" name="option3" value="option4">Guerrero
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" type="radio" name="option3" value="option5">N.A.
            </span>
        </div>
    </div>
</template>

<style src="@/styles/Step1NoClient.css" scoped>

</style>

<script>

import {mapState} from 'vuex'

export default {
    name : 'Step1NoClient',
    computed:{
        ...mapState(['person'])
    },
    methods:{

    }
}
</script>