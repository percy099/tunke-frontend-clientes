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
                      <input v-model="dni" id="txt_dni" type="text" class="form-control ml-5 mt-1" maxlength="8" minlength="8"
                       @keypress="isNumber($event)" placeholder="DNI">
                      <div class="g-signin2 ml-5 mt-2" data-width="265" data-height="35" data-onsuccess="onSignIn" android:text="{string}"></div>          
                      <div class="form-check ml-5  mt-4">
                          <input  class="form-check-input" type="checkbox" id="autoSizingCheck">
                          <label class="form-check-label" for="autoSizingCheck">
                          <h6>He leído y acepto la 
                          <a href="#"> Política de 
                          <br> tratamiento y protección de datos 
                          <br> Personales</a>
                          </h6> 
                          </label>
                          <button class="mt-4 ml-4 text-white btn">Empieza ahora</button>
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

    export default {
      name: 'openingDNI',
      data(){
        return {
          dni : ''
        };
      },
      computed:{
        ...mapState(['person'])
      },
      methods:{
          ...mapActions(['fill']),
          enterDni(){
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
                  text: 'Gaaaaaa'
                  })
              })             
          },
          isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 48 || charCode > 57) {
              evt.preventDefault();;
            } else {
              return true;
            }
          } ,
          onSignIn: function(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            var id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
          }       
      }
      
    }
</script>
