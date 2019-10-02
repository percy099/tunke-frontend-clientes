<template>
  <div class="container mt-3 mr-5">
    <h1>¡ENHORABUENA!</h1>
    <h6>¡Ya somos una familia!</h6>
    <h5>La apertura de tu cuenta fue realizada con éxito</h5>

    <div class="row">
      <div class="col-md-6 coll-sm-3">
        <div class="box mt-4 ml-5">
          <pre>Datos de la cuenta</pre>
          <div class="container ml-4">
            <div class="row">
              <div class="col-md-6 coll-sm-3">
                <h3>Cliente:</h3>
                <h3>Número de Cuenta:</h3>
                <h3>CCI:</h3>
                <h3>Detalle de Cuenta:</h3>
                <h3>Fecha de Apertura:</h3>
                <h3>Moneda:</h3>
              </div>
              <div class="col-md-6 coll-sm-3">
                <h4>Leonella Checa</h4>
                <h4>1781-3467-9456</h4>
                <h4>1679137976197</h4>
                <h4>Cuenta Simple</h4>
                <h4>08-09-2019</h4>
                <h4>SOLES</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 coll-sm-3">
        <img src="@/images/familia.png" class="d-block" />
      </div>
    </div>
    <h3 style="margin-left: 13vh">Los documentos serán enviados a:</h3>
    <b>leonella.checa@pucp.edu.pe</b>
    <br />
    <button @click="aceptar" class="btn text-white">Aceptar</button>
  </div>
</template>

<style src="@/styles/SummarySale.css" scoped></style>

<script>
import router from "@/router.js";
export default {
    name: "summarySale",
    data(){
        return{

        };
    },
    computed:{

    },
    methods: {
        aceptar(){
            router.push('/');
        }
    }
}
</script>