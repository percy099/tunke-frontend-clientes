<!-- template for the modal component -->
<template id="modal-template" >
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper printable" @click="$emit('close')">
        <div class="modal-container printable">
          <div class="closeModalSimulation non-printable"><button @click="$emit('close')">X</button></div>
          <div id="modalCalendar">
              <!--h2 class="printable2">HOLA ESTO ES UNA PRUEBA</h2-->
                <div class="printable2">
                        <img class="logo" href="#" src="@/images/logo-tunke.png"  width="150" height="85">
                </div>


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
                      <div class="col-4">{{currencySymbol}} {{activeValueLoan}}</div>
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
                      <div class="col-12">
                          <table class="table">
                              <thead>
                                  <tr class="table-dark">
                                      <th>N° cuota</th>
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
              <div align='center'><button class="non-printable"  @click="exportPDF">Exportar a PDF</button></div>
              <div class="printable2">
                        <div class="client" align="right">Cliente: {{person.firstName}} {{person.middleName}} {{person.fatherLastname}} {{person.motherLastname}}</div>
                        <div class="dayToday" align="right">Fecha de simulación: {{todayDate}}</div>
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
            comision:'',
            comisionAmount:'',
            currencySymbol:'' ,
            currencyName:'',
            shareCalculated:'',
            termSelected:'',
            totalInterest:'',
            totalComission:'',
            totalAmortization:'',
            totalShare:'',
            shares : [],
            todayDate: new Date
        }
    },
    computed:{
        ...mapState(['person','activeValueLoan','simulationList','showModalSchedule','activeShare','parameterSetting'])
    },
    methods:{
        ...mapActions(['changeCurrency']),
        exportPDF:function(){
            window.print();
        },
        updateData:function(){
            this.comision=this.parameterSetting.commissionPercentage;
            if (this.person.campaign.idCurrency==1){
                this.currencySymbol="S/.";
                this.currencyName="Soles";
            }else if (this.person.campaign.idCurrency==2){
                this.currencySymbol="$";
                this.currencyName="Dólares";
            }          

            this.shareCalculated=this.simulationList[this.showModalSchedule.simulation].share;
            this.termSelected=this.simulationList[this.showModalSchedule.simulation].term;

            //let dateToPay=this.currentday();
            let moment = require('moment');
            let dateToPay=moment()//new Date()).format("DD/MM/YYYY")
            
            let amortization_=this.activeValueLoan/this.termSelected;

            let tea=this.person.campaign.interestRate;
            let tem=Math.pow(1+(tea/100),1/12)-1;
            let interestCampaign=(this.activeValueLoan*tem).toFixed(2);

            this.comisionAmount=this.activeValueLoan*this.comision/100;

            let amountBalance=parseFloat(this.activeValueLoan);
            let fee=parseFloat(this.shareCalculated);
            //totales
            this.totalInterest=0;
            this.totalComission=0;
            this.totalAmortization=0;
            this.totalShare=0;

            //schedule
            this.shares=[];
            for (let i=0;i<this.termSelected;i++){
              let dateAdded=this.addDays(dateToPay,30);  
              dateToPay=moment(dateAdded).format("DD/MM/YYYY");
              let n_share={
                'date': dateToPay,
                'initialBalance':(amountBalance).toFixed(2),
                'amortization':(amortization_).toFixed(2),
                'interest':interestCampaign,
                'commission':(this.comisionAmount).toFixed(2),
                'feeAmount':(fee).toFixed(2)
              }
              dateToPay=dateAdded;
              this.shares.push(n_share);
              amountBalance=amountBalance-amortization_;
        
              this.totalInterest=parseFloat(this.totalInterest)+parseFloat(interestCampaign);
              this.totalComission=parseFloat(this.totalComission)+parseFloat(this.comisionAmount);
              this.totalAmortization=parseFloat(this.totalAmortization)+parseFloat(amortization_);
              this.totalShare=parseFloat(this.totalShare)+parseFloat(fee);
            }

            //para el pdf
            this.todayDate=moment().format("DD/MM/YYYY");

            this.totalInterest=(this.totalInterest).toFixed(2);
            this.totalComission=(this.totalComission).toFixed(2);
            this.totalAmortization=(this.totalAmortization).toFixed(2);
            this.totalShare=(this.totalShare).toFixed(2);

        },
        addDays:function (dateIn_, n) {
            let moment = require('moment');
            let days = parseInt(n);
            let result = moment(dateIn_).add(days, 'days');
            return result;
        }
    },
    mounted() {
      this.updateData();
    },
    components:{
    },
    created(){
    }
    
}
</script>