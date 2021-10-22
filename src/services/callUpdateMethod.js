import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config';

const callUpdateMethod =async(date,userData)=>{
    var api = new APIRouter();
    const Request = {
        "storeId": config.storeId,
        "updatedBy": config.userId,
        "statusdate": date,
        "employeeDetails": userData
    }

    console.log(`Update All`,Request)
     const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/UpdateAll`
    try {
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log(`Update All`,response)
        return response;
    } catch (error) {
        console.error(error);
    }

}


export default callUpdateMethod