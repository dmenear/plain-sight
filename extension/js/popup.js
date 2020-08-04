const activeKeyTextBox = document.getElementById("plainSightActiveKey");
const encryptButton = document.getElementById("btnEncrypt");
const decryptButton = document.getElementById("btnDecrypt");
const pageDecryptButton = document.getElementById("btnDecryptPage");
const pageRevertButton = document.getElementById("btnRevertPage");
const toEncryptTextArea = document.getElementById("txtAreaToEncrypt");
const encryptedTextArea = document.getElementById("txtAreaEncrypted");
const toDecryptTextArea = document.getElementById("txtAreaToDecrypt");
const decryptedTextArea = document.getElementById("txtAreaDecrypted");
const autoDecryptCheckbox = document.getElementById("chkAutoDecrypt");
const encryptTitleCell = document.getElementById("encryptTitleCell");
const decryptTitleCell = document.getElementById("decryptTitleCell");
const encryptForm = document.getElementById("encryptForm");
const decryptForm = document.getElementById("decryptForm");
const activeKeyCell = document.getElementById("activeKeyCell");
const decryptPageCell = document.getElementById("decryptPageCell");
const hightlightColorSelector = document.getElementById("hightlightColor");
const fontColorSelector = document.getElementById("fontColor");
const sampleDecryptedText = document.getElementById("sampleDecrypted");

const updateKey = function(newKey){
    updateContentValue("activeKey", newKey, "updatedKey");
}

const updateAutoDecrypt = function(newValue){
    updateContentValue("autoDecrypt", newValue, "updatedAutoDecrypt");
}

const updateContentValue = function(key, value, messageType){
    chrome.storage.sync.set({[key]: value}, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageType: messageType, newValue: value}, function(response){
                if(chrome.runtime.lastError){
                    console.log("PlainSight: No content update sent. Content scripts are not injected in active tab.");
                } else{
                    console.log("PlainSight: Content update sent. Response: " + response.message);
                }
            });
        });
    });
}

const encryptMessage = function(){
    var encryptText = document.getElementById("txtAreaToEncrypt").value;
    if(encryptText.length > 0){
        encryptedTextArea.value = getEncryptedMessage(encryptText, activeKeyTextBox.value);
        encryptedTextArea.select();
        document.execCommand("copy");
        encryptButton.innerHTML = "Copied to Clipboard";
        encryptButton.disabled = true;
    }
}

const decryptMessage = function(){
    var decryptText = document.getElementById("txtAreaToDecrypt").value;
    if(decryptText.search(msgPattern) >= 0){
        var match = msgPattern.exec(decryptText);
        decryptedTextArea.value = getDecryptedMessage(match[1], activeKeyTextBox.value);
        decryptedTextArea.focus();
    }
}

const resetEncryptTextArea = function(){
    encryptButton.disabled = false;
    encryptButton.innerHTML = "Encrypt";
}

const updateAutoDecryptUI = function(){
    if(autoDecryptCheckbox.checked){
        activeKeyCell.colSpan = "2";
        activeKeyCell.style.textAlign = "center";
        decryptPageCell.style.display = "none";
    } else{
        activeKeyCell.colSpan = "1";
        activeKeyCell.style.textAlign = "left";
        decryptPageCell.style.display = "table-cell";
    }
}

activeKeyTextBox.addEventListener("keyup", function() {
    updateKey(activeKeyTextBox.value);
    resetEncryptTextArea();
});

autoDecryptCheckbox.addEventListener("change", function() {
    updateAutoDecrypt(autoDecryptCheckbox.checked);
    updateAutoDecryptUI();
});

encryptTitleCell.addEventListener("click", function() {
    decryptTitleCell.style.color = "lightgray";
    decryptTitleCell.style.cursor = "pointer";
    encryptTitleCell.style.color = "black";
    encryptTitleCell.style.cursor = "auto";
    decryptForm.style.display = "none";
    encryptForm.style.display = "table";
});

decryptTitleCell.addEventListener("click", function() {
    encryptTitleCell.style.color = "lightgray";
    encryptTitleCell.style.cursor = "pointer";
    decryptTitleCell.style.color = "black";
    decryptTitleCell.style.cursor = "auto";
    encryptForm.style.display = "none";
    decryptForm.style.display = "table";
});

encryptButton.addEventListener("click", function(){
    encryptMessage();
});

decryptButton.addEventListener("click", function(){
    decryptMessage();
});

pageDecryptButton.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {messageType: "fullDecrypt"}, function(tabs){
            if(chrome.runtime.lastError){
                console.log("PlainSight: Content scripts are not injected in active tab.");
            } else{
                console.log("PlainSight: Page decryption complete.");
            }
        });
    });
});

pageRevertButton.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {messageType: "revertPage"}, function(tabs){
            if(chrome.runtime.lastError){
                console.log("PlainSight: Content scripts are not injected in active tab.");
            } else{
                console.log("PlainSight: Revert page complete.");
            }
        });
    });
});

toEncryptTextArea.addEventListener("keyup", function(){
    resetEncryptTextArea();
});

toEncryptTextArea.addEventListener("keydown", function(event){
    if(event.keyCode == 13){
        encryptMessage();
    }
});

toDecryptTextArea.addEventListener("keydown", function(event){
    if(event.keyCode == 13){
        decryptMessage();
    }
});

hightlightColorSelector.addEventListener("input", function(){
    sampleDecryptedText.style.backgroundColor = hightlightColorSelector.value;
});

hightlightColorSelector.addEventListener("change", function(){
    updateContentValue("highlightColor", hightlightColorSelector.value, "updatedHightlightColor");
});

fontColorSelector.addEventListener("input", function(){
    sampleDecryptedText.style.color = fontColorSelector.value;
});

fontColorSelector.addEventListener("change", function(){
    updateContentValue("fontColor", fontColorSelector.value, "updatedFontColor");
});

chrome.storage.sync.get(["activeKey"], function(result){
    activeKeyTextBox.value = typeof result["activeKey"] !== "undefined" ? result["activeKey"] : "";
});

chrome.storage.sync.get(["autoDecrypt"], function(result){
    autoDecryptCheckbox.checked = result["autoDecrypt"];
    updateAutoDecryptUI();
});

chrome.storage.sync.get(["highlightColor"], function(result){
    hightlightColorSelector.value = result["highlightColor"];
    sampleDecryptedText.style.backgroundColor = result["highlightColor"];
});

chrome.storage.sync.get(["fontColor"], function(result){
    fontColorSelector.value = result["fontColor"];
    sampleDecryptedText.style.color = result["fontColor"];
});