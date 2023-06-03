// 使用 crypto-js 进行 AES 加密、解密
import CryptoJS from 'crypto-js';
import { originKey, originIv } from './key';

const key = CryptoJS.enc.Utf8.parse(originKey); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse(originIv); //十六位十六进制数作为密钥偏移量

//加密方法
export const Encrypt = (word: string) => {
    const password = CryptoJS.enc.Utf8.parse(word);
    const encrypt = CryptoJS.AES.encrypt(password, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
    })
    const encryptStr = encrypt.ciphertext.toString(CryptoJS.enc.Base64);
    return encryptStr;
}

//解密方法
export const Decrypt = (word: string) => {
    const decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    console.log(decryptedStr.toString());
    return decryptedStr.toString();
}