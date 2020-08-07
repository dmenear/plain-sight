const msgPattern = /443\{([0-9a-f]+)\}336/i;
const failedDecryption = "[[PS: message decryption failed]]";
const failedEncryption = "[[PS: message encryption failed]]";
const counterVal = 17;


const escapeHTML = function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }