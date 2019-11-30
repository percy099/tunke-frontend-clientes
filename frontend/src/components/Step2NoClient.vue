<template>
        <div class="card mt-5 mb-5" id="body" style="width: 80%; margin: auto; background-color: #FAFAFA; padding: 20px">
            <h2 style="margin-left: 16px; ">Ingresa tus datos</h2>
            <h6 style="margin-left: 16px">Nos interesa conocerte para poder brindarte nuestros servicios a tu medida.</h6>
            <div class="card-body">
                <form>
                    <div class="form-group xs-12">
                        <div class="row">
                            <div class="col-9">
                                <label>Teléfono Principal</label>
                            </div>
                            <div class="col-3">
                                <label class="span_ob">*Campo Obligatorio </label>
                            </div>  
                        </div>
                        <input type="text" class="form-control"
                        v-model.trim="$v.phone1.$model" :class="{
                        'is-invalid' : $v.phone1.$error, 'is-valid':!$v.phone1.$invalid }">
                        <div class="valid-feedback">Teléfono Válido</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.phone1.required">Télefono Principal Requerido. </span>
                            <span v-if="!$v.phone1.minLength">Debe ser de {{
                            $v.phone1.$params.minLength.min}} dígitos. </span>
                            <span v-if="!$v.phone1.maxLength">Debe ser de {{
                            $v.phone1.$params.maxLength.max}} dígitos. </span>
                            <span v-if="!$v.phone1.numeric">Debe contener solo números. </span>
                        </div>
                    </div>
                    <div class="form-group xs-12">
                        <label>Teléfono Secundario</label>
                        <input type="text" class="form-control"
                        v-model.trim="$v.phone2.$model" :class="{
                        'is-invalid' : $v.phone2.$error, 'is-valid':!$v.phone2.$invalid && phone2 != ''}">
                        <div class="valid-feedback">Teléfono Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.phone2.minLength">Debe ser de al menos {{
                            $v.phone2.$params.minLength.min}} dígitos. </span>
                            <span v-if="!$v.phone2.maxLength">Debe ser a lo mucho de {{
                            $v.phone2.$params.maxLength.max}} letters. </span>
                            <span v-if="!$v.phone2.numeric">Debe contener solo números. </span>
                        </div>
                    </div>
                    <div class="form-group xs-12">
                        <div class="row">
                            <div class="col-9">
                                <label>Correo Principal</label>
                            </div>
                            <div class="col-3">
                                <label class="span_ob">*Campo Obligatorio </label>
                            </div>  
                        </div>
                        <input type="text" class="form-control"
                        v-model.trim="$v.email1.$model" :class="{
                        'is-invalid' : $v.email1.$error, 'is-valid':!$v.email1.$invalid }">
                        <div class="valid-feedback">Email Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.email1.required">Email Principal Requerido. </span>
                            <span v-if="!$v.email1.email">Formato inadecuado</span>
                        </div>
                    </div>
                    <div class="form-group xs-12">
                        <label>Correo Secundario</label>
                        <input type="text" class="form-control"
                        v-model.trim="$v.email2.$model" :class="{
                        'is-invalid' : $v.email2.$error, 'is-valid':!$v.email2.$invalid && email2 != ''}">
                        <div v-if="email2 != ''" class="valid-feedback">Email Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.email2.email">Formato inadecuado</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>

<style src="@/styles/Step2NoClient.css" scoped>

</style>

<script>

import {mapState, mapActions} from 'vuex'

import { required, minLength, maxLength, email, numeric } from 'vuelidate/lib/validators'

export default {
    name : 'Step2NoClient',
    data () {
        return {
            phone1: '',
            phone2: '',
            email1: '',
            email2: ''
        }
    },
    validations: {
        phone1: {
            required,
            minLength: minLength(9),
            maxLength: maxLength(9),
            numeric
        },
        phone2: {
            minLength: minLength(9),
            maxLength: maxLength(9),
            numeric
        },
        email1: {
            required,
            email
        },
        email2: {
            email
        }
    },
    computed:{
        ...mapState(['person','valStep2'])
    },
    methods:{
        ...mapActions(['setValStep2'])
    },
    updated(){
        this.person.email1 = this.email1;
        this.person.email2 = this.email2;
        this.person.cellphone1 = this.phone1;
        this.person.cellphone2 = this.phone2;
        if(this.$v.email1.$invalid || this.$v.email2.$invalid || this.$v.phone1.$invalid || this.$v.phone2.$invalid){
            this.setValStep2(false)
            console.log(this.valStep2)
        } else {
            this.setValStep2(true)
            console.log(this.valStep2)
        }
    }
}
</script>