<template>
  <div class="container p-1 mt-4">
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="@/images/hand.png" class="card-img" alt="" />
      </div>
      <div class="col-md-8">
        <div class="card-body" style="background-color: rgba(200, 200, 200, 0.6);">
          <h1 class="card-title">Lo sentimos</h1>
          <p id='fp' class="card-text">En este momento, no podemos<br>
            aperturarle una cuenta.</p>
          <p id="sp" class="card-text">
            <small class="card-text">Para mayor información, lo invitamos a<br>
            acercarse a nuestras oficinas.</small>
          </p>
          <button class="btn text-white" @click="aceptar">Aceptar</button>
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
  name: "blackList",
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