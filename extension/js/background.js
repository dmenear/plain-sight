const cssToInject = ["css/content.css"];
const scriptsToInject = ["js/sha256.min.js", "js/aes.js", "js/cryptofunctions.js", "js/common.js", "js/content.js"];

const activateExtension = function(tabId){
    chrome.tabs.sendMessage(tabId, {messageType: "heartbeat"}, function(){
        if(chrome.runtime.lastError){
            console.log("PlainSight: Injecting content scripts and CSS");

            for(let stylesheet of cssToInject){
                chrome.tabs.insertCSS({
                    file: stylesheet
                }, function(){
                    if(chrome.runtime.lastError){
                        console.log("PlainSight: Failed to inject CSS stylesheet: " + stylesheet);
                    }
                });
            }
            
            for(let script of scriptsToInject){
                chrome.tabs.executeScript({
                   file: script,
                   allFrames: true 
                }, function(){
                    if(chrome.runtime.lastError){
                        console.log("PlainSight: Failed to inject content script: " + script);
                    }
                });
            }
            return true;
        } else{
            return false;
        }
    })
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "force-decrypt",
        title: "Decrypt page",
    });

    chrome.contextMenus.create({
        id: "revert-page",
        title: "Revert page",
    });


    chrome.storage.sync.set({"autoDecrypt": false});
    chrome.storage.sync.set({"highlightColor": "#000000"});
    chrome.storage.sync.set({"fontColor": "#00ff00"});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if(activateExtension(tab.id)){
        return;
    }
    if (info.menuItemId == "force-decrypt") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageType: "fullDecrypt"}, function(tabs){
                if(chrome.runtime.lastError){
                    console.log("PlainSight: Content scripts are not injected in active tab.");
                } else{
                    console.log("PlainSight: Page decryption complete.");
                }
            });
        });
    } else if (info.menuItemId == "revert-page") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageType: "revertPage"}, function(tabs){
                if(chrome.runtime.lastError){
                    console.log("PlainSight: Content scripts are not injected in active tab.");
                } else{
                    console.log("PlainSight: Page revert complete.");
                }
            });
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo ,tab) {
    chrome.permissions.contains({
        permissions: ["tabs"],
        origins: ["*://*/*"]
    }, function(result) {
        if (result && changeInfo.status === "complete") {
            activateExtension(tabId);
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.messageType === "activateExtension"){
        activateExtension(request.tabId);
        sendResponse("complete");
    }
});
