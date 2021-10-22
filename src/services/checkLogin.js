import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config'

const checklogin =async(usnm,pswd,storeNo)=>{
    var api = new APIRouter();
    const Request = {

        "userID": usnm,
        "password": pswd,
        "storeID":storeNo
    };
    const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/EWLogin`
    try {
        console.log(`login request`,Request)
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log('login response',response)
        return response;

    } catch (error) {
        console.error(error);
    }


}



export default checklogin;