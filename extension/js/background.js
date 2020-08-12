const STYLESHEETS_TO_INJECT = ["css/content.css"];
const SCRIPTS_TO_INJECT = ["js/scrypt.js", "js/aes.js", "js/common.js", "js/messages.js", "js/cryptofunctions.js", "js/content.js"];
const DEFAULT_PASSWORD = "plainsight";
const DEFAULT_AUTO_ENCRYPT = true;
const DEFAULT_HIGHLIGHT_COLOR = "#1F1F1F";
const DEFAULT_FONT_COLOR = "#00ff00";

var queuedCommand = "";

const activateExtensionAndRunCommand = function(tabId, command){
    chrome.tabs.sendMessage(tabId, {messageType: MT_HEARTBEAT}, function(){
        if(chrome.runtime.lastError){
            console.log(getMessage(MSG_KEY_INJECTING_FILES));

            for(let stylesheet of STYLESHEETS_TO_INJECT){
                chrome.tabs.insertCSS({
                    file: stylesheet
                }, function(){
                    if(chrome.runtime.lastError){
                        console.log(getMessage(MSG_KEY_STYLESHEET_INJECTION_FAILED) + stylesheet);
                    }
                });
            }
            
            for(let script of SCRIPTS_TO_INJECT){
                chrome.tabs.executeScript({
                   file: script,
                   allFrames: true 
                }, function(){
                    if(chrome.runtime.lastError){
                        console.log(getMessage(MSG_KEY_SCRIPT_INJECTION_FAILED) + script);
                    }
                });
            }
            if(command !== null){
                queuedCommand = command;
            }
        } else{
            if(command !== null){
                processCommand(command);
            }
        }
    });
}

const processCommand = function(command){
    if (command == COMMAND_DECRYPT_PAGE) {
        sendMessageToActiveTab(MT_DECRYPT_PAGE);
    } else if (command == COMMAND_REVERT_PAGE) {
        sendMessageToActiveTab(MT_REVERT_PAGE);
    } else if(command == COMMAND_REPROCESS){
        sendMessageToActiveTab(MT_REPROCESS);
    } else if(command == COMMAND_ENCRYPT_INPUT){
        sendMessageToActiveTab(MT_ENCRYPT_INPUT);
    }
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: COMMAND_DECRYPT_PAGE,
        title: "Decrypt Page",
    });

    chrome.contextMenus.create({
        id: COMMAND_ENCRYPT_INPUT,
        title: "Encrypt Selection",
        contexts: ["selection"]
    });

    chrome.storage.sync.set({[STKEY_ACTIVE_PASSWORD]: DEFAULT_PASSWORD});
    chrome.storage.sync.set({[STKEY_ACTIVE_KEY]: generateHashKey(DEFAULT_PASSWORD)});
    chrome.storage.sync.set({[STKEY_AUTO_DECRYPT]: DEFAULT_AUTO_ENCRYPT});
    chrome.storage.sync.set({[STKEY_HIGHLIGHT_COLOR]: DEFAULT_HIGHLIGHT_COLOR});
    chrome.storage.sync.set({[STKEY_FONT_COLOR]: DEFAULT_FONT_COLOR});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    activateExtensionAndRunCommand(tab.id, info.menuItemId);
});

chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if([COMMAND_DECRYPT_PAGE, COMMAND_REVERT_PAGE, COMMAND_ENCRYPT_INPUT].includes(command)){
            activateExtensionAndRunCommand(tabs[0].id, command);
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.messageType === MT_ACTIVATE_EXTENSION){
        activateExtensionAndRunCommand(request.tabId, COMMAND_REPROCESS);
        sendResponse(MSG_OBJ_SUCCESS);
    } else if(request.messageType === MT_EXTENSION_ACTIVATED){
        console.log(getMessage(MSG_KEY_EXTENSION_ACTIVATED));
        if(queuedCommand !== ""){
            processCommand(queuedCommand);
            queuedCommand = "";
        }
    }
});
