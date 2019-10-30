import axios from 'axios';

export function doCreateAccount(idPer,cur){
    let url =  process.env.VUE_APP_API_URL + 'api/openAccount/';
    var body ={
        "idPerson" : idPer,
        "currency" : cur
    }
    
    return axios.post(url,body);
}

/*
export function doGetTokenSMS(email){
    let url =  process.env.VUE_APP_API_URL + 'api/sendToken/';
    var body ={
        "email":email
    }   
    return axios.post(url,body);
}
*/

export function doGetTokenEmail(email){
    let url =  process.env.VUE_APP_API_URL + 'api/sendToken/';
    var body ={
        "email":email
    }   
    return axios.post(url,body);
}