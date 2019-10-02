<template>
    <div id=step1>
        <div class="text-center" >
            <h1>¡Hola Solange Palomino!</h1> 
            <h2>74779981</h2>
        </div>
        <div style="text-align:center"> 
            <a href="#">¿Este no es tu DNI?</a><br>
            <br>
        </div>
        <p>Para tu seguridad, por favor responde estas preguntas para ayudarnos a evitar fraudes.</p><br>
        <div class="row justify-content-around">
            <div class="col-4">
                <h3>1) ¿Qué número de placa tiene tu auto?</h3><br>
                <div class="col-md-4 offset-md-3">
                    <input type="radio" name="option1" value="option1"> SEP-345<br>
                    <input type="radio" name="option2" value="option2"> KEC-345<br>
                    <input type="radio" name="option3" value="option3"> LAH-345<br>
                    <input type="radio" name="option4" value="option4"> RRT-345<br>
                    <input type="radio" name="option5" value="option5"> N.A.
                </div>
            </div>
            <div class="col-4">
                <h3>2) ¿Tu RUC está activo?</h3><br>
                <div class="col-md-4 offset-md-3">
                    <input type="radio" name="option1" value="option1"> Sí<br>
                    <input type="radio" name="option2" value="option2"> No
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h3>3) ¿Cuál es el segundo apellido de tu papá?</h3><br>
                <div class="col-md-6 offset-md-3">
                    <input type="radio" name="option1" value="option1"> Callali<br>
                    <input type="radio" name="option2" value="option2"> Meza<br>
                    <input type="radio" name="option3" value="option3"> Concha<br>
                    <input type="radio" name="option4" value="option4"> Guerrero<br>
                    <input type="radio" name="option5" value="option5"> N.A.
                </div>
            </div>
        </div>
    </div>
</template>

<style src="@/styles/Step1NoClient.css" scoped>

</style>