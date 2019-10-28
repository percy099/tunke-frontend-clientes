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
    },
    token:{
      input:'',
      received:''
    },
    flagRestartTimer:false,
    clientAcceptedTerms:false,
    currency : 1,
    responseCreateAccount:{
      accountDetail : '',
      accountNumber : '',
      cci : '',
      currency : '',
      email : '',
      name : '',
      openingDate : ''
    },
    securityQuestions:{
      questions:[]
    },
    answersSecurityQuestions:{
      posAnswer1:-1,
      posAnswer2:-1,
      posAnswer3:-1
    }
  },
  mutations: {
    changeFlagTimer(state,flag){
      state.flagRestartTimer=flag;
    },
    changeClientTerms(state,terms){
      state.clientAcceptedTerms=terms;
    },
    fillPersonData(state,person_data){
      state.person.idPerson = person_data.idPerson;
      state.person.documentType = person_data.documentType;
      state.person.documentNumber = person_data.documentNumber;
      state.person.firstName = person_data.firstName;
      state.person.middleName = person_data.middleName;
      state.person.fatherLastname = person_data.fatherLastname;
      state.person.motherLastname = person_data.motherLastname;
      state.person.birthdate = person_data.birthdate;
      state.person.address = person_data.address;
      state.person.nationality = person_data.nationality;
      state.person.vehicle1Plate = person_data.vehicle1Plate;
      state.person.vehicle2Plate = person_data.vehicle2Plate;

      state.person.email1  = person_data.email1 ;
      state.person.email2  = person_data.email2 ;
      state.person.cellphone1   = person_data.cellphone1  ;
      state.person.cellphone2  = person_data.cellphone2 ;
    },
    fillResponseCreateAccount(state,response_create){
      state.responseCreateAccount.name = response_create.name;
      state.responseCreateAccount.accountNumber = response_create.accountNumber; 
      state.responseCreateAccount.cci = response_create.cci;
      state.responseCreateAccount.accountDetail = response_create.accountDetail;
      state.responseCreateAccount.openingDate = response_create.openingDate;
      state.responseCreateAccount.currency = response_create.currency;
      state.responseCreateAccount.email = response_create.email;
    },
    fillQuestionsComplete(state, res_answer){
      let aux=res_answer.securityQuestions;
      state.securityQuestions.questions=[];
      for (let i=0; i< aux.length;i++){       
        state.securityQuestions.questions.push({
          answers : aux[i].answers,
          correctAnswerIndex : aux[i].correctAnswerIndex,
          question: aux[i].question   
        });
      }
    },
    fillAnswersSelected(state,relationAnswerQuestion){
      if(relationAnswerQuestion.ques==1){
        state.answersSecurityQuestions.posAnswer1=relationAnswerQuestion.posAns;
      }
      else if(relationAnswerQuestion.ques==2){
        state.answersSecurityQuestions.posAnswer2=relationAnswerQuestion.posAns;
      }
      else if(relationAnswerQuestion.ques==3){
        state.answersSecurityQuestions.posAnswer3=relationAnswerQuestion.posAns;
      }
    },
    changeCur(state,cur){
      state.currency = cur;
     },
    fillToken(state, tok){
       state.token.input=tok.input;
       state.token.received=tok.received;
     }
  },
  actions: {
    fill(context,person_data){
        context.commit('fillPersonData',person_data);
    },
    captureResponse(context,response_create){
        context.commit('fillResponseCreateAccount',response_create);
    },

    completeSecurityQuestion(context,res_answer){
      context.commit('fillQuestionsComplete',res_answer);
    },
    completePosAnswerQuestion(context,relationAnswerQuestion){
      context.commit('fillAnswersSelected',relationAnswerQuestion);
    },
    changeCurrency(context,cur){
        context.commit('changeCur',cur);
    },
    fillToken(context,token_){
      context.commit('fillToken',token_);
    },
    changeFlagTimer(context,flag_){
      context.commit('changeFlagTimer',flag_);
    },
    changeClientTerms(context,acceptTerms){
      context.commit('changeClientTerms',acceptTerms);
    }
  }
})
