import axios from 'axios';

export function doDniValidation(dni){
    let VUE_APP_API_URL = 'http://200.16.7.181:9993/api/dniValidation/';

    var body ={
        "documentNumber" : dni
    }
    
    return axios.post(VUE_APP_API_URL,body);
}