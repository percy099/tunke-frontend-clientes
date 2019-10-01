<template>
    <div id="Opening">
        <!--img class="d-block image-fluid img-carousel" src="@/images/paisaje-lago_bosque.jpg"-->
        <div class="row">
            <div class="col-6" >
                <h1 class="text-center">Abre tu cuenta</h1> 
                <h5>En 5 minutos</h5>
            </div>
            
            <form id="form_backgroundOpenAcount">
            <form id="form_openAcount">
                <div class="form-row mt-5">
                    <div class="col-6">
                        <div class="box">
                            <h2 class="text-center mt-4">Ingresa tu DNI</h2>
                            <br>
                            <h6 class="ml-5">Número de DNI</h6>
                            <input align="center" type="text" class="ml-5 mt-2" placeholder="DNI">
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
                            
                            <button @click='enterDni' class="mb-4 mt-3 text-white btn" style="position: absolute">Empieza ahora</button>
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
    
    export default {
      name: 'openingDNI',
      data(){
        return {
          
        };
      },
      computed:{
        
      },
      methods:{
          enterDni(){
              this.$router.push('accountOpening');
          }
      }
    }
</script>