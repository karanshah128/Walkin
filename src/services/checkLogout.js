import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config'


const checkLogout=async()=>{
    var api = new APIRouter();
    const Request = {

        "userID": config.userId,
        "guid":config.guid
    };
    const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/EWLogout`
    try {
        console.log(`logout request`,Request)
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log(`logout request`,response)
        return response;

    } catch (error) {
        console.error(error);
    }

}


export default checkLogout