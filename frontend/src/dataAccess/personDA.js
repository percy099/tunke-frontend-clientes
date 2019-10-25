import axios from 'axios';

export function doDniValidation(dni){
    let url =  process.env.VUE_APP_API_URL +'api/dniValidation/';
    var body ={
        "documentNumber" : dni
    }
    
    return axios.post(url,body);
}

export function doRegisterProspect(idPerson,ema1,ema2,cell1,cell2){
    let url = process.env.VUE_APP_API_URL + 'api/prospectiveClients/'

    var body={
        "idPerson" : idPerson,
        "email1" : ema1,
        "email2" : ema2,
        "cellphone1" : cell1,
        "cellphone2" : cell2,
    }
    return axios.post(url,body);
}

export function doQuestionsRequest(idPerson){
    let url =  process.env.VUE_APP_API_URL +'api/securityQuestions/';
    var body ={
        "idPerson" : idPerson
    }
    
    return axios.post(url,body);
}