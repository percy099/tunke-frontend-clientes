import axios from 'axios';

export function doDniValidation(dni){
    let url = 'http://3.80.235.12:9993/api/dniValidation';

    var body ={
        "documentNumber" : dni
    }
    
    return axios.post(url,body);
}
