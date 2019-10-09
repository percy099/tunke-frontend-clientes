<template>
  <div class="home">

    <!--CAROUSEL-->
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img id="img1" class="d-block w-100 img-fluid" src="@/images/llamasAjustado.jpg" alt="First slide">
          <div class="carousel-caption d-md-block pb-5 cap1">
            <h2 class="content wordsFirstSlide">100% digital donde</h2>
            <h2 class="content wordsFirstSlide">quiera que estés</h2>
            <button @click="openAccount" class="btn button-1 text-white">ABRE TU CUENTA AHORA</button>
          </div>
        </div>
        <div class="carousel-item">
          <img id="img2" class="d-block w-100 img-fluid" src="@/images/adult.jpg" alt="Second slide">
          <div class="carousel-caption d-md-block pb-5 cap2">
            <h2 class="content wordsSecondSlide" id="firstWordSecondSlide">Tenemos campañas</h2>
            <h2 class="content wordsSecondSlide" id="secondWordSecondSlide">para ti</h2>
            <button @click="openMoneyLending" class="btn button-2">BUSCA TU CAMPAÑA</button>
          </div>
        </div>
        <div class="carousel-item">
          <img id="img3" class="d-block w-100 img-fluid" src="@/images/calmAjustado.jpg" alt="Third slide">
          <div class="carousel-caption d-md-block pb-5">
            <h1 id="textTunke">Tunke</h1>
            <h2 id="middle">Somos el primer Banco 100% digital en el Perú</h2>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <!--END CAROUSEL-->
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'home',
  methods :{
    openAccount(){
      this.$router.push('/OpeningDNI');
    },
    openMoneyLending(){
      this.$router.push('/moneyLending');
    }
  }
}
</script>

<style src="@/styles/Home.css" scoped>

</style>
