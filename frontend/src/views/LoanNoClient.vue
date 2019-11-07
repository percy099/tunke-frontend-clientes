<template>
  <div class="container p-1 mt-4">
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="@/images/hand.png" class="card-img" alt />
        </div>
        <div class="col-md-8">
          <div class="card-body" style="background-color: rgba(200, 200, 200, 0.6); height:100%;">
            <h1 class="card-title">Lo sentimos</h1>
            <p id="fp" class="card-text">
              Actualmente, no cuentas con una 
              <br />cuenta registrada con nosotros.
            </p>
            <p id="sp" class="card-text">
              <small class="card-text">
                Pero no te preocupes!
              </small>
            </p>
            <p id="sp" class="card-text">
              <small class="card-text">
                Te invitamos a aperturar
                <br />una nueva cuenta.
              </small>
            </p>
            <button class="btn text-white" @click="AbrirCuenta">Abrir Cuenta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/styles/BlackList.css" scoped>
</style>

<script>
import router from "@/router.js";
export default {
  name: "LoanNoClient",
  data() {
    return {};
  },
  computed: {},
  methods: {
    aceptar() {
      router.push("/OpeningDNI");
    }
  }
};
</script>