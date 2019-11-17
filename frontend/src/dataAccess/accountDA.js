import axios from 'axios';

export function doCreateAccount(idPer,cur){
    let url =  process.env.VUE_APP_API_URL + 'api/openAccount/';
    var body ={
        "idPerson" : idPer,
        "currency" : cur,
        "origin" : 1
    }
    
    return axios.post(url,body);
}


export function doGetToken(email,cellphone,type){
    let url =  process.env.VUE_APP_API_URL + 'api/sendToken/';
    var body ={
        "email":email,
        "cellphone":cellphone,
        "msgType": type
    }   
    return axios.post(url,body);
}