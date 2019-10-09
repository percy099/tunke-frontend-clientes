<!--<template>
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
                <div class="client">Cliente:</div>
                <h3>Número de Cuenta:</h3>                
                <h3>CCI:</h3>
                <h3>Detalle de Cuenta:</h3>
                <h3>Fecha de Apertura:</h3>
                <h3>Moneda:</h3>
              </div>
              <div class="col-6 col-sm-6 col-md-6">
                <h4>{{responseCreateAccount.name}}</h4>
                <h4>{{responseCreateAccount.accountNumber}}</h4>
                <h4>{{responseCreateAccount.cci}}</h4>
                <h4>{{responseCreateAccount.accountDetail}}</h4>
                <h4>{{responseCreateAccount.openingDate}}</h4>
                <h4>{{responseCreateAccount.currency}}</h4>
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
      <b>{{responseCreateAccount.email}}</b>
    </div>
    <div class="row">
      <button class="btn text-white btn-lg bnt-md" @click="aceptar">Aceptar</button>
    </div>
  </div>
</template>-->

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
                    <p id="sp" class="card-text">Leonella Yacsahuache Montenegro Sarmiento</p>
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
      <div class="email">sfr.ronaldo@gmail.com</div>
    </div>
    <div class="row">
      <button class="btn text-white btn-lg bnt-md" @click="aceptar">Aceptar</button>
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
    aceptar() {
      router.push("/");
    }
  }
};
</script>