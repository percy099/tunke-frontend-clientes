<template>
    <div id="Opening">
        <div class="row">
            <div class="col-sm-6 d-flex align-items-center flex-column justify-content-center">
                <h1 class="text-white">Abre tu cuenta</h1> 
                <h5>En 5 minutos</h5>
            </div>
            
            <div class="col-sm-6 container-fluid d-flex justify-content-center mt-5 mb-4">
              <form id="form_openAcount" @submit.prevent='enterDni'>
                      <h2 class="text-center mt-5">Ingresa tu DNI</h2>
                      <h6 class="ml-5 mt-4">Número de DNI</h6>
                      <input id="txt_dni" type="text" class="form-control ml-5 mt-1" maxlength="8" minlength="8"
                      @keypress="isNumber($event)" placeholder="DNI"
                       v-model.trim="$v.dni.$model" :class="{
                         'is-invalid' : $v.dni.$error, 'is-valid' : !$v.dni.$invalid }">
                      <div class="valid-feedback ml-5">Dni Válido</div>
                      <div class="invalid-feedback ml-5">
                        <span v-if="!$v.dni.required">Dni Requerido. </span>
                        <span v-if="!$v.dni.minLength">Debe ser de al menos de {{
                          $v.dni.$params.minLength.min}} dígitos </span>
                        <span v-if="!$v.dni.maxLength">Debe ser de al menos de {{
                          $v.dni.$params.maxLength.max}} dígitos </span>
                        <span v-if="!$v.dni.numeric">Debe contener solo números. </span>
                      </div>
                      <div class="form-check ml-5  mt-4">
                          <input  class="form-check-input" @click="acceptTerms()" type="checkbox" id="autoSizingCheck">
                          <label class="form-check-label" for="autoSizingCheck">
                          <h6>He leído y acepto la 
                          <a href="#" @click="goPolitics()"> Política de 
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
    import Swal from 'sweetalert2'

    import { required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'

    export default {
      name: 'openingDNI',
      data(){
        return {
          dni : '',
          termsAccept:false
        };
      },
      validations: {
        dni: {
          required, 
          minLength: minLength(8),
          maxLength: maxLength(8),
          numeric
        }
      },
      computed:{
        ...mapState(['person'])
      },
      methods:{
          ...mapActions(['fill']),
          enterDni(){
              //let res = personDA.doDniValidation(this.dni);
              if (this.termsAccept){
                  personDA.doDniValidation(this.dni).then((res) =>{
                      let person_data = res.data;
                      if(person_data.type==1){ //CLIENT
                        alert('Cliente');
                        console.log(person_data);
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
                      text: 'DNI inválido'
                      })
                  })  
              } else{
                Swal.fire({
                      title: 'Política de Protección de datos',
                      type: 'error',
                      text: 'Por favor, acepte la política de tratamiento y protección de datos personales.'
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
          goPolitics(){
            Swal.fire({
                      title: 'Política de tratamiento y protección de datos personales',
                      
                      text: 'TUNKE es una empresa privada que brinda servicios financieros en el Perú. En ese sentido, nos comprometemos a mantener la privacidad y la protección de información de nuestros clientes, proveedores y colaboradores de conformidad con lo establecido en la Ley No. 29733, Ley de Protección de datos personales y su reglamento, adoptando para ello las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados por los titulares de datos personales, asimismo garantizando la mejora continua de dichas medidas. En tal contexto, declaramos los siguientes lineamientos que debemos informar previamente a nuestros clientes, proveedores y colaboradores, de forma clara e inequívoca, cuando se recaben sus datos personales a través de cualquiera de nuestros canales:  \n La existencia del tratamiento de datos de carácter personal, la finalidad de la recolección y destinatarios de la información.'
+'\n Carácter obligatorio o facultativo de la respuesta a las preguntas que en su caso les sean planteadas, así como de las consecuencias de la obtención de los datos personales o la negativa a suministrar los mismos.'
+'\nPosibilidad de ejercer los derechos de acceso, rectificación, cancelación y/o oposición.'
+'\nIdentidad y dirección del responsable del tratamiento de los datos personales.'
+'\nEl cliente, proveedor o colaborador será el único responsable de los datos personales que consigne en los formularios. Siendo ellos los únicos responsables en caso se consignen datos personales falsos, inexactos, incompletos o no actualizados.'
+'\n'
+'\nCualquier tipo de cesión a terceros de los datos personales de nuestros clientes, proveedores y/o colaboradores de este banco de datos, será comunicada debidamente a los afectados especificando la identidad de los cesionarios y la finalidad con la que se van a tratar los datos personales que están siendo cedidos.'
+'\n'
+'\nPrincipios rectores.'
+'\nEl titular del banco de datos personales, o en su caso, quien resulte responsable del tratamiento, debe cumplir con los principios rectores de la protección de datos personales.'
+'\nPrincipio de consentimiento.'
+'\nEn atención al principio de consentimiento, el tratamiento de los datos personales es lícito cuando el titular del dato personal hubiere prestado su consentimiento libre, previo, expreso, informado e inequívoco. No se admiten fórmulas de consentimiento en las que éste no sea expresado de forma directa, como aquellas en las que se requiere presumir, o asumir la existencia de una voluntad que no ha sido expresa. Incluso el consentimiento prestado con otras declaraciones, deberá manifestarse en forma expresa y clara.'

                      })
          }    
      }
      
    }
</script>
