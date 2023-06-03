// AES 加密、解密
const crypto = require('crypto');
const kv = require('./key');

const key = kv.originKey;
const iv = kv.originIv;

// 加密
const encode = (src) => {
    let sign = "";
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    sign += cipher.update(src, "utf8", "base64");
    sign += cipher.final("base64");
    return sign;
}

// 解密
const decode = (sign) => {
    let src = "";
    const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    src += cipher.update(sign, "base64", "utf8");
    src += cipher.final("utf8");
    return src;
}

module.exports = {
    encode,
    decode,
}