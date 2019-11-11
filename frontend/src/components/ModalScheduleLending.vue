<!-- template for the modal component -->
<template id="modal-template" >
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container">
          <div class="closeModalSimulation"><button @click="$emit('close')">X</button></div>
          <div id="modalCalendar">
              <h1 class="text-center">Detalles de la</h1>
              <h1 class="text-center">simulación</h1>
              <div class="container mt-5">
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Producto</div>
                      <div class="col-4">Préstamo Efectivo</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Moneda</div>
                      <div class="col-4">{{currencyName}}</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Monto a financiar</div>
                      <div class="col-4">{{activeValueLoan}}</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Tasa de Costo Efectiva</div>
                      <div class="col-4">{{person.campaign.interestRate}}% anual</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Tipo de Cuota</div>
                      <div class="col-4">{{activeShare.text}}</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Cuota ordinaria</div>
                      <div class="col-4">{{currencySymbol}} {{shareCalculated}}</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Plazo de Crédito</div>
                      <div class="col-4">{{termSelected}} meses</div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-5 firstWord">Comisión</div>
                      <div class="col-4">{{currencySymbol}} {{comisionAmount}}</div>
                  </div>
                  <hr>
              </div>
              <div class="row mt-4">
                  <div class="col-1"></div>
                  <div class="col-6"><h1>Calendario de pagos</h1></div>
              </div>
              <div class="container">
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-10">
                          <table class="table">
                              <thead>
                                  <tr class="table-dark">
                                      <th>Totales</th>
                                      <th>F. Vencimiento</th>
                                      <th>Saldo Inicial</th>
                                      <th>Amortización</th>
                                      <th>Interés</th>
                                      <th>Comisión</th>
                                      <th>Monto de Cuota</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="(share,index) in shares" v-bind:key="index">
                                      <td class="tdOneTwoFourSeven">{{index + 1}}</td>
                                      <td class="tdOneTwoFourSeven">{{share.date}}</td>
                                      <td class="tdThreeFive">{{currencySymbol}} {{share.initialBalance}}</td>
                                      <td class="tdOneTwoFourSeven">{{currencySymbol}} {{share.amortization}}</td>
                                      <td class="tdThreeFive">{{currencySymbol}} {{share.interest}}</td>
                                      <td class="tdSix">{{currencySymbol}} {{share.commission}}</td>
                                      <td class="tdOneTwoFourSeven">{{currencySymbol}} {{share.feeAmount}}</td>
                                  </tr>
                              </tbody>
                              <tfoot>
                                  <tr class="table-dark">
                                      <td class="tdThreeFive">Totales</td>
                                      <td></td>
                                      <td></td>
                                      <td>{{currencySymbol}} {{totalAmortization}}</td>
                                      <td>{{currencySymbol}} {{totalInterest}}</td>
                                      <td>{{currencySymbol}} {{totalComission}}</td>
                                      <td class="tdSix">{{currencySymbol}} {{totalShare}}</td>                                
                                  </tr>
                              </tfoot>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped src="@/styles/ModalScheduleLending.css"></style>

<script>

import {mapActions,mapState} from 'vuex'

export default {
    data(){
        return {
            comision:0.25,
            comisionAmount:'',
            currencySymbol:'' ,
            currencyName:'',
            shareCalculated:'',
            termSelected:'',
            totalInterest:'',
            totalComission:'',
            totalAmortization:'',
            totalShare:'',
            //interestCalculated:'',
            //amortizationCalculated:'',
            shares : [
            /*{ date : '16/10/2019', initialBalance : 4000.00, amortization : 534.10, interest : 72.35, commission : 10.00, feeAmount: 619.45},
            { date : '16/11/2019', initialBalance : 3465.90, amortization : 541.85, interest : 64.80, commission : 10.00, feeAmount: 619.45},
            { date : '16/12/2019', initialBalance : 2923.45, amortization : 1163.41, interest : 52.89, commission : 10.00, feeAmount: 619.45},
            { date : '16/01/2020', initialBalance : 1760.12, amortization : 575.58, interest : 32.91, commission : 10.00, feeAmount: 619.45},
            { date : '16/02/2020', initialBalance : 1182.90, amortization : 586.38, interest : 22.21, commission : 10.00, feeAmount: 619.45},
            { date : '16/03/2020', initialBalance : 598.20, amortization : 598.20, interest : 10.45, commission : 10.00, feeAmount: 619.45}
            */]
        }
    },
    computed:{
        ...mapState(['person','activeValueLoan','simulationList','showModalSchedule','activeShare'])
    },
    methods:{
        ...mapActions(['changeCurrency']),
        updateData:function(){
            if (this.person.campaign.idCurrency==1){
                this.currencySymbol="S/.";
                this.currencyName="Soles";
            }else if (this.person.campaign.idCurrency==2){
                this.currencySymbol="$";
                this.currencyName="Dólares";
            }          

            this.shareCalculated=this.simulationList[this.showModalSchedule.simulation].share;
            this.termSelected=this.simulationList[this.showModalSchedule.simulation].term;

            let dateToPay=this.currentday();
                        
            let amortization_=this.activeValueLoan/this.termSelected;

            let tea=this.person.campaign.interestRate;
            let tem=Math.pow(1+(tea/100),1/12)-1;
            let interestCampaign=this.activeValueLoan*tem;

            this.comisionAmount=this.activeValueLoan*this.comision/100;

            let amountBalance=this.activeValueLoan;
            let fee=this.shareCalculated;
            //totales
            this.totalInterest=0;
            this.totalComission=0;
            this.totalAmortization=0;
            this.totalShare=0;

            //schedule
            this.shares=[];
            for (let i=0;i<this.termSelected;i++){
              //dateToPay=this.addDays(dateToPay,30);  
              let n_share={
                'date': dateToPay,
                'initialBalance':amountBalance,
                'amortization':amortization_,
                'interest':interestCampaign,
                'commission':this.comisionAmount,
                'feeAmount':fee
              },
              amountBalance=amountBalance-amortization_;

              this.totalInterest=this.totalInterest+interestCampaign;
              this.totalComission=this.totalComission+this.comisionAmount;
              this.totalAmortization=this.totalAmortization+amortization_;
              this.totalShare=this.totalShare+fee;
            }
        },
        currentday:function(){
            
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; //Enero is 0.
            let yyyy = today.getFullYear();

            if(dd<10) dd='0'+dd;
            if(mm<10) mm='0'+mm;
            return (mm+'/'+dd+'/'+yyyy);
        },
        addDays:function (dateIn_, n) {
            console.log("date ingresada: ", dateIn_);
            let dateIn=new Date(dateIn_);            

            console.log("date 2:", dateIn);
            let days = parseInt(n.value);

            dateIn.setDate(dateIn.getDate() + days);
            console.log("day: ", dateIn.getDate());
            console.log("date agregada: ", dateIn);
            
            let result=dateIn.getDate() + '/' + (dateIn.getMonth() + 1) + '/' + dateIn.getFullYear();
            console.log("result: ",result);
            return result;
        },
         convert: function(str) {
            let date = new Date(str);
                let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
                let day = ("0" + date.getDate()).slice(-2);
            return [day,mnth,date.getFullYear()].join("/");
        }

    },
    mounted() {
      this.updateData();
    },
    components:{
    },
    created(){
        //this.updateData();
    }
    
}
</script>