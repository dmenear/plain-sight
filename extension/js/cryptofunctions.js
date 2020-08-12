const FAILED_DECRYPTION = "[[PS: Message decryption failed!]]";
const FAILED_ENCRYPTION = "[[PS: Message encryption failed!]]";
const ALREADY_ENCRYPTED = "[[PS: You cannot encrypt messages that have already been encrypted!]]";

var activeKey;

const getActiveKey = function(callback){
    chrome.storage.sync.get([STKEY_ACTIVE_KEY], function(result){
        activeKey = result[STKEY_ACTIVE_KEY];
        if(callback != null){
            callback();
        }
    });
}

const getDecryptedMessage = function(encryptedHex){
    return performCryptoOperation(encryptedHex, "decrypt");
}

const getEncryptedMessage = function(plainText){
    return performCryptoOperation(plainText, "encrypt");
}

const performCryptoOperation = function(inputText, operation){
    let keyBytes = aesjs.utils.hex.toBytes(activeKey);
    try{
        if(operation === "encrypt"){
            if(inputText.search(MSG_PATTERN) >= 0){
                return ALREADY_ENCRYPTED;
            }
            let iv = generateIV();
            console.log(iv);
            let aesCtr = new aesjs.ModeOfOperation.cbc(keyBytes, iv);
            let inputBytes = padInput(aesjs.utils.utf8.toBytes(inputText));
            let encryptedBytes = aesCtr.encrypt(inputBytes);
            let ivHex = aesjs.utils.hex.fromBytes(iv)
            let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return ENC_PREFIX + ivHex.substring(0, 16) + encryptedHex + ivHex.substring(16, 32) + ENC_SUFFIX;
        } else{
            let iv = aesjs.utils.hex.toBytes(inputText.substring(0, 16) + inputText.substring(inputText.length - 16, inputText.length));
            console.log(iv);
            let aesCtr = new aesjs.ModeOfOperation.cbc(keyBytes, iv);
            let inputBytes = aesjs.utils.hex.toBytes(inputText.substring(16, inputText.length - 16));
            let decryptedBytes = aesCtr.decrypt(inputBytes);
            let plainText = aesjs.utils.utf8.fromBytes(removePadding(decryptedBytes));
            return plainText;
        }
    } catch(err){
        console.log(err);
        if(operation === "encrypt"){
            return FAILED_ENCRYPTION;
        } else{
            return FAILED_DECRYPTION;
        }
        
    }
}

const padInput = function(inputBytes) {
    if(inputBytes.length % 16 !== 0){
        let padBytes = 16 - (inputBytes.length % 16);
        let newInputBytes = new Uint8Array(inputBytes.length + padBytes);
        for(let i = 0; i < inputBytes.length; i++){
            newInputBytes[i] = inputBytes[i];
        }
        for(let i = inputBytes.length; i < inputBytes.length + padBytes; i++){
            newInputBytes[i] = 0;
        }
        return newInputBytes;
    } else{
        return inputBytes;
    }
}

const removePadding = function(inputBytes) {
    if(inputBytes[inputBytes.length - 1] == 0){
        let endPosition = inputBytes.length - 1;
        while(inputBytes[endPosition - 1] == 0){
            endPosition--;
        }
        let newInputBytes = new Uint8Array(endPosition);
        for(let i = 0; i < newInputBytes.length; i++){
            newInputBytes[i] = inputBytes[i];
        }
        return newInputBytes;
    } else{
        return inputBytes;
    }
}

const generateIV = function() {
    let ivOutput = new Uint8Array(16);
    window.crypto.getRandomValues(ivOutput);
    return ivOutput;
}

const generateHashKey = function(key){
    return aesjs.utils.hex.fromBytes(scrypt.syncScrypt(aesjs.utils.utf8.toBytes(key), aesjs.utils.utf8.toBytes("PlAiNsIgHt"), 2048, 8, 1, 24));
}

getActiveKey(null);
