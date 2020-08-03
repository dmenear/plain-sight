const config = { characterData: true, childList: true, subtree: true };
const msgPattern = /443\{(.+)\}336/g;
var autoDecrypt;

const mutationObserved = function(mutations, observer){
    if(autoDecrypt){
        decryptMessages(false);
    }
}

const decryptMessages = function(fullDecrypt){
    var allElements = document.getElementsByTagName("*");
    for(let element of allElements){
        for(let node of element.childNodes){
            if(node.nodeType === 3 && node.nodeValue.search(msgPattern) >= 0 && (!node.parentElement.isContentEditable || fullDecrypt)){
                var match = msgPattern.exec(node.nodeValue);
                var updatedText = node.nodeValue.replace(msgPattern, getDecryptedMessage(match[1], null));
                element.replaceChild(document.createTextNode(updatedText), node);
            }
        }
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === "fullDecrypt"){
        decryptMessages(true);
        sendResponse({message: "success"});
    } else if(request.messageType === "updatedAutoDecrypt"){
        autoDecrypt = request.enabled;
        if(autoDecrypt){
            decryptMessages(false);
        }
        sendResponse({message: "success"});
    }
});

chrome.storage.sync.get(["autoDecrypt"], function(result){
    autoDecrypt = result["autoDecrypt"];
    if(autoDecrypt){
        decryptMessages(false);
    }
});

const observer = new MutationObserver(mutationObserved);
observer.observe(document.body, config);