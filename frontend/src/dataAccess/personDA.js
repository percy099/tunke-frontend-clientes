import axios from 'axios';

export function doDniValidation(dni){
    let url = process.env.VUE_APP_API_URL + 'api/dniValidation'

    var body ={
        "documentNumber" : dni
    }
    
    return axios.post(url,body);
}
