const failedDecryption = "[[PS: message decryption failed]]";
const failedEncryption = "[[PS: message encryption failed]]";
var counterVal = 17;
var activeKey;
chrome.storage.sync.get(["activeKey"], function(result){
    activeKey = result["activeKey"];
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === "updatedKey"){
        activeKey = request.newKeyVal;
        console.log("Plain Sight key updated");
        sendResponse({message: "success"});
    }
});

const getDecryptedMessage = function(encryptedHex, key){
    if(key === null){
        key = activeKey;
    }
    var key_256 = get256BitKey(key);
    try{
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(counterVal));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var plainText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return plainText;
    } catch(err){
        console.log(err);
        return failedDecryption;
    }
}

const getEncryptedMessage = function(plainText, key){
    if(key === null){
        key = activeKey;
    }
    var key_256 = get256BitKey(key);
    try{
        var textBytes = aesjs.utils.utf8.toBytes(plainText);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(counterVal));
        var encryptedBytes = aesCtr.encrypt(textBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return "443{" + encryptedHex + "}336";
    } catch(err){
        console.log(err);
        return failedEncryption;
    }
}

const get256BitKey = function(key){
    return sha256.array((typeof key !== "undefined" ? key : ""));
}