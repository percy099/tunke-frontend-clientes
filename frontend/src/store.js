import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    person:{
      idProspectiveClient: -1,
      lastEnterDate: new Date,
      enterCount : -1,
      email1 : '',
      email2 : '',
      cellphone1 : '',
      cellphone2 : '',
      idPerson : -1,
      documentType : '',
      documentNumber : '',
      firstName : '',
      middleName : '',
      fatherLastname : '',
      motherLastname : '',
      birthdate : '',
      address : '',
      nationality : '',
      vehicle1Plate : '',
      vehicle2Plate : ''
    }

  },
  mutations: {
    fillPersonData(state,person_data){
      state.person.firstName = person_data.firstName;
      state.person.middleName = person_data.middleName;
      state.person.documentNumber = person_data.documentNumber;
    }
  },
  actions: {
    fill(context,person_data){
        context.commit('fillPersonData',person_data);
    }
    
  }
})
