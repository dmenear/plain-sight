const activeKeyTextBox = document.getElementById("plainSightActiveKey");
const encryptButton = document.getElementById("btnEncrypt");
const refreshButton = document.getElementById("btnRefresh");
const toEncryptTextArea = document.getElementById("txtAreaToEncrypt");
const encryptedTextArea = document.getElementById("txtAreaEncrypted");

const updateKey = function(newKey){
    chrome.storage.sync.set({"activeKey": newKey}, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageType: "updatedKey", newKeyVal: newKey}, function(response){
                console.log("Content update sent. Response: " + response.message);
            });
        });
    });
}

const resetEncryptTextArea = function(){
    encryptButton.disabled = false;
    encryptButton.innerHTML = "Encrypt";
}

activeKeyTextBox.addEventListener("keyup", function() {
    updateKey(activeKeyTextBox.value);
    resetEncryptTextArea();
});


encryptButton.addEventListener("click", function(){
    var encryptText = document.getElementById("txtAreaToEncrypt").value;
    if(encryptText.length > 0){
        encryptedTextArea.value = getEncryptedMessage(encryptText, activeKeyTextBox.value);
        encryptedTextArea.select();
        document.execCommand("copy");
        encryptButton.innerHTML = "Copied to Clipboard";
        encryptButton.disabled = true;
    }
});

refreshButton.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
});

toEncryptTextArea.addEventListener("keyup", function(){
    resetEncryptTextArea();
})

chrome.storage.sync.get(["activeKey"], function(result){
    activeKeyTextBox.value = typeof result["activeKey"] !== "undefined" ? result["activeKey"] : "";
});