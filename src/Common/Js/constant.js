export const publickey='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCc+UXdQqm/CxgMIZX/9/isWS3sgbE8Gc2eP1/9KH1gxp7GTLZTI8eSRMHYOIu3aXEPQ1lMiiMXHG3avrS7vYDqAkuQym2ivqOU7YdupmJ6m/9qxY0GPDCT5nkqLI2K8EIkZEMKeI2s9sHUG8PWQH5nYRk4bTdKT+FlYW9HmwUx3QIDAQAB';

export const apiTimeOut=90000;


export function getErrorMsgCode(msg1) {
    let msg = msg1.toString();
    if (msg.search("400") !== -1) {
      return "400"
    }

    else if (msg.search("401") !== -1) {
      return "401";
    }
    else if (msg.search("408") !== -1) {
      return "408";
    }
    else if (msg.search("500") !== -1) {
      return "500";
    }
    else if (msg.search("502") !== -1) {
      return "502";
    }
    else if (msg.search("503") !== -1) {
      return "503";
    }
    else if (msg.search("504") !== -1) {
      return "504";
    }
    else if (msg.search("Network Error") !== -1) {
      return "1001";
    }
    else {
      return "1000";
    }


  }
