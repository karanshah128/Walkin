import * as CryptoJS from 'crypto-js';
import * as constants from './constant';
import JSEncrypt from 'jsencrypt';
 import config from '../../config';
const PK=constants.publickey;


export function encryptionDataWithRandomKey(toEncrypt) {
    var secretPhrase = CryptoJS.lib.WordArray.random(8);
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
   
    var aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
        keySize: 128 / 32
    });
    var iv = CryptoJS.enc.Utf8.parse(config.guid.slice(0, 16));
    var aesOptions = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv };
    var aesEncTrans = CryptoJS.AES.encrypt(JSON.stringify(toEncrypt), aesKey, aesOptions);
    return aesEncTrans;

};


export function encryptHeader(toEncrypt, relativeOrAbsolutePathToPublicKey,userId,aesEncTrans) {
    
    var rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(relativeOrAbsolutePathToPublicKey);
    var rsaEncryptedAesKey = rsaEncrypt.encrypt(aesEncTrans.key.toString());
    return rsaEncryptedAesKey;
};









export function decryptData(data) {

    var dataValue = decodeURIComponent(data);
    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');

    var decrypted = CryptoJS.AES.decrypt(dataValue, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var jsonString = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    return jsonString;

}





