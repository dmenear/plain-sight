const MSG_PREFIX = "PlainSight: ";

const MSG_KEY_EXTENSION_INACTIVE = "extensionInactive";
const MSG_KEY_EXTENSION_ACTIVATED = "extensionActivated";
const MSG_KEY_EXTENSION_ACTIVATION_FAILED = "extensionActivationFailed";
const MSG_KEY_CONTENT_UPDATE_FAIL = "contentUpdateFail";
const MSG_KEY_CONTENT_UPDATE_SUCCESS = "contentUpdateSuccess";
const MSG_KEY_INJECTING_FILES = "injectingFiles";
const MSG_KEY_STYLESHEET_INJECTION_FAILED = "stylesheetInjectionFailed";
const MSG_KEY_SCRIPT_INJECTION_FAILED = "scriptInjectionFailed";
const MSG_KEY_REVERT_PAGE_FAILED = "revertPageFailed";
const MSG_KEY_KEY_UPDATE_REPROCESS = "keyUpdateReprocess";

const MESSAGES = {
    [MSG_KEY_EXTENSION_INACTIVE]: "Content scripts are not injected in active tab.",
    [MSG_KEY_EXTENSION_ACTIVATED]: "Extension activated on active tab.",
    [MSG_KEY_EXTENSION_ACTIVATION_FAILED]: "Failed to activate extension",
    [MSG_KEY_CONTENT_UPDATE_FAIL]: "No content update sent. Content scripts are not injected in active tab.",
    [MSG_KEY_CONTENT_UPDATE_SUCCESS]: "Content update sent. Response: ",
    [MSG_KEY_INJECTING_FILES]: "Injecting content scripts and CSS...",
    [MSG_KEY_STYLESHEET_INJECTION_FAILED]: "Failed to inject CSS stylesheet: ",
    [MSG_KEY_SCRIPT_INJECTION_FAILED]: "Failed to inject content script: ",
    [MSG_KEY_REVERT_PAGE_FAILED]: "Cannot revert page when automatic decryption is enabled!",
    [MSG_KEY_KEY_UPDATE_REPROCESS]: "Key updated, reprocessing messages"
};

const getMessage = function(messageId){
    return MSG_PREFIX + MESSAGES[messageId];
}