import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valStep2: false,
    selectedFirstButton:false, /* false: "pidelo aqui"  true:"simulation"*/
    simulationShareSelected:-1,
    showModalAccount:false,
    termsReadLoan:false,
    processId:'',
    parameterSetting:{
        maxTokenSends: '',
        maxDiaryMovements : '',
        legalAge : '',
        maxAccountsNumber : '',
        commissionPercentage:''
    },
    showModalSchedule:{
      status:false,
      simulation:''
    },
    activeTypeDoc:null,
    activeTypeLoan:null,
    activeShare:null,
    activeTerm:null,
    activeTypeCurrency:null,
    activeValueLoan:0,
    activeAccountLoan:'',
    person:{
      idProspectiveClient: -1,
      lastEnterDate: new Date,
      enterCount : -1,
      email1 : '',
      email2 : '',
      cellphone1 : '',
      cellphone2 : '',
      idPerson : -1,
      idClient:-1,
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
      vehicle2Plate : '',
      activeCampaigns:'',
      activeLoans: '',
      campaign:{
          active:'',
          endDate:'',
          idCampaign:'',
          idCurrency: '',
          interestRate: '',
          maximumLoan: '',
          maximumPeriod: '',
          minimumLoan: '',
          minimumPeriod: '',
          month: '',
          name: '',
          startDate: ''
      },
      idLead:'',
      totalAccounts: 0

    },
    token:{
      input:'',
      received:''
    },
    lead:{
      idShareType:'',
      minimumLoan:'',
      maximumLoan:'',
      active:'',
      idCampaign:'',
      idClient:''
    },
    flagRestartTimer:false,
    clientAcceptedTerms:false,
    currency1 : 1,
    currency2 : 1,
    currency3 : 1,
    accountType : 1,
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
    },
    simulationList:[]
  },
  mutations: {
    setShowModalSchedule(state, showModalSchedule){
      state.showModalSchedule.status = showModalSchedule.status;
      state.showModalSchedule.simulation = showModalSchedule.simulation;
    },
    setActiveTypeLoan(state, activeTypeLoan) {
      state.activeTypeLoan = activeTypeLoan;
    },
    setActiveShare(state, activeShare) {
      state.activeShare = activeShare;
    },
    setActiveTerm(state, activeTerm) {
      state.activeTerm = activeTerm;
    },
    setActiveTypeCurrency(state, activeTypeCurrency) {
      state.activeTypeCurrency = activeTypeCurrency;
    }, 
    setActiveValueLoan(state, activeValueLoan) {
      state.activeValueLoan = activeValueLoan;
    }, 
    setActiveAccountLoan(state, activeAccountLoan) {
      state.activeAccountLoan = activeAccountLoan;
    }, 
    setActiveTypeDoc(state, activeTypeDoc) {
      state.activeTypeDoc = activeTypeDoc;
    },
    setTermsReadLoan(state, termsReadLoan) {
      state.termsReadLoan = termsReadLoan;
    },
    setsShowModalAccount(state, showModalAccount) {
      state.showModalAccount = showModalAccount;
    },
    setsSimulationShareSelected(state, simulationShareSelected) {
      state.simulationShareSelected = simulationShareSelected;
    },
    changeFlagTimer(state,flag){
      state.flagRestartTimer=flag;
    }, 
    changeSelectedFirstButton(state, selectedFirstButton){
      state.selectedFirstButton=selectedFirstButton;
    },
    changeClientTerms(state,terms){
      state.clientAcceptedTerms=terms;
    }, 
    setProcessId(state,processId){
      state.processId=processId;
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
      state.person.idClient  = person_data.idClient ;

      state.person.activeCampaigns=person_data.activeCampaigns;
      state.person.activeLoans=person_data.activeLoans;
      state.person.totalAccounts=person_data.totalAccounts;

      if (person_data.activeCampaigns){        
        state.person.campaign=person_data.campaign;
        state.person.idLead=person_data.idLead;
      }
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
     },
    fillLeadData(state,lead){
      state.lead.idShareType=lead.idShareType;
      state.lead.minimumLoan=lead.minimumLoan;
      state.lead.maximumLoan=lead.maximumLoan;
      state.lead.active=lead.active;
      state.lead.idCampaign=lead.idCampaign;
      state.lead.idClient=lead.idClient;
    },
    fillSimulationList(state, res_answer){
      state.simulationList=[];
      for (let i=0;i<res_answer.length;i++){
        state.simulationList.push({
          term:res_answer[i].term,
          share: res_answer[i].share,
          tcea:res_answer[i].tcea
        });
      }
    },
    setParameters(state,data){
      state.parameterSetting.maxTokenSends=data.maxTokenSends;
      state.parameterSetting.maxDiaryMovements=data.maxDiaryMovements;
      state.parameterSetting.legalAge=data.legalAge;
      state.parameterSetting.maxAccountsNumber=data.maxAccountsNumber;
      state.parameterSetting.commissionPercentage=data.commissionPercentage;
    },
    setValS2(state, flag){
      state.valStep2 = flag;
    },
    setAccType(state, flag){
      state.accountType = flag;
    },
    changeCur1(state, flag){
      state.currency1 = flag;
    },
    changeCur2(state, flag){
      state.currency2 = flag;
    },
    changeCur3(state, flag){
      state.currency3 = flag;
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
    },
    fillLead(context,leadData){
      context.commit('fillLeadData',leadData);
    },
    setActiveTypeLoans(context, activeTypeLoan) {
      context.commit('setActiveTypeLoan',activeTypeLoan);
    },
    setActiveShares(context, activeShare) {
      context.commit('setActiveShare',activeShare);
    },
    setActiveTerms(context, activeTerm) {
      context.commit('setActiveTerm',activeTerm);
    },
    setActiveTypeCurrencys(context, activeTypeCurrency) {
      context.commit('setActiveTypeCurrency',activeTypeCurrency);
    }, 
    setActiveValueLoans(context, activeValueLoan) {
      context.commit('setActiveValueLoan', activeValueLoan);
    },
    setActiveAccountLoans(context, activeAccountLoan) {
      context.commit('setActiveAccountLoan', activeAccountLoan);
    },
    setActiveProcessId(context, processId) {
      context.commit('setProcessId', processId);
    }, 
    setActiveTypeDocs(context, activeTypeDoc) {
      context.commit('setActiveTypeDoc', activeTypeDoc);
    },
    setTermsReadLoans(context, status) {
      context.commit('setTermsReadLoan', status);
    },
    setShowModalAccount(context, status) {
      context.commit('setsShowModalAccount', status);
    }, 
    setSimulationShareSelected(context, status) {
      context.commit('setsSimulationShareSelected', status);
    }, 
    fillShowModalSchedule(context, showModalSchedule){
      context.commit('setShowModalSchedule', showModalSchedule);
    },
    fillSimulationsData(context,simulationsData){
      context.commit('fillSimulationList',simulationsData);
    },
    fillParameterSettings(context,parameters){
      context.commit('setParameters',parameters);
    },
    setSelectedFirstButton(context,selectedFirstButton){
      context.commit('changeSelectedFirstButton',selectedFirstButton)
    },
    setValStep2(context, flag){
      context.commit('setValS2', flag);
    },
    setAccountType(context, flag){
      context.commit('setAccType', flag);
    },
    changeCurrency1(context, flag){
      context.commit('changeCur1', flag);
    },
    changeCurrency2(context, flag){
      context.commit('changeCur2', flag);
    },
    changeCurrency3(context, flag){
      context.commit('changeCur3', flag);
    }
  }
})

