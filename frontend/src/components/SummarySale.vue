<template>
  <div class="container mt-3 mr-6">
    <h1>¡ENHORABUENA!</h1>
    <h6>¡Ya somos una familia!</h6>
    <h5>La apertura de tu cuenta fue realizada con éxito</h5>

    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="box mt-4 ml-5">
          <pre> Datos de la cuenta</pre>
          <div class="container ml-4">
            <div class="row">
              <div class="col-6 col-sm-6 col-md-6">
                <h3>Cliente:</h3>
                <h3>Número de Cuenta:</h3>
                <h3>CCI:</h3>
                <h3>Detalle de Cuenta:</h3>
                <h3>Fecha de Apertura:</h3>
                <h3>Moneda:</h3>
              </div>
              <div class="col-6 col-sm-6 col-md-6">
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
      <div class="col-12 col-lg-6">
        <img src="@/images/familia.png" class="d-block" />
      </div>
    </div>
    <div class="row">
      <div class="a">Los documentos serán enviados a:</div>
    </div>
    <div class="row">
      <b>leonella.checa@pucp.pe</b>
    </div>
    <div class="row">
      <button class="btn text-white btn-lg bnt-md" @click="aceptar">Aceptar</button>
    </div>
  </div>
</template>

<style src="@/styles/SummarySale.css" scoped></style>

<script>
import router from "@/router.js";
export default {
  name: "summarySale",
  data() {
    return {};
  },
  computed: {},
  methods: {
    aceptar() {
      router.push("/");
    }
  }
};
</script>