# PlainSight Browser Extension v1.2.0

PlainSight is a browser extension designed to allow users to secretly communicate in plain sight. Messages are hidden using a password and are stored within a custom tag as hex. These messages can be placed anywhere on the web and those who have the extension and are using the same password have the ability to read them. If other users are using a different password, the message will become garbled when it is processed and will show up as random characters. This is NOT end to end encryption and should NOT be used to store sensitive data.

## How to Use:

All of the configuration and message encryption of PlainSight is handled through the extension popup which can be accessed by clicking the extension icon in the top right corner of the browser. In Google Chrome, this icon is nested underneath the Extensions (puzzle piece) icon by default and can be pinned to the left of the Extensions icon via the Extensions popup. At the very top of the PlainSight popup is the current version of the extension. Beneath that is the "Password" input box. This is the password will be used to encrypt and decrypt messages and can be changed at any time. Passwords may only contains letters, numbers, and any of the following characters: ! @ # $ % ^ & * ( )

While updating the password, the input box will become red meaning that the changes are not yet saved. When the user presses the <kbd>Enter</kbd> key or clicks elsewhere in the extension popup, the extension will attempt to save the password. If the input box becomes green again, it means the password is valid and has successfully been saved.

In order to meet standards for data privacy, PlainSight will only be activated on a page if the user "invokes" it. This means that the extension is virtually disabled for any page until the user clicks on the extension icon, clicks on a context menu (right click menu) item associated with the extension, or runs one of the extension's keyboard shortcuts (listed further down). After the extension has been activated, it will remain running on that tab until the user navigates to a new page or closes the tab.

The "Automatically Decrypt" checkbox is checked by default and enables automatic scanning of a page for encrypted messages when the extension is activated on that page and whenever the page is updated from that point on. Any encrypted messages found during the scan will be automatically decrypted on the page. If this box is not checked, the user will need to manually perform scans by opening the popup and clicking the "Decrypt Page" button, by right clicking on the page and selecting the "Decrypt Page" option, or by running the "Decrypt Page" keyboard shortcut. If automatic page decryption is disabled, the user also has the option to revert decrypted messages to their original encrypted form by either clicking the "Revert Page" button on the popup or running the "Revert Page" keyboard shortcut. Messages that have already been decrypted in the current tab will be reprocessed in real-time if the user updates the password at any point.

All decrypted messages are restyled with a new highlight and font color so that they can be easily distinguished from regular text on the page. These colors are customizable via the PlainSight popup and all decrypted messages in the active tab will be updated immediately after the colors in the popup are changed. These color selections as well as the password and automatic decryption settings are saved whenever they are updated.

Message encryption can be performed by entering the desired message text into the upper text box under "Encrypt Message" and either clicking the "Encrypt" button or pressing the <kbd>Enter</kbd> key. When encrypting messages via the popup, the encrypted output will be placed in the lower text box and automatically copied to the user's clipboard. If line breaks are desired in the message to encrypt, holding the shift key will prevent the <kbd>Enter</kbd> key from triggering encryption. Inline encryption is also available for selected text via the context menu or the "Encrypt Selected Text" keyboard shortcut. When using the shortcut or context menu, the selected text will be replaced with the encrypted value (assuming the selected text is editable by the user).

There may be some cases in which messages must be decrypted manually. An example of this would be an email client inserting hidden "<wbr>" tags (word break opportunity) into the encrypted message which prevents the scan from recognizing it as an encrypted message. Another example is when the location of the text is deemed as "editable" by the browser (to prevent messages from being decrypted before they are sent). To manually decrypt a message, select the "Decrypt Message" tab, enter the encrypted message into the upper text box, and either click the "Decrypt" button or press the <kbd>Enter</kbd> key. The decrypted text will be placed in the lower text box.

### Keyboard Shortcuts:
* Open PlainSight Popup (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd>)
* Decrypt Page (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>)
* Revert Page (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>)
* Encrypt Selected Text (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>)

This concludes the PlainSight tutorial for version 1.2.0. Have fun!

---
### TODO:
[] Fix emoji encoding issues

---

Icons by [Royyan Wijaya](https://www.iconfinder.com/royyanwijaya) via [Iconfinder](https://www.iconfinder.com) are licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

Third party libraries used:
* [aes-js](https://github.com/ricmoo/aes-js) (MIT License)
* [scrypt-js](https://github.com/ricmoo/scrypt-js) (MIT License)

[jscolor](https://jscolor.com/) - Javascript Color Picker Plugin (js/jscolor.js)
> Copyright (C) 2020 Jan Odvárko
> 
> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
> 
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU General Public License for more details.
> 
> You should have received a copy of the GNU General Public License
> along with this program. If not, see <https://www.gnu.org/licenses/>.