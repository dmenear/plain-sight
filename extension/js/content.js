const config = { characterData: true, childList: true, subtree: true };
const msgPattern = /443\{(.+)\}336/g;

const mutationObserved = function(mutations, observer){
    decryptMessages();
}

const decryptMessages = function(){
    var allElements = document.getElementsByTagName("*");
    for(let element of allElements){
        for(let node of element.childNodes){
            if(node.nodeType === 3 && node.nodeValue.search(msgPattern) >= 0 && !node.parentElement.isContentEditable){
                var match = msgPattern.exec(node.nodeValue);
                var updatedText = node.nodeValue.replace(msgPattern, getDecryptedMessage(match[1], null));
                element.replaceChild(document.createTextNode(updatedText), node);
            }
        }
    }
}

decryptMessages();
const observer = new MutationObserver(mutationObserved);
observer.observe(document.body, config);

/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.messageType === "encrypt"){
        try{
            var selectedText = window.getSelection().toString();
            var selectedNode = window.getSelection().focusNode;
            var nodeParent = selectedNode.parentElement;
            var updatedText = selectedNode.nodeValue.replace(selectedText, getEncryptedMessage(selectedText));
            nodeParent.replaceChild(document.createTextNode(updatedText), selectedNode);
        } catch(err){
            console.log("Inline encrypt failed!");
            console.log(err);
        }
    }
});*/