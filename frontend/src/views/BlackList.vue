<template>
  <div class="container p-5">
    <div class="row">
      <div class="col-4">
        <img src="@/images/hand.png" class="d-block" alt />
      </div>
      <div class="col-8">
        <div class="box">
          <h1>Lo sentimos,</h1>
          <h3>En este momento, no podemos<br>
            aperturarle una cuenta.
          </h3>
          <h4>Para mayor información, lo invitamos a<br>
            acercarse a nuestras oficinas.
          </h4>
          <button class="btn text-white" @click="aceptar">Aceptar</button>
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