<template>
  <div id="app">
    <!--NAVBAR-->
    <Nav></Nav>
    <!--END NAVBAR-->
    <router-view/>
    <!--FOOTER-->
    <footer></footer>
    <!--END FOOTER-->
  </div>
</template>

<script>


import Nav from '@/components/Nav.vue'


export default {
    name: 'App',
    components: {
      Nav
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


#nav a.router-link-exact-active {
  color: #42b983;
}

footer{
  bottom: 0;
  left : 0;
  right: 0;
  width: 100%;
  height: 2.5rem;  
  background-color: rgba(0,203,138,0.66);;
}

.swal2-container{
  z-index: 10000 !important;
}

</style>
