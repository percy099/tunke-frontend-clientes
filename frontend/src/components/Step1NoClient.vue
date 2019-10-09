<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola {{person.firstName}} {{person.fatherLastname}}!</h1> 
            <h2>{{person.documentNumber}}</h2>
        </div>
        <div class="text-center"> 
            <router-link :to="{path : '/openingDNI'}" href="#">¿Este no es tu DNI?</router-link>
        </div>
        <p class="mt-3" align="justify">Para tu seguridad, por favor responde estas preguntas para ayudarnos a evitar fraudes.</p>
        <div class="mt-3 row justify-content-between">
            <div class="col-sm-6" id="boxQuestion1">
                <h6 id="question1" style="text-align:justify">1) ¿{{securityQuestions.questions[0].question}}</h6>
                <hr>
                <div id="checkQuestions1" class="d-flex justify-content-center align-items-center flex-column pr-1 mr-md-5 mt-3 mb-4">
                    <span class="mr-sm-6">
                        <input type="radio" id="q1a1" name="option1" value="option1"> {{securityQuestions.questions[0].answers[0]}}
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" id="q1a2" name="option1" value="option2"> {{securityQuestions.questions[0].answers[1]}}
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" id="q1a3" name="option1" value="option3"> {{securityQuestions.questions[0].answers[2]}}
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" id="q1a4" name="option1" value="option4"> {{securityQuestions.questions[0].answers[3]}}
                    </span>
                </div>
            </div>
            <div class="col-sm-6" id="boxQuestion2">
                <h6 id="question2" style="text-align:justify">2) ¿{{securityQuestions.questions[1].question}}</h6>
                <hr>
                <div id="checkQuestions2" class="d-flex justify-content-center align-items-center flex-column pl-2 ml-md-5 mt-3">
                    <span class="mr-sm-6">
                        <input class="mr-2" id="q2a1" type="radio" name="option2" value="option1"> {{securityQuestions.questions[1].answers[0]}}
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-2" id="q2a2" type="radio" name="option2" value="option2"> {{securityQuestions.questions[1].answers[1]}}
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-2" id="q2a3" type="radio" name="option2" value="option3"> {{securityQuestions.questions[1].answers[2]}}
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-2" id="q2a3" type="radio" name="option2" value="option4"> {{securityQuestions.questions[1].answers[3]}}
                    </span>
                </div>
            </div>
        </div>
        <br>
        <h6 id="question3">3) ¿{{securityQuestions.questions[2].question}}</h6>
        <hr>
        <div class="d-flex justify-content-center align-items-center flex-column">
            <span class="mr-sm-6">
                <input class="mr-2" id="q3a1" type="radio" name="option3" value="option1">{{securityQuestions.questions[2].answers[0]}}
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" id="q3a2" type="radio" name="option3" value="option2">{{securityQuestions.questions[2].answers[1]}} 
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" id="q3a3" type="radio" name="option3" value="option3">{{securityQuestions.questions[2].answers[2]}}
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" id="q3a4" type="radio" name="option3" value="option4">{{securityQuestions.questions[2].answers[3]}}
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
        ...mapState(['person','securityQuestions'])
    },
    methods:{

    },
    mounted() {
        console.log(this.securityQuestions);
    },
}
</script>