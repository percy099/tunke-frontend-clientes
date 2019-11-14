<template>
    <div>
      <WizardLending></WizardLending>
    </div>
 
</template>


<script>
// @ is an alias to /src
import {mapActions,mapState} from 'vuex'
import Nav from '@/components/Nav.vue'
import WizardLending from '@/components/WizardLending.vue'
import * as loanDA from '@/dataAccess/loanDA.js'
import Swal from 'sweetalert2'

export default {
  name: 'lending',
  components: {
    WizardLending
  },
  computed:{
        ...mapState(['parameterSetting'])
  },
  methods:{
    ...mapActions(['fillParameterSettings']),
    getParameterSettings:function(){
      loanDA.doRequestParameters().then((res) =>{
                  let response_create = res.data;
                  this.fillParameterSettings(response_create);
                  console.log(this.parameterSetting);
              }).catch(error=>
              {
                  Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: 'Error en la captura de parámetros de configuración'
                  })
              })
    }
  },
  mounted(){
    this.getParameterSettings();
  }
}
</script>


<style src="@/styles/Lending.css" scoped>

</style>