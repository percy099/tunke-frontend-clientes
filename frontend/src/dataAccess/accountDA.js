import axios from 'axios';

export function doCreateAccount(idPer,cur){
    let url = VUE_APP_API_URL+'/api/openAccount/';

    var body ={
        "idPerson" : idPer,
        "currency" : cur
    }
    
    return axios.post(url,body);
}
