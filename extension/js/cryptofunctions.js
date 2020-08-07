const FAILED_DECRYPTION = "[[PS: message decryption failed]]";
const FAILED_ENCRYPTION = "[[PS: message encryption failed]]";
var activeKey;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === MT_UPDATED_KEY){
        activeKey = request.newValue;
        if(typeof reprocessMessages !== "undefined"){
            console.log(getMessage(MSG_KEY_KEY_UPDATE_REPROCESS));
            reprocessMessages();
        }
        sendResponse(MSG_OBJ_SUCCESS);
    }
});

const getActiveKey = function(callback){
    chrome.storage.sync.get([STKEY_ACTIVE_KEY], function(result){
        activeKey = result[STKEY_ACTIVE_KEY];
        if(callback != null){
            callback();
        }
    });
}

const getDecryptedMessage = function(encryptedHex, key){
    return performCryptoOperation(encryptedHex, key, "decrypt");
}

const getEncryptedMessage = function(plainText, key){
    return performCryptoOperation(plainText, key, "encrypt");
}

const performCryptoOperation = function(inputText, key, operation){
    if(key === null){
        key = activeKey;
    }
    let key_256 = get256BitKey(key);
    try{
        let aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(COUNTER_VAL));
        if(operation === "encrypt"){
            let inputBytes = aesjs.utils.utf8.toBytes(inputText);
            let encryptedBytes = aesCtr.encrypt(inputBytes);
            let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return ENC_PREFIX + encryptedHex + ENC_SUFFIX;
        } else{
            let inputBytes = aesjs.utils.hex.toBytes(inputText);
            let decryptedBytes = aesCtr.decrypt(inputBytes);
            let plainText = aesjs.utils.utf8.fromBytes(decryptedBytes);
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

const get256BitKey = function(key){
    return sha256.array((typeof key !== "undefined" ? key : ""));
}

getActiveKey(null);
