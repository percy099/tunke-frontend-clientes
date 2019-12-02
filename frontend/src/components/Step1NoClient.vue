<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola {{person.firstName}} {{person.fatherLastname}}!</h1> 
            <h2>{{person.documentNumber}}</h2>
        </div>
        <div class="text-center"> 
            <router-link :to="{path : '/openingDNI'}" href="#">¿Este no es tu {{activeTypeDoc.text}}?</router-link>
        </div>
        <p class="mt-3" align="justify">Para tu seguridad, por favor responde estas preguntas para ayudarnos a evitar fraudes.</p>
        <div class="mt-3 row justify-content-between">
            <div class="col-sm-6" id="boxQuestion1">
                <h6 id="question1" style="text-align:justify">1) ¿{{securityQuestions.questions[0].question}}</h6>
                <hr>
                <div id="checkQuestions1" class="d-flex justify-content-center align-items-center flex-column pr-1 mr-md-5 mt-3 mb-4">
                    <span class="mr-sm-6">
                        <input type="radio" @click="posCheckBoxQuestions(1,0)" name="option1" value="option1"> {{securityQuestions.questions[0].answers[0]}}
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" @click="posCheckBoxQuestions(1,1)" name="option1" value="option2"> {{securityQuestions.questions[0].answers[1]}}
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" @click="posCheckBoxQuestions(1,2)" name="option1" value="option3"> {{securityQuestions.questions[0].answers[2]}}
                    </span>
                    <span class="mr-sm-6">
                        <input type="radio" @click="posCheckBoxQuestions(1,3)" name="option1" value="option4"> {{securityQuestions.questions[0].answers[3]}}
                    </span>
                </div>
            </div>
            <div class="col-sm-6" id="boxQuestion2">
                <h6 id="question2" style="text-align:justify">2) ¿{{securityQuestions.questions[1].question}}</h6>
                <hr>
                <div id="checkQuestions2" class="d-flex justify-content-center align-items-center flex-column pl-2 ml-md-5 mt-3">
                    <span class="mr-sm-6">
                        <input class="mr-1" @click="posCheckBoxQuestions(2,0)" type="radio" name="option2" value="option1"> {{securityQuestions.questions[1].answers[0]}}
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-1" @click="posCheckBoxQuestions(2,1)" type="radio" name="option2" value="option2"> {{securityQuestions.questions[1].answers[1]}}
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-1" @click="posCheckBoxQuestions(2,2)" type="radio" name="option2" value="option3"> {{securityQuestions.questions[1].answers[2]}}
                    </span>
                    <span class="mr-sm-6">
                        <input class="mr-1" @click="posCheckBoxQuestions(2,3)" type="radio" name="option2" value="option4"> {{securityQuestions.questions[1].answers[3]}}
                    </span>
                </div>
            </div>
        </div>
        <br>
        <h6 id="question3">3) ¿{{securityQuestions.questions[2].question}}</h6>
        <hr>
        <div class="d-flex justify-content-center align-items-center flex-column">
            <span class="mr-sm-6">
                <input class="mr-2" @click="posCheckBoxQuestions(3,0)" type="radio" name="option3" value="option1">{{securityQuestions.questions[2].answers[0]}}
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" @click="posCheckBoxQuestions(3,1)" type="radio" name="option3" value="option2">{{securityQuestions.questions[2].answers[1]}} 
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" @click="posCheckBoxQuestions(3,2)" type="radio" name="option3" value="option3">{{securityQuestions.questions[2].answers[2]}}
            </span>
            <span class="mr-sm-6">
                <input class="mr-2" @click="posCheckBoxQuestions(3,3)" type="radio" name="option3" value="option4">{{securityQuestions.questions[2].answers[3]}}
            </span>
        </div>
    </div>
</template>

<style src="@/styles/Step1NoClient.css" scoped>

</style>

<script>

import {mapState,mapActions} from 'vuex'

export default {
    name : 'Step1NoClient',
    computed:{
        ...mapState(['person','securityQuestions','answersSecurityQuestions','activeTypeDoc'])
    },
    methods:{
        ...mapActions(['completePosAnswerQuestion','setActiveTypeDocs']),
        posCheckBoxQuestions(question,position){
            let body={
                "ques" : question,
                "posAns" : position
            } 
            this.completePosAnswerQuestion(body);
        }
    },
    mounted() {
        console.log(this.securityQuestions);
    },
}
</script>