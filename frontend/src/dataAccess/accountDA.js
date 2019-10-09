import axios from 'axios';

export function doCreateAccount(idPer,cur){
    let url = 'http://3.80.235.12:9993/api/openAccount/';

    var body ={
        "idPerson" : idPer,
        "currency" : cur
    }
    
    return axios.post(url,body);
}
