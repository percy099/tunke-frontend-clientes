<template>
    <div id=step1>
        <div class="text-center" >
            <h1>Preguntas Adicionales</h1> 
        </div>
        <p class="mt-3" align="justify">Por favor, responda estas preguntas en caso considere adecuado su respuesta.</p>
        <div class="mt-3 row justify-content-between">
            <div class="col-sm-6" id="boxQuestion1">
                <h6 style="text-align:justify">1) ¿Cuánto crees que vas a depositar al mes?</h6>
                <hr>                
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios1" id="radio1_1" value="0000" v-model="q1">
                    <label class="form-check-label" for="radio1_1">0000</label>
                </div>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios1" id="radio1_2" value="2000" v-model="q1">
                    <label class="form-check-label" for="radio1_2">2000</label>
                </div>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios1" id="radio1_3" value="4000" v-model="q1">
                    <label class="form-check-label" for="radio1_3">4000</label>
                </div>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios1" id="radio1_4" value="6000" v-model="q1">
                    <label class="form-check-label" for="radio1_4">6000</label>
                </div>                                
            </div>
            <div class="col-sm-6" id="boxQuestion2">
                <h6 style="text-align:justify">2) ¿Cuántas transacciones realizarás al mes?</h6>
                <hr>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios2" id="radio2_1" value="0000" v-model="q2">
                    <label class="form-check-label" for="radio2_1">0000</label>
                </div>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios2" id="radio2_2" value="2000" v-model="q2">
                    <label class="form-check-label" for="radio2_2">2000</label>
                </div>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios2" id="radio2_1" value="4000" v-model="q2">
                    <label class="form-check-label" for="radio2_3">4000</label>
                </div>
                <div class="text-center">
                    <input class="form-check-input" type="radio" name="radios2" id="radio2_4" value="6000" v-model="q2">
                    <label class="form-check-label" for="radio2_4">6000</label>
                </div>   
            </div>
        </div>
        <br>
        <h6>3) ¿De dónde vendrán estos depositos?</h6>
        <hr>
        <textarea class="form-control" rows="2" v-model="q3"></textarea>
        <label style="font-size: 10px;">100 caracteres</label>
        <br>
        <h6>4) ¿Cómo usarás la cuenta?</h6>
        <hr>
        <textarea class="form-control" rows="2" v-model="q4"></textarea>
        <label style="font-size: 10px;">100 caracteres</label>   
    </div>
</template>

<style src="@/styles/Step1NoClient.css" scoped></style>

<script>

import {mapState,mapActions} from 'vuex'

export default {
    name : 'Step3Client',
    data(){
        return{
            q1: '',
            q2: '',
            q3: '',
            q4: '',
        }
    },
    computed:{
        ...mapState([''])
    },
    methods:{
        ...mapActions(['fillResponses']),
    },
    mounted() {
    },
    updated() {
        let ans = [];
        ans.push(this.q1);
        ans.push(this.q2);
        ans.push(this.q3);
        ans.push(this.q4);
        this.fillResponses(ans);
    }    
}
</script>