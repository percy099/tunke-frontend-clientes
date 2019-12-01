import axios from 'axios';

export function doCreateAccount(idPer,cur,type,ans1,ans2,ans3,ans4){
    let url =  process.env.VUE_APP_API_URL + 'api/openAccount/';
    console.log(ans1,ans2,ans3,ans4);
    var body ={
        "idPerson" : idPer,
        "currency" : cur,
        "origin" : 1,
        "accountType" : type,
        "response1" : ans1,
        "response2" : ans2,
        "response3" : ans3,
        "response4" : ans4
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