const MSG_PATTERN = /443\{([0-9a-f]+)\}336/i;

const STKEY_ACTIVE_PASSWORD = "activePassword";
const STKEY_ACTIVE_KEY = "activeKey";
const STKEY_AUTO_DECRYPT = "autoDecrypt";
const STKEY_HIGHLIGHT_COLOR = "highlightColor";
const STKEY_FONT_COLOR = "fontColor";

const ENC_PREFIX = "443{";
const ENC_SUFFIX = "}336";

const KEY_PATTERN = /^[A-Za-z0-9!@#$%^&*()]+$/;
const KEY_RULES = "May contain numbers, letters, and any of the following characters: ! @ # $ % ^ & * ( )";

const CLASS_DECRYPTED_MESSAGE = "psDecryptedMessage";
const ATTR_ENCRYPTED_MESSAGE = "data-ps-encrypted";

const COMMAND_DECRYPT_PAGE = "fullDecrypt";
const COMMAND_REVERT_PAGE = "revertPage";
const COMMAND_REPROCESS = "reprocess";
const COMMAND_ENCRYPT_INPUT = "encryptSelectedInput";

const MT_DECRYPT_PAGE = "fullDecrypt";
const MT_REVERT_PAGE = "revertPage";
const MT_REPROCESS = "reprocess";
const MT_ENCRYPT_INPUT = "encryptSelectedInput";
const MT_HEARTBEAT = "heartbeat";
const MT_ACTIVATE_EXTENSION = "activateExtension";
const MT_EXTENSION_ACTIVATED = "extensionActivated";
const MT_UPDATED_KEY = "updatedKey";
const MT_UPDATED_AUTO_DECRYPT = "updatedAutoDecrypt";
const MT_UPDATED_HIGHLIGHT_COLOR = "updatedHightlightColor";
const MT_UPDATED_FONT_COLOR = "updatedFontColor";

const MSG_OBJ_SUCCESS = {
    message: "success"
};
const MSG_OBJ_FAILURE = {
    message: "failure"
};
const MSG_OBJ_ALIVE = {
    message: "alive"
};


const escapeHTML = function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

 const sendMessageToActiveTab = function(messageType){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {messageType: messageType}, function(){
            if(chrome.runtime.lastError){
                console.log(getMessage(MSG_KEY_EXTENSION_INACTIVE));
            }
        });
    });
} 