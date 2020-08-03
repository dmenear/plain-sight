# PlainSight Chrome Extension

PlainSight is a Chrome extension designed to allow users to secretly communicate in plain sight. Messages are encrypted and stored within a custom tag as hex. These messages can be placed anywhere on the web and if this extension is installed, they will be automatically decrypted and readable by other users that are using the same key. If other users are using a different key, no error will be thrown but the message will be garbled.


Icons by [Royyan Wijaya](https://www.iconfinder.com/royyanwijaya) via [Iconfinder](https://www.iconfinder.com) are licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

Third party libraries used (both under MIT license):
* [aes-js](https://github.com/ricmoo/aes-js)
* [js-sha256](https://github.com/emn178/js-sha256)