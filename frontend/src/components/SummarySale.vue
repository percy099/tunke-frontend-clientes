<template>
  <div class="container">
    <div class="media position-relative">
      <div class="media-body">
        <h1 class="mt-3">¡ENHORABUENA!</h1>
        <h6>¡Ya somos una familia!</h6>
        <h5>La apertura de tu cuenta fue realizada con éxito</h5>
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-7">
              <div
                class="card-body"
                style="background-color: rgba(200, 200, 200, 0.6); height:100%;"
              >
                <h1 class="card-title">Datos de la cuenta</h1>
                <div class="row ml-4">
                  <div class="col-25">
                    <p id="fp" class="card-text">Cliente:</p>
                    <p id="fp" class="card-text">Número de Cuenta:</p>
                    <p id="fp" class="card-text">CCI:</p>
                    <p id="fp" class="card-text">Detalle de Cuenta:</p>
                    <p id="fp" class="card-text">Fecha de Apertura:</p>
                    <p id="fp" class="card-text">Moneda</p>
                  </div>
                  <div class="col">
                    <p id="sp" class="card-text">{{responseCreateAccount.name}}</p>
                    <p id="sp" class="card-text">{{responseCreateAccount.accountNumber}}</p>
                    <p id="sp" class="card-text">{{responseCreateAccount.cci}}</p>
                    <p id="sp" class="card-text">{{responseCreateAccount.accountDetail}}</p>
                    <p id="sp" class="card-text">{{responseCreateAccount.openingDate}}</p>
                    <p id="sp" class="card-text">{{responseCreateAccount.currency}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <img src="@/images/familia.png" class="card-img" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="a">Los documentos serán enviados a:</div>
    </div>
    <div class="row">
      <div class="email">{{responseCreateAccount.email}}</div>
    </div>
    <div class="row">
      <button class="btn text-white btn-lg bnt-md" @click="accept">Aceptar</button>
    </div>
  </div>
</template>

<style src="@/styles/SummarySale.css" scoped></style>

<script>
import router from "@/router.js";
import { mapState } from "vuex";

export default {
  name: "summarySale",
  data() {
    return {

    };
  },
  computed: {
    ...mapState(["responseCreateAccount"])
  },
  methods: {
    accept() {
      router.push("/");
    }
  }
};
</script>