import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config';


const checkEntryMode =async(date)=>{
    var api = new APIRouter();
    const Request = {

       // "userID": config.userId,
        "storeId":config.storeId,
         "guid":config.guid,  
         "fromDate" :date
    };
   const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/EntryMode`
    try {
        console.log(`Entry Mode user Request`,Request)
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log('Entry Mode user Response',response)
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default checkEntryMode