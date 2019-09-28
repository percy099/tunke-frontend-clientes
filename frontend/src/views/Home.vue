<template>
  <div class="home">
    <!--NAVBAR-->
    <nav class="navbar navbar-expand-md navbar-light">
      <img class="navbar-brand ml-5 pb-2" href="#" src="@/images/logo_verde.png"  width="150" height="85">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mr-auto"></ul>
        <ul class="navbar-right nav navbar-nav mr-5">
          <li class="nav-item mr-5">
            <a class="text-white nav-link" href="#">APERTURA TU CUENTA</a>
          </li>
          <li class="nav-item mr-5">
            <a class="text-white nav-link mr-2" href="#">CAMPAÑAS</a>
          </li>
        </ul>
      </div>
    </nav>
    <!--END NAVBAR-->

    <!--CAROUSEL-->
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block image-fluid img-carousel" src="@/images/llamasAjustado.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block image-fluid img-carousel" src="@/images/niñoMujer.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block image-fluid img-carousel" src="@/images/cordillera.jpg" alt="Third slide">
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

    <!--FOOTER-->
    <footer></footer>
    <!--END FOOTER-->
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
    
  }
}
</script>

<style src="@/styles/Home.css" scoped>

</style>
