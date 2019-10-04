<template>
    <div id="Opening">
        <div class="row">
            <div class="col-6" >
                <h1 class="text-center">Abre tu cuenta</h1> 
                <h5 class="pl-4">En 5 minutos</h5>
            </div>
            
            <form id="form_backgroundOpenAcount">
            <form id="form_openAcount" @submit.prevent='enterDni'>
                <div class="form-row mt-5">
                    <div class="col-6">
                        <div class="box">
                            <h2 class="text-center mt-4">Ingresa tu DNI</h2>
                            <br>
                            <h6 class="ml-5">Número de DNI</h6>
                            <input v-model="dni" align="center" type="text" class="ml-5 mt-2" placeholder="DNI">
                            <br>
                            <br>
                            <div class="form-check mb-2">
                                <input  class="form-check-input" type="checkbox" id="autoSizingCheck">
                                <label class="form-check-label" for="autoSizingCheck">
                                <h6>He leído y acepto la 
                                <a href="#"> Política de 
                                <br> tratamiento y protección de datos 
                                <br> Personales</a>
                                </h6> 
                                </label>
                            </div>
                            
                            <button class="mb-4 mt-3 text-white btn" style="position: absolute">Empieza ahora</button>
                        </div>
                    </div>
                </div>
            </form>
            </form>
            
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
                  },
                  alert(error))
              })
          }
      }
    }

</script>
