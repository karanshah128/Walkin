import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config';

const checkEmployeeDetails =async(usnm)=>{
    var api = new APIRouter();
    const Request = {

        "userID": usnm,
        "storeId":config.storeId
    };
    const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/GetEmployeeDetails`
    try {
        console.log(`GetEmploee request`,Request)
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log(`GetEmploee response`,response)

        return response;

    } catch (error) {
        console.error(error);
    }

}


export default checkEmployeeDetails