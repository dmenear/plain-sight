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
    var key_256 = get256BitKey(key);
    try{
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(counterVal));
        if(operation === "encrypt"){
            var inputBytes = aesjs.utils.utf8.toBytes(inputText);
            var encryptedBytes = aesCtr.encrypt(inputBytes);
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return "443{" + encryptedHex + "}336";
        } else{
            var inputBytes = aesjs.utils.hex.toBytes(inputText);
            var decryptedBytes = aesCtr.decrypt(inputBytes);
            var plainText = aesjs.utils.utf8.fromBytes(decryptedBytes);
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
