chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "force-decrypt",
        title: "Decrypt page",
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        if (info.menuItemId == "force-decrypt") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {messageType: "fullDecrypt"}, function(tabs){
                    console.log("PlainSight: Force decryption complete");
                });
            });
        }
    });

    chrome.storage.sync.set({"autoDecrypt": true}, function() {});
});