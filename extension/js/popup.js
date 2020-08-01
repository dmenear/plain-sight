const updateKey = function(newKey){
    chrome.storage.sync.set({"activeKey": newKey}, function() {
        console.log("Active key updated: " + newKey);
    });
}

var activeKeyTextBox = document.getElementById("plainSightActiveKey");
activeKeyTextBox.addEventListener("keyup", function() {
    updateKey(activeKeyTextBox.value);
});