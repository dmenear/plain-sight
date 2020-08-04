chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "force-decrypt",
        title: "Decrypt page",
    });

    chrome.storage.sync.set({"autoDecrypt": true}, function() {});
    chrome.storage.sync.set({"highlightColor": "#000000"}, function() {});
    chrome.storage.sync.set({"fontColor": "#00ff00"}, function() {});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
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
    }
});