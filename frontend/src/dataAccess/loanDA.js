import axios from 'axios';

export function doRequestLead(idLead){
    let url =  process.env.VUE_APP_API_URL + 'api/lead/' + idLead;
    return axios.get(url);
}

export function doRequestParameters(){
    let url =  process.env.VUE_APP_API_URL + 'api/parameterSettings/';
    return axios.get(url);
}

export function doRequestAccountsByClient(idClient){
    let url =  process.env.VUE_APP_API_URL + 'api/accounts/getByClient/';
    var body={
        "idClient":idClient
    }
    return axios.post(url,body);
}

export function doCreateLoan(idClient,totalShares,amount,interestRate,idCampaign,idShareType,share,idAccount,commission,idLead){
    let url =  process.env.VUE_APP_API_URL + 'api/requestLoan/';
    var body ={
        "idClient" : idClient,
        "totalShares" : totalShares,
        "amount" : amount,
        "interestRate" : interestRate,
        "idCampaign" : idCampaign,
        "idShareType" : idShareType,
        "share": share,
        "idAccount":idAccount,
        "commission":commission,
        "idLead":idLead
    }
    console.log("idClient",idClient);
    console.log("total shares",totalShares);
    console.log("amount",amount);
    console.log("interestRate-----",interestRate);
    console.log("idcampaign",idCampaign);
    console.log("idSharet",idShareType);
    console.log("share",share);
    console.log("idaccount",idAccount);
    console.log("commission",commission);
/*
    console.log("tipos");
                console.log(typeof(idClient));
                console.log(typeof(totalShares));
                console.log(typeof(amount));
                console.log(typeof(interestRate));
                console.log(typeof(idCampaign));
                console.log(typeof(idShareType));
                console.log(typeof(share));
                console.log(typeof(idAccount));
                console.log(typeof(commission));*/
    return axios.post(url,body);
}
