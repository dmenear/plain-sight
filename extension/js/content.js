const mutationObserverConfig = { characterData: true, childList: true, subtree: true };
var autoDecrypt;
var hightlightColor;
var fontColor;

const mutationObserved = function(mutations, observer){
    if(autoDecrypt){
        for(let mutation of mutations){
            let mutationElement = mutation.target.parentElement;
            if(mutationElement.getElementsByTagName("*").length > 0){
                decryptMessages(mutationElement)();
            }
        }
    }
}

const tagDecryptedMessage = function(encryptedMessage, decryptedMessage){
    return "<span title='Decrypted by PlainSight' class='psDecryptedMessage' data-ps-encrypted='" + encryptedMessage + "'>" + escapeHTML(decryptedMessage) + "</span>";
}

const decryptMessages = function(rootElement){
    return function() {
        let allElements = rootElement.getElementsByTagName("*");
        for(let element of allElements){
            for(let node of element.childNodes){
                if(node.nodeType === 3 && node.nodeValue.search(msgPattern) >= 0 && !node.parentElement.isContentEditable){
                    let parentElement = node.parentElement;
                    while(parentElement.innerHTML.search(msgPattern) >= 0){
                        let match = msgPattern.exec(parentElement.innerHTML);
                        parentElement.innerHTML = parentElement.innerHTML.replace(msgPattern, tagDecryptedMessage(match[1], getDecryptedMessage(match[1], null)));
                        updateColors();
                    }
                }
            }
        }
    }
}

const updateColors = function(){
    let decryptedMessageTags = document.getElementsByClassName("psDecryptedMessage");
    for(let messageTag of decryptedMessageTags){
        messageTag.style.color = fontColor;
        messageTag.style.backgroundColor = hightlightColor;
    }
}

const reprocessMessages = function(){
    let decryptedMessageTags = document.getElementsByClassName("psDecryptedMessage");
    for(let messageTag of decryptedMessageTags){
        let encryptedText = messageTag.getAttribute("data-ps-encrypted");
        messageTag.innerHTML = escapeHTML(getDecryptedMessage(encryptedText, null));
        updateColors();
    }
}

const revertPage = function(){
    let decryptedMessageTags = document.getElementsByClassName("psDecryptedMessage");
    for(let i = decryptedMessageTags.length - 1; i >= 0; i--){
        messageTag = decryptedMessageTags[i];
        let encryptedText = messageTag.getAttribute("data-ps-encrypted");
        let originalValue = "443{" + encryptedText + "}336";
        messageTag.parentNode.replaceChild(document.createTextNode(originalValue), messageTag);
    }
}

const encryptSelectedInput = function(){
    let selectedText = window.getSelection().toString();
    if(selectedText.length > 0){
        document.execCommand("insertText", false, getEncryptedMessage(selectedText, null));
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === "fullDecrypt"){
        getActiveKey(reprocessMessages);
        getActiveKey(decryptMessages(document.body));
        sendResponse({message: "success"});
    } else if(request.messageType === "revertPage"){
        if(!autoDecrypt){
            revertPage();
            sendResponse({message: "success"});
        } else{
            alert(getMessage("revertPageFailed"));
            sendResponse({message: "failure"});
        }  
    } else if(request.messageType === "updatedAutoDecrypt"){
        autoDecrypt = request.newValue;
        if(autoDecrypt){
            decryptMessages(document.body)();
        }
        sendResponse({message: "success"});
    } else if(request.messageType === "updatedHightlightColor"){
        hightlightColor = request.newValue;
        updateColors();
        sendResponse({message: "success"});
    } else if(request.messageType === "updatedFontColor"){
        fontColor = request.newValue;
        updateColors();
        sendResponse({message: "success"});
    } else if (request.messageType === "reprocess"){
        getActiveKey(reprocessMessages);
        sendResponse({message: "success"});
    } else if(request.messageType === "encryptSelectedInput"){
        encryptSelectedInput();
        sendResponse({message: "success"});
    } else if(request.messageType === "heartbeat"){
        sendResponse({message: "alive"});
    }
});

chrome.storage.sync.get(["autoDecrypt"], function(result){
    autoDecrypt = result["autoDecrypt"];
    if(autoDecrypt){
        decryptMessages(document.body)();
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
observer.observe(document.body, mutationObserverConfig);

chrome.runtime.sendMessage({
    messageType: "extensionActivated"
});