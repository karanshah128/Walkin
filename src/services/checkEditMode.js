import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config';


const checkEdit =async()=>{
    var api = new APIRouter();
    const Request = {

        "userID": config.userId,
        "storeId":config.storeId,
        "guid":config.guid
    };
    const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/EditMode`
    try {
        console.log(`Edit Mode user Request`,Request)
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log('Edit Mode user Response',response)
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default checkEdit