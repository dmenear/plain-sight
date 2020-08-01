const config = { characterData: true, childList: true, subtree: true };
const msgPattern = /443\{(.+)\}336/g;
const failedVal = "[[PS: message decryption failed]]";
var firstRun = true;
var activeKey;

const mutationObserved = function(mutations, observer){
    updatePage();
}

const decryptMessages = function(){
    var allElements = document.getElementsByTagName("*");
    for(let element of allElements){
        for(let node of element.childNodes){
            if(node.nodeType === 3 && node.nodeValue.search(msgPattern) >= 0 && (!document.activeElement.contains(node) || firstRun)){
                var match = msgPattern.exec(node.nodeValue);
                var updatedText = node.nodeValue.replace(msgPattern, match[1] + activeKey);
                element.replaceChild(document.createTextNode(updatedText), node);
                firstRun = false;
            }
        }
    }
}

const updatePage = function(){
    chrome.storage.sync.get(["activeKey"], function(result){
        activeKey = result["activeKey"];
    });
    decryptMessages();
}

updatePage();
const observer = new MutationObserver(mutationObserved);
observer.observe(document.body, config);