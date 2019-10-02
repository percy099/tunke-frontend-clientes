<template>
  <div class="container">
    <form id="form_backgroundOpenAcount">
      <form id="form_openAcount">
        <div class="form-row mt-5">
          <div class="col-md-4">
            <img src="@/images/hand.png" class="d-block img-fluid" style="height:50;weigth:200" alt />
          </div>
          <div class="col-6">
            <div class="box">
              <h1 class="text-left mt-4 ml-5 md-6">Lo sentimos,</h1>
              <br />
              <h2 class="ml-5">
                En este momento, no podemos
                mostrarle las campañas que tenemos para usted.
              </h2>
              <br />
              <h5 class="ml-5">
                Para mayor información, lo invitamos a acercarse
                a nuestras oficinas.
              </h5>
              <br />
              <br />

              <button
                @click="aceptar"
                class="mb-10 text-white btn"
                style="position: absolute"
              >Aceptar</button>
            </div>
          </div>
        </div>
      </form>
    </form>
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