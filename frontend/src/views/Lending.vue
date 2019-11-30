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
import Swal from 'sweetalert2'

export default {
  name: 'lending',
  components: {
    WizardLending
  }
}
</script>


<style src="@/styles/Lending.css" scoped>

</style>