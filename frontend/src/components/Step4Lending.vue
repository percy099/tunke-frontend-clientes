<template>
    <div id="step4">
        <div><h1>PASO 4: Elige tu cuenta</h1></div>
    </div>
</template>

<style scoped src="@/styles/Step4Lending.css">

</style>

<script>

import {mapActions,mapState} from 'vuex'
import Swal from 'sweetalert2'

export default {
    data(){
        return {
        };
    },
    computed:{
        ...mapState(['currency'])
    },
    methods:{
        ...mapActions(['changeCurrency'])
    },
    mounted() {
    }
    
}
</script>