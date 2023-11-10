const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");

export const hashPassword = (password) => {
    return SHA256(password).toString(CryptoJS.enc.Hex);
};
