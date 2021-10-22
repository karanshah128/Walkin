import APIRouter  from '../Common/Js/ApiRouter';
import config from '../config';

const callUpdateUser =async (updateDetails)=>{
    var api = new APIRouter();
    const Request = {
        "empID": updateDetails.empID,
        "storeID": config.storeId,
        "guID": config.guid,
        "updatedBy": config.userId,
        "details":[
           { "date": updateDetails.date,
            "newCustomerCount": updateDetails.newCustomerCount,
            "repeastCustomerCount": updateDetails.repeastCustomerCount,
            "totalCustomerCount": updateDetails.totalCustomerCount,
            "remarks": updateDetails.remarks
        }
        ]
    };

    console.log(`update walkin Request`,Request)
    const APIURL = `${config.REACT_APP_API_URL}/ReactServiceJewels/UpdateWalkinDetails`
    try {
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log(`update walkin Response`,response)    
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default callUpdateUser