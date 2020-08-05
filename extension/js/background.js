const cssToInject = ["css/content.css"];
const scriptsToInject = ["js/sha256.min.js", "js/aes.js", "js/cryptofunctions.js", "js/common.js", "js/messages.js", "js/content.js"];

var queuedCommand = "";

const activateExtensionAndRunCommand = function(tabId, command){
    chrome.tabs.sendMessage(tabId, {messageType: "heartbeat"}, function(){
        if(chrome.runtime.lastError){
            console.log(getMessage("injectingFiles"));

            for(let stylesheet of cssToInject){
                chrome.tabs.insertCSS({
                    file: stylesheet
                }, function(){
                    if(chrome.runtime.lastError){
                        console.log(getMessage("stylesheetInjectionFailed") + stylesheet);
                    }
                });
            }
            
            for(let script of scriptsToInject){
                chrome.tabs.executeScript({
                   file: script,
                   allFrames: true 
                }, function(){
                    if(chrome.runtime.lastError){
                        console.log(getMessage("scriptInjectionFailed") + script);
                    }
                });
            }
            if(command !== null){
                queuedCommand = command;
            }
        } else{
            if(command !== null){
                processCommand(command);
            }
        }
    });
}

const sendMessageToActiveTab = function(messageType){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {messageType: messageType}, function(){
            if(chrome.runtime.lastError){
                console.log(getMessage("extensionInactive"));
            }
        });
    });
}

const processCommand = function(command){
    if (command == "force-decrypt") {
        sendMessageToActiveTab("fullDecrypt");
    } else if(command == "reprocess"){
        sendMessageToActiveTab("reprocess");
    }
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "force-decrypt",
        title: "Decrypt Page",
    });

    chrome.storage.sync.set({"autoDecrypt": true});
    chrome.storage.sync.set({"highlightColor": "#000000"});
    chrome.storage.sync.set({"fontColor": "#00ff00"});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    activateExtensionAndRunCommand(tab.id, info.menuItemId);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.messageType === "activateExtension"){
        activateExtensionAndRunCommand(request.tabId, "reprocess");
        sendResponse("complete");
    } else if(request.messageType === "extensionActivated"){
        console.log(getMessage("extensionActivated"));
        if(queuedCommand !== ""){
            processCommand(queuedCommand);
            queuedCommand = "";
        }
    }
});
