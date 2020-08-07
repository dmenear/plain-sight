var activeKey;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === "updatedKey"){
        activeKey = request.newValue;
        sendResponse({message: "success"});
        if(typeof reprocessMessages !== "undefined"){
            console.log("PlainSight: Key updated, reprocessing messages");
            reprocessMessages();
        }
    }
});

const getActiveKey = function(callback){
    chrome.storage.sync.get(["activeKey"], function(result){
        activeKey = result["activeKey"];
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
        let aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(counterVal));
        if(operation === "encrypt"){
            let inputBytes = aesjs.utils.utf8.toBytes(inputText);
            let encryptedBytes = aesCtr.encrypt(inputBytes);
            let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return "443{" + encryptedHex + "}336";
        } else{
            let inputBytes = aesjs.utils.hex.toBytes(inputText);
            let decryptedBytes = aesCtr.decrypt(inputBytes);
            let plainText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            return plainText;
        }
    } catch(err){
        console.log(err);
        if(operation === "encrypt"){
            return failedEncryption;
        } else{
            return failedDecryption;
        }
        
    }
}

const get256BitKey = function(key){
    return sha256.array((typeof key !== "undefined" ? key : ""));
}

getActiveKey(null);
