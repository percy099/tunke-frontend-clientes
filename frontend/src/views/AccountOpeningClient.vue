<template>
    <div>
      <WizardClient></WizardClient>
    </div>
 
</template>


<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import WizardClient from '@/components/WizardClient.vue'

export default {
  name: 'accountOpeningClient',
  components: {
    WizardClient
  }
}
</script>


<style src="@/styles/AccountOpeningClient.css" scoped>

</style>