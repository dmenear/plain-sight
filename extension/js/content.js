const config = { characterData: true, childList: true, subtree: true };
var autoDecrypt;
var hightlightColor;
var fontColor;

const mutationObserved = function(mutations, observer){
    if(autoDecrypt){
        decryptMessages(false);
    }
}

const tagDecryptedMessage = function(encryptedMessage, decryptedMessage){
    return "<span title='Decrypted by PlainSight' class='psDecryptedMessage' data-ps-encrypted='" + encryptedMessage + "'>" + decryptedMessage + "</span>";
}

const decryptMessages = function(fullDecrypt){
    var allElements = document.getElementsByTagName("*");
    for(let element of allElements){
        for(let node of element.childNodes){
            if(node.nodeType === 3 && node.nodeValue.search(msgPattern) >= 0 && (!node.parentElement.isContentEditable || fullDecrypt)){
                var parentElement = node.parentElement;
                while(parentElement.innerHTML.search(msgPattern) >= 0){
                    var match = msgPattern.exec(node.nodeValue);
                    parentElement.innerHTML = parentElement.innerHTML.replace(msgPattern, tagDecryptedMessage(match[1], getDecryptedMessage(match[1], null)));
                    updateColors();
                }
            }
        }
    }
}

const updateColors = function(){
    var decryptedMessageTags = document.getElementsByClassName("psDecryptedMessage");
    for(let messageTag of decryptedMessageTags){
        messageTag.style.color = fontColor;
        messageTag.style.backgroundColor = hightlightColor;
    }
}

const reprocessMessages = function(){
    var decryptedMessageTags = document.getElementsByClassName("psDecryptedMessage");
    for(let messageTag of decryptedMessageTags){
        var encryptedText = messageTag.getAttribute("data-ps-encrypted");
        messageTag.innerHTML = getDecryptedMessage(encryptedText, null);
        console.log(getDecryptedMessage(encryptedText, null));
        updateColors();
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === "fullDecrypt"){
        decryptMessages(true);
        sendResponse({message: "success"});
    } else if(request.messageType === "updatedAutoDecrypt"){
        autoDecrypt = request.newValue;
        if(autoDecrypt){
            decryptMessages(false);
        }
        sendResponse({message: "success"});
    } else if(request.messageType === "updatedHightlightColor"){
        hightlightColor = request.newValue;
        updateColors();
    } else if(request.messageType === "updatedFontColor"){
        fontColor = request.newValue;
        updateColors();
    }
});

chrome.storage.sync.get(["autoDecrypt"], function(result){
    autoDecrypt = result["autoDecrypt"];
    if(autoDecrypt){
        decryptMessages(false);
    }
});

chrome.storage.sync.get(["highlightColor"], function(result){
    hightlightColor = result["highlightColor"];
    updateColors();
});

chrome.storage.sync.get(["fontColor"], function(result){
    fontColor = result["fontColor"];
    updateColors();
});

const observer = new MutationObserver(mutationObserved);
observer.observe(document.body, config);