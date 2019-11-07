import axios from 'axios';

export function doRequestLead(idClient,idCampaign){
    let url =  process.env.VUE_APP_API_URL + 'api/lead/';
    var body ={
        "idClient" : idClient,
        "idCampaign" : idCampaign
    }
    
    return axios.post(url,body);
}

export function doCreateLoan(idClient,totalShares,amount,interestRate,idCampaign,idShareType){
    let url =  process.env.VUE_APP_API_URL + 'api/requestLoan/';
    var body ={
        "idClient" : idClient,
        "totalShares" : totalShares,
        "amount" : amount,
        "interestRate" : interestRate,
        "idCampaign" : idCampaign,
        "idShareType" : idShareType
    }
    
    return axios.post(url,body);
}
