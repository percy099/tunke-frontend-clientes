<template>
    <div>
      <WizardLending></WizardLending>
    </div>
 
</template>


<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import WizardLending from '@/components/WizardLending.vue'

export default {
  name: 'lending',
  components: {
    WizardLending
  }
}
</script>


<style src="@/styles/Lending.css" scoped>

</style>