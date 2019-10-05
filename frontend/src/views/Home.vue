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
          <img class="d-block img-fluid img-carousel" src="@/images/llamasAjustado.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block img-fluid img-carousel" src="@/images/adult.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block img-fluid img-carousel" src="@/images/calmAjustado.jpg" alt="Third slide">
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
  name: 'home'
}
</script>

<style src="@/styles/Home.css" scoped>

</style>
