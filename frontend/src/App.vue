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
import Account from '@/views/AccountOpening.vue'
import Money from '@/views/moneyLending.vue'
import Black from '@/views/BlackList.vue'


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
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;  
    background-color: rgba(0,203,138,0.66);;
}

</style>
