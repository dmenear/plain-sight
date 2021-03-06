const mutationObserverConfig = { characterData: true, childList: true, subtree: true };
var autoDecrypt;
var hightlightColor;
var fontColor;

const mutationObserved = function(mutations, observer){
    if(autoDecrypt){
        for(let mutation of mutations){
            let mutationElement = mutation.target.parentElement;
            if(mutationElement != null && mutationElement.getElementsByTagName("*").length > 0){
                decryptMessages(mutationElement)();
            }
        }
    }
}

const tagDecryptedMessage = function(encryptedMessage, decryptedMessage){
    return "<span title='Decrypted by PlainSight' class='" + CLASS_DECRYPTED_MESSAGE + "' " + ATTR_ENCRYPTED_MESSAGE + "='" + encryptedMessage + "'>" + escapeHTML(decryptedMessage) + "</span>";
}

const decryptMessages = function(rootElement){
    return function() {
        let allElements = rootElement.getElementsByTagName("*");
        for(let element of allElements){
            for(let node of element.childNodes){
                if(node.nodeType === 3 && node.nodeValue.search(MSG_PATTERN) >= 0 && !node.parentElement.isContentEditable){
                    let parentElement = node.parentElement;
                    while(parentElement.innerHTML.search(MSG_PATTERN) >= 0){
                        let match = MSG_PATTERN.exec(parentElement.innerHTML);
                        parentElement.innerHTML = parentElement.innerHTML.replace(MSG_PATTERN, tagDecryptedMessage(match[1], getDecryptedMessage(match[1], null)));
                        updateColors();
                    }
                }
            }
        }
    }
}

const updateColors = function(){
    let decryptedMessageTags = document.getElementsByClassName(CLASS_DECRYPTED_MESSAGE);
    for(let messageTag of decryptedMessageTags){
        messageTag.style.color = fontColor;
        messageTag.style.backgroundColor = hightlightColor;
    }
}

const reprocessMessages = function(){
    let decryptedMessageTags = document.getElementsByClassName(CLASS_DECRYPTED_MESSAGE);
    for(let messageTag of decryptedMessageTags){
        let encryptedText = messageTag.getAttribute(ATTR_ENCRYPTED_MESSAGE);
        messageTag.innerHTML = escapeHTML(getDecryptedMessage(encryptedText, null));
    }
}

const revertPage = function(){
    let decryptedMessageTags = document.getElementsByClassName(CLASS_DECRYPTED_MESSAGE);
    for(let i = decryptedMessageTags.length - 1; i >= 0; i--){
        messageTag = decryptedMessageTags[i];
        let encryptedText = messageTag.getAttribute(ATTR_ENCRYPTED_MESSAGE);
        let originalValue = ENC_PREFIX + encryptedText + ENC_SUFFIX;
        messageTag.parentNode.replaceChild(document.createTextNode(originalValue), messageTag);
    }
}

const encryptSelectedInput = function(){
    let selectedText = window.getSelection().toString();
    if(selectedText.length > 0){
        document.execCommand("insertText", false, getEncryptedMessage(selectedText, null));
    }
}

const refreshSettingsAndRun = function(functionToRun){
    return function(){
        chrome.storage.sync.get([STKEY_AUTO_DECRYPT], function(result){
            autoDecrypt = result[STKEY_AUTO_DECRYPT];
            chrome.storage.sync.get([STKEY_HIGHLIGHT_COLOR], function(result){
                hightlightColor = result[STKEY_HIGHLIGHT_COLOR];
                chrome.storage.sync.get([STKEY_FONT_COLOR], function(result){
                    fontColor = result[STKEY_FONT_COLOR];
                    updateColors();
                    if(functionToRun != null){
                        functionToRun();
                    }
                });
            });
        });
    };
}

const initialize = function(){
    const observer = new MutationObserver(mutationObserved);
    observer.observe(document.body, mutationObserverConfig);

    if(autoDecrypt){
        decryptMessages(document.body)();
    }
    
    chrome.runtime.sendMessage({
        messageType: MT_EXTENSION_ACTIVATED
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    getActiveKey(refreshSettingsAndRun(reprocessMessages));
    if(request.messageType === MT_DECRYPT_PAGE){
        getActiveKey(refreshSettingsAndRun(decryptMessages(document.body)));
        sendResponse(MSG_OBJ_SUCCESS);
    } else if(request.messageType === MT_REVERT_PAGE){
        refreshSettingsAndRun(function(){
            if(!autoDecrypt){
                revertPage();
                sendResponse(MSG_OBJ_SUCCESS);
            } else{
                alert(getMessage(MSG_KEY_REVERT_PAGE_FAILED));
                sendResponse(MSG_OBJ_FAILURE);
            }  
        })();
    } else if(request.messageType === MT_UPDATED_AUTO_DECRYPT){
        autoDecrypt = request.newValue;
        if(autoDecrypt){
            refreshSettingsAndRun(decryptMessages(document.body))();
        }
        sendResponse(MSG_OBJ_SUCCESS);
    } else if(request.messageType === MT_UPDATED_HIGHLIGHT_COLOR || request.messageType === MT_UPDATED_FONT_COLOR){
        refreshSettingsAndRun(updateColors)();
        sendResponse(MSG_OBJ_SUCCESS);
    } else if (request.messageType === MT_REPROCESS){
        sendResponse(MSG_OBJ_SUCCESS);
    } else if(request.messageType === MT_ENCRYPT_INPUT){
        encryptSelectedInput();
        sendResponse(MSG_OBJ_SUCCESS);
    } else if(request.messageType === MT_HEARTBEAT){
        sendResponse(MSG_OBJ_ALIVE);
    }
});

refreshSettingsAndRun(initialize)();