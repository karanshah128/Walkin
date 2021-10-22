import axios from 'axios';
import {  encryptionDataWithRandomKey, encryptHeader } from '../Common/Js/Encryption-Decryption';
import {  createHeaderForNewEncryption } from '../Common/Js/ApiRouter'
import { basicAuth } from '../Common/Js/basicAuth';


axios.interceptors.request.use(request => {
    try {
        const requestParams = JSON.parse(JSON.stringify(request.data));
        if (requestParams.stopIntercept) {
            return request;
        }
     
            let basicAuthVal = '';
        
                // basicAuthVal = basicAuth(config.userID);
              
                // basicAuthVal = 'Basic ' + basicAuthVal
            
                // basicAuthVal = config.basicAuth
            
            const encryptedData = encryptionDataWithRandomKey(request.data);
            request.data = encodeURIComponent(encryptedData.toString())
            const keyHeader = encryptHeader(encryptedData);
            request.headers = createHeaderForNewEncryption(keyHeader, basicAuthVal)
            return request;
       

    } catch (err) {
        console.error("Problem in parsing request data", err);
        return request;
    }
});


