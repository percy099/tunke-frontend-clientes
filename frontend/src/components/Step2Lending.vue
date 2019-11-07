<template>
    <div id="step2">
        <div class="hover-table-layout">
            <div class="disabled-item">
            <div class="listing-item">
                <figure class="image">
                    <img src="@/images/hipotecario.jpg" alt="image">
                    <figcaption>
                    <div class="caption">
                        <h1> </h1>
                        </div>
                    </figcaption>
                </figure>
                <div class="titleCamp">
                    <h5 align="center">Préstamo con Garantía</h5>
                    <h5 align="center">Hipotecaria</h5>
                </div>      
                <div class="listing">
                    <h4>El préstamo que necesitas en muy pocos pasos. ¡Consíguelo ahora!</h4>
                </div>
            </div>
            </div>
            <div class="listing-item">
                <figure class="image">
                    <img src="@/images/vehicular.jpeg" alt="image">
                    <figcaption>
                    <div class="caption">
                        <h1> </h1>
                        </div>
                    </figcaption>
                </figure>
                <div class="titleCamp">
                    <h5 align="center">Crédito Vehicular</h5>
                    <h5 align="center"></h5>
                </div>      
                <div class="listing">
                    <h4>Tenemos un plan de cuotas de acuerdo a tus necesidades. ¡Pídelo ya!</h4>
                </div>
            </div> 
            <div class="disabled-item">
            <div class="listing-item" >
                <figure class="image">
                    <img src="@/images/educativo.jpg" alt="image">
                    <figcaption>
                    <div class="caption">
                        <h1> </h1>
                        </div>
                    </figcaption>
                </figure>
                <div class="titleCamp">
                    <h5 align="center">Préstamos para</h5>
                    <h5 align="center">estudios</h5>
                </div>      
                <div class="listing">
                    <h4>Aprovecha la oportunidad e incrementa tu talento con este préstamo pensado para ti.</h4>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="@/styles/Step2Lending.css">

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