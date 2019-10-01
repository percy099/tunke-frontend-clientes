<template>
    <div>
    <nav class="navbar navbar-expand-md navbar-light">
      <router-link :to="{path : '/'}" href="#">
        <img class="navbar-brand ml-5 pb-2" href="#" src="@/images/logo_verde.png"  width="150" height="85">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mr-auto"></ul>
        <ul class="navbar-right nav navbar-nav mr-5">
          <li class="nav-item mr-5">
            <router-link class="text-white nav-link" to ="/OpeningDNI" href="#">APERTURA TU CUENTA</router-link>
          </li>
          <li class="nav-item mr-5">
            <router-link class="text-white nav-link" to ="/moneyLending" href="#">CAMPAÑAS</router-link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
</template>

<style src="@/styles/Nav.css" scoped>

</style>