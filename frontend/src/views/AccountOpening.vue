<template>
    <div>
      <Wizard1></Wizard1>
    </div>
 
</template>


<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Wizard1 from '@/components/Wizard1.vue'

export default {
  name: 'accountOpening',
  components: {
    Wizard1
  }
}
</script>


<style src="@/styles/AccountOpening.css" scoped>

</style>