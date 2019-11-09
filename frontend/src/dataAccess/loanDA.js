import axios from 'axios';

export function doRequestLead(idLead){
    let url =  process.env.VUE_APP_API_URL + 'api/lead/' + idLead;
    return axios.get(url);
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
