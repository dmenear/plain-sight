// Elements from popup
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
const activeKeyCell = document.getElementById("activeKeyCell");
const encryptTitleCell = document.getElementById("encryptTitleCell");
const decryptPageCell = document.getElementById("decryptPageCell");
const decryptTitleCell = document.getElementById("decryptTitleCell");
const encryptForm = document.getElementById("encryptForm");
const decryptForm = document.getElementById("decryptForm");
const sampleDecryptedText = document.getElementById("sampleDecrypted");
const autoDecryptLabel = document.getElementById("lblAutoDecrypt");

// Variables
var shiftPressed = false;

// Functions
const updateKey = function(newValue){
    updateContentValue(STKEY_ACTIVE_KEY, newValue, MT_UPDATED_KEY);
}

const updateAutoDecrypt = function(newValue){
    updateContentValue(STKEY_AUTO_DECRYPT, newValue, MT_UPDATED_AUTO_DECRYPT);
}

const updateContentValue = function(key, value, messageType){
    chrome.storage.sync.set({[key]: value}, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageType: messageType, newValue: value}, function(response){
                if(chrome.runtime.lastError){
                    console.log(getMessage(MSG_KEY_CONTENT_UPDATE_FAIL));
                } else{
                    console.log(getMessage(MSG_KEY_CONTENT_UPDATE_SUCCESS) + response.message);
                }
            });
        });
    });
}

const encryptMessage = function(){
    let encryptText = toEncryptTextArea.value;
    if(encryptText.length > 0){
        encryptedTextArea.value = getEncryptedMessage(encryptText, activeKeyTextBox.value);
        encryptedTextArea.select();
        document.execCommand("copy");
        encryptButton.innerHTML = "Copied to Clipboard";
        encryptButton.disabled = true;
    }
}

const decryptMessage = function(){
    let decryptText = toDecryptTextArea.value;
    if(decryptText.search(MSG_PATTERN) >= 0){
        let match = MSG_PATTERN.exec(decryptText);
        decryptedTextArea.value = getDecryptedMessage(match[1], activeKeyTextBox.value);
        decryptedTextArea.focus();
    }
}

const resetEncryptTextArea = function(){
    encryptButton.disabled = false;
    encryptButton.innerHTML = "Encrypt";
    encryptedTextArea.value = "";
}

const resetDecryptTextArea = function(){
    decryptedTextArea.value = "";
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

const updateTextAreasBackgroundColor = function(newColor){
    let textAreas = document.getElementsByTagName("TEXTAREA");
    for(let textArea of textAreas){
        textArea.style.backgroundColor = newColor;
    }
}

const updateTextAreasFontColor = function(newColor){
    let textAreas = document.getElementsByTagName("TEXTAREA");
    for(let textArea of textAreas){
        textArea.style.color = newColor;
    }
}

const highlightColorInput = function(){
    sampleDecryptedText.style.backgroundColor = this.toHEXString();
}

const highlightColorChange = function(){
    updateContentValue(STKEY_HIGHLIGHT_COLOR, this.toHEXString(), MT_UPDATED_HIGHLIGHT_COLOR);
    updateTextAreasBackgroundColor(this.toHEXString());
}

const fontColorInput = function(){
    sampleDecryptedText.style.color = this.toHEXString();
}

const fontColorChange = function(){
    updateContentValue(STKEY_FONT_COLOR, this.toHEXString(), MT_UPDATED_FONT_COLOR);
    updateTextAreasFontColor(this.toHEXString());
}

// Event listeners
document.body.addEventListener("keydown", function(event){
    if(event.keyCode == 16){
        shiftPressed = true;
    }
})

document.body.addEventListener("keyup", function(event){
    if(event.keyCode == 16){
        shiftPressed = false;
    }
})

activeKeyTextBox.addEventListener("keyup", function(event) {
    updateKey(activeKeyTextBox.value);
    resetEncryptTextArea();
    resetDecryptTextArea();
    if(event.keyCode == 13){
        activeKeyTextBox.blur();
    }
});

autoDecryptCheckbox.addEventListener("change", function() {
    updateAutoDecrypt(autoDecryptCheckbox.checked);
    updateAutoDecryptUI();
});

encryptTitleCell.addEventListener("click", function() {
    decryptTitleCell.style.color = "#b5b5b5";
    decryptTitleCell.style.cursor = "pointer";
    encryptTitleCell.style.color = "black";
    encryptTitleCell.style.cursor = "auto";
    decryptForm.style.display = "none";
    encryptForm.style.display = "table";
});

decryptTitleCell.addEventListener("click", function() {
    encryptTitleCell.style.color = "#b5b5b5";
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
    sendMessageToActiveTab(MT_DECRYPT_PAGE);
});

pageRevertButton.addEventListener("click", function() {
    sendMessageToActiveTab(MT_REVERT_PAGE);
});

toEncryptTextArea.addEventListener("keyup", function(){
    resetEncryptTextArea();
});

toDecryptTextArea.addEventListener("keyup", function(){
    resetDecryptTextArea();
});

toEncryptTextArea.addEventListener("keydown", function(event){
    if(event.keyCode == 13 && !shiftPressed){
        encryptMessage();
    }
});

toDecryptTextArea.addEventListener("keydown", function(event){
    if(event.keyCode == 13 && !shiftPressed){
        decryptMessage();
    }
});

// Initialize
const highlightColorPicker = new JSColor("#highlightColorPicker");
highlightColorPicker.option("width", 120);
highlightColorPicker.option("onInput", highlightColorInput);
highlightColorPicker.option("onChange", highlightColorChange);

const fontColorPicker = new JSColor("#fontColorPicker");
fontColorPicker.option("width", 120);
fontColorPicker.option("onInput", fontColorInput);
fontColorPicker.option("onChange", fontColorChange);

chrome.storage.sync.get([STKEY_ACTIVE_KEY], function(result){
    activeKeyTextBox.value = result[STKEY_ACTIVE_KEY];
});

chrome.storage.sync.get([STKEY_AUTO_DECRYPT], function(result){
    autoDecryptCheckbox.checked = result[STKEY_AUTO_DECRYPT];
    updateAutoDecryptUI();
});

chrome.storage.sync.get([STKEY_HIGHLIGHT_COLOR], function(result){
    let highlightColor = result[STKEY_HIGHLIGHT_COLOR];
    highlightColorPicker.fromString(highlightColor);
    sampleDecryptedText.style.backgroundColor = highlightColor;
    updateTextAreasBackgroundColor(highlightColor);
});

chrome.storage.sync.get([STKEY_FONT_COLOR], function(result){
    let fontColor = result[STKEY_FONT_COLOR];
    fontColorPicker.fromString(fontColor);
    sampleDecryptedText.style.color = fontColor;
    updateTextAreasFontColor(fontColor);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({messageType: MT_ACTIVATE_EXTENSION, tabId: tabs[0].id}, function(){
        if(chrome.runtime.lastError){
            console.log(getMessage(MSG_KEY_EXTENSION_ACTIVATION_FAILED));
        }
    });
});