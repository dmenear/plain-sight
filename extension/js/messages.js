const messagePrefix = "PlainSight: ";
const messages = {
    "extensionInactive": "Content scripts are not injected in active tab.",
    "extensionActivated": "Extension activated on active tab.",
    "contentUpdateFail": "No content update sent. Content scripts are not injected in active tab.",
    "contentUpdateSuccess": "Content update sent. Response: ",
    "injectingFiles": "Injecting content scripts and CSS...",
    "stylesheetInjectionFailed": "Failed to inject CSS stylesheet: ",
    "scriptInjectionFailed": "Failed to inject content script: ",
    "revertPageFailed": "Cannot revert page when automatic decryption is enabled!"
};

const getMessage = function(messageId){
    return messagePrefix + messages[messageId];
}