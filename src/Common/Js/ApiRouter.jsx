import axios from 'axios';
import React from "react";
import { decryptData,  encryptHeader, encryptionDataWithRandomKey } from './Encryption-Decryption';
import * as constants from './constant';
import config from '../../config'


class APIRouter extends React.Component {

  async postApiCalNewEncryption(Request, ApiName) {

    var encryptedData = encryptionDataWithRandomKey(Request,constants.publickey,config.userId,config.guid);
    var keyHeader = encryptHeader(Request, constants.publickey, config.userId, encryptedData);
 
    try {

      const options = {
        headers: this.createHeaderForNewEncryption(keyHeader)
      };
      return await axios.post(ApiName,
        encodeURIComponent(encryptedData.toString()),
        options,
        { timeout: constants.apiTimeOut }).then(Response => {

          return decryptData(Response.data.replace(/"/g, ""));
        }).catch(err => {
          let statusCode=     constants.getErrorMsgCode(err);
          return statusCode;
        })
    }
    catch (e) {
      let statusCode=     constants.getErrorMsgCode(e);
          return statusCode;
    }
  }

  createHeaderForNewEncryption(header) {
    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      Authorization: config.basicAuthVal,
      Guid: config.guid,
      STOREID:config.storeId,
      KEY: header,
     
    }

    return rquestHeader;
  }



 

}
export default (APIRouter);

