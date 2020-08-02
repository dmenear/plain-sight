/*chrome.contextMenus.create({
    id: "encrypt-selection",
    title: "Encrypt selection",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "encrypt-selection") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageType: "encrypt"}, function(tabs){
                console.log("Encryption complete");
            });
        });
    }
});*/