<template>
    <div id="Opening">
        <div class="row">
            <div class="col-sm-6 d-flex align-items-center flex-column justify-content-center">
                <h1 class="text-white">Abre tu cuenta</h1> 
                <h5>En 5 minutos</h5>
            </div>
            
            <div class="col-sm-6 container-fluid d-flex justify-content-center mt-5 mb-4">
              <form id="form_openAcount" @submit.prevent='enterDni'>
                      <h2 class="text-center mt-5">Ingresa tus datos</h2>
                      <h6 class="ml-5 mt-4">Tipo de documento</h6>
                      <div class="col-sm-4"> <v-select class="inpt" placeholder=" Tipo de documento" v-model="selectedTypeDoc" :required="!selectedTypeDoc" :options="optionsTypeDoc"  label="text" @input="setActiveTypeDocF"/></div>
                      <h6 class="ml-5 mt-4">Número de documento</h6>
                      <input id="txt_dni" type="text" class="form-control ml-5 mt-1" :maxlength="maxLNumber" :minlength="minLNumber" :disabled='isDisabled'
                      @keypress="isNumber($event)" :placeholder="name"
                       v-model.trim="$v.dni.$model" :class="{
                         'is-invalid' : $v.dni.$error, 'is-valid' : !$v.dni.$invalid }">
                      <div v-if="selectedTypeDoc.value == 1" class="valid-feedback ml-5">Dni Válido</div>
                      <div v-if="selectedTypeDoc.value == 2" class="valid-feedback ml-5">Carnet de Extranjería Válido</div>
                      <div class="invalid-feedback ml-5">
                        <span v-if="!$v.dni.required && selectedTypeDoc.value == 1">Dni Requerido. </span>
                        <span v-if="!$v.dni.required && selectedTypeDoc.value == 2">Carnet de Extranjería Requerido. </span>
                        <span v-if="!$v.dni.minLength">Debe ser de al menos de {{
                          $v.dni.$params.minLength.min}} dígitos </span>
                        <span v-if="!$v.dni.maxLength">Debe ser de al menos de {{
                          $v.dni.$params.maxLength.max}} dígitos </span>
                        <span v-if="!$v.dni.numeric">Debe contener solo números. </span>
                      </div>
                      <div class="form-check ml-5  mt-4">
                          <input  class="form-check-input"  :disabled="!termsRead" @click="acceptTerms()" type="checkbox" id="autoSizingCheck">
                          <label class="form-check-label" for="autoSizingCheck">
                          <h6>He leído y acepto la 
                          <a href="#"  @click="goPolitics()"> Política de 
                          <br> tratamiento y protección de datos 
                          <br> Personales</a>
                          </h6> 
                          </label>
                          <button class="mt-4 text-white btn" type="submit">Empieza ahora</button>
                      </div>           
              </form>
            </div>
        </div>
    </div>
</template>


<style src="@/styles/OpeningDNI.css" scoped>

</style>

<script>
    
    import {mapState} from 'vuex'
    import {mapActions} from 'vuex'
    import router from '@/router.js'
    import * as personDA from '@/dataAccess/personDA.js'
    import * as loanDA from '@/dataAccess/loanDA.js'
    import Swal from 'sweetalert2'

    import { required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'

    export default {
      name: 'openingDNI',
      data(){
        return {
          selectedTypeDoc:false,
          enableButton: false,
          optionsTypeDoc: [{
              value:1, text:'DNI'
            },{
              value:2, text:'Carnét de extranjería'
            }],
          dni : '',
          termsAccept:false,
          termsRead:false,
          minLNumber:-1,
          maxLNumber:-1,
          name: ''
        };
      },
      validations() {
        return {
          dni: {
            required, 
            minLength: minLength(this.minLNumber),
            maxLength: maxLength(this.maxLNumber),
            numeric
          }
        }
      },
      computed:{
        ...mapState(['person','processId','parameterSetting','activeTypeDoc']),
        isDisabled: function(){
            if(this.selectedTypeDoc){
                this.enableButton = true;
            }
    	      return !this.enableButton;
        }
      },
      methods:{
          ...mapActions(['fill','setActiveProcessId','fillParameterSettings','setActiveTypeDocs']),
          enterDni(){
              if (this.termsAccept){
                if(this.activeTypeDoc!=null){
                  personDA.doDniValidation(this.dni).then((res) =>{
                    //1 : apertura de cuentas
                    //2 : prestamos
                    this.setActiveProcessId(1);
                      let person_data = res.data;
                      if(person_data.type==1){ //CLIENT
                        console.log(person_data);
                        this.fill(person_data);
                        router.push('/accountOpeningClient');
                      }
                      else if(person_data.type==2){//NO CLIENT
                        console.log(person_data);
                        this.fill(person_data);
                        router.push('/accountOpening');
                      }
                      else if(person_data.type==3){//BLACK LIST
                        router.push('/blackList');
                      }
                  }).catch(error=>
                  {
                      Swal.fire({
                      title: 'Error',
                      type: 'error',
                      text: 'Número de documento inválido'
                      })
                  })  
                  }else{
                  Swal.fire({
                      title: 'Tipo de documento',
                      text: 'Es necesario seleccionar un tipo de documento'
                      })
                }
              } else{
                Swal.fire({
                      title: 'Política de Protección de datos',
                      type: 'error',
                      text: 'Por favor, lea y acepte la política de tratamiento y protección de datos personales.'
                      })
              }         
          },
          isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 48 || charCode > 57) {
              evt.preventDefault();;
            } else {
              return true;
            }

          },
          acceptTerms: function(){
            this.termsAccept=!this.termsAccept;
          } ,
          setActiveTypeDocF:function(val){
            this.setActiveTypeDocs(val);
          },
          goPolitics(){
            this.termsRead=true;
            Swal.fire({
                      title: 'Política de tratamiento y protección de datos personales',
                      html:
                            'TUNKE es una empresa privada que brinda servicios <br /> '+
                            'financieros en el Perú. En ese sentido, nos comprometemos<br />'+
                            'a mantener la privacidad y la protección de información <br />'+
                            'de nuestros clientes, proveedores y colaboradores de <br />'+
                            'conformidad con lo establecido en la Ley No. 29733,<br />'+  
                            'Ley de Protección de datos personales y su reglamento,<br />'+ 
                            'adoptando para ello las medidas técnicas y organizativas <br />'+
                            'necesarias para evitar la pérdida, mal uso, alteración,<br />'+ 
                            'acceso no autorizado y robo de los datos personales <br />'+
                            'facilitados por los titulares de datos personales, <br />'+
                            'asimismo garantizando la mejora continua de dichas <br />'+
                            'medidas. En tal contexto, declaramos los siguientes<br />'+
                            'lineamientos que debemos informar previamente a <br />'+
                            'nuestros clientes, proveedores y colaboradores, <br />'+
                            'de forma clara e inequívoca, cuando se recaben sus<br />' +
                            'datos personales a través de cualquiera de nuestros canales.'
                            ,
                      showCloseButton: true
                      })
          },
          getParameterSettings:function(){
            loanDA.doRequestParameters().then((res) =>{
                        let response_create = res.data;
                        this.fillParameterSettings(response_create);
                        console.log("PARAMETROS DE CONFIGURACION")
                        console.log(this.parameterSetting);
                    }).catch(error=>
                    {
                        Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Error en la captura de parámetros de configuración'
                        })
                    })
          }   
      },
      mounted(){
        this.getParameterSettings();
      },
      updated(){
        
        if(this.selectedTypeDoc && this.selectedTypeDoc.value==1){
          this.minLNumber=8;
          this.maxLNumber=8;
          this.name = "DNI";
        }
        if(this.selectedTypeDoc && this.selectedTypeDoc.value==2){
          this.minLNumber=12;
          this.maxLNumber=12;
          this.name = "Carnet de extranjería"
          
        }
      }
      
    }
</script>
