# PlainSight Browser Extension v1.1.0

PlainSight is a browser extension designed to allow users to secretly communicate in plain sight. Messages are encrypted and stored within a custom tag as hex. These messages can be placed anywhere on the web and only those who have the extension and the same key have the ability to read them. If other users are using a different key, no error will be thrown but the message will be garbled.

## How to Use:

All of the configuration and message encryption of PlainSight is handled through the extension popup which can be accessed by clicking the extension icon in the top right corner of the browser. In Google Chrome, this icon is nested underneath the Extensions (puzzle piece) icon by default and can be pinned to the left of the Extensions icon via the Extensions popup. At the very top of the PlainSight popup is the current version of the extension. Beneath that is the "Active Key" input box. This is the key will be used to encrypt and decrypt messages and can be changed at any time.

In order to meet standards for data privacy, PlainSight will only be activated on a page if the user "invokes" it. This means that the extension is virtually disabled for any page until the user clicks on the extension icon, clicks on a context menu (right click menu) item associated with the extension, or runs one of the extension's keyboard shortcuts (listed further down). After the extension has been activated, it will remain running on that tab until the user navigates to a new page or closes the tab.

The "Automatically Decrypt" checkbox is checked by default and enables automatic scanning of a page for encrypted messages when the extension is activated on that page and whenever the page is updated from that point on. Any encrypted messages found during the scan will be automatically decrypted on the page. If this box is not checked, the user will need to manually perform scans by opening the popup and clicking the "Decrypt Page" button, by right clicking on the page and selecting the "Decrypt Page" option, or by running the "Decrypt Page" keyboard shortcut. If automatic page decryption is disabled, the user also has the option to revert decrypted messages to their original encrypted form by either clicking the "Revert Page" button on the popup or running the "Revert Page" keyboard shortcut. Messages that have already been decrypted in the current tab will be reprocessed in real-time if the user updates the active key at any point. To continue reading, install PlainSight and set your active key to "plainsight" (case-sensitive and without the quotation marks) and decrypt this page.

443{56047691340708bdc5c8175ee348dac4f77d99c3eb0b42cf2d15f476baf58fd1ab167c5a3125c191b25bacdef0e06e7f09324c12b58f8dbed1083246c66a9f5d42e7ed3f1d4e36c2b4730f8965f442ec0c462d8efed701039a189df4f5ea565c5afb40d985c6b3249a0730d4e4371ce4dacc7529616256b59d76f84ecaa9a10749aad4597a712ea31d02e8bc5a16b03fc549ccd48a3c47914bd04000b1f086c85b3bfb44cd1155e62c4fbe6692719d855f13a4e74fa3a77b9a128436f4451b07b7b32e9206546dddfb1a3b0b372d47a0b48a2416a05d19e41a7514eb3a14e1757716e77928f58a88b7d57b11356b3ee17a3ddfc5cfa7ee0f33bae32ec1e2b51f7f47b9aaefd1f73254751786f9c6303b1168e65725f0e7e9243d39c3fbd8908b28ce0a5f0881490cbf0a3d2e2225b8492fc9fbdf710f6dc410523f751f5766427dcbe1b9702f0a2c1ed47cdd013caf4c68de65362595e7db4ad7c5c4fa5ac2b1ccdcbfd7d47a2f4e0e38ed6885d386565f181657555a0bcd0e4134766db68582af4b6e6a10202dbaf374d7681c1d6f6e5f40a8a7520e54bcedcf980126d438875c3e877723c60e47d644c3c8ec324618f4fb}336

443{5a0d69c231050eefd9d60049fe18c3c8eb60d8c7ef1642cc3a50a461ade094daaa167c5a2435959cfc4ee9c2fcf92937143d415eb18d96b9900e39029269884716aee0241e01308aa23c5a8d7df044ec0c4b3083fed60f159a0f96b0f5f9051773ec03cf95c5b36db90536cef6381ca2dacb69222c274da49266e60fdbe5bc015ab79a51342532ae5800ddb35e01e76fe50389c59a685091499f5d01b1e186c8082be759de5e4ce7330eb964833499cc5556a9a10ad49f72955b8f0bfe500a03e3aa2f85534928cfe61f7c0f286111adb0c92207b5090cef4a6d01b46901ee752453e0747af89299f2d0380a29692bb47a7cca8cd4a2a20176f8f662d5f1b41a2b4bb3aaf2d4ff775c730197ee8a3d7e087ab25038a8b3e02f797acde2c38d9569d30d1c1d854055ef06222b3b60bd1b3e86b8c378042ad407196d060412764b34d8ecba7e2f4e715bf17f9e193cae473b9c76206489f1974785c197be4bd9bd9ed8b883d4626a1a0d38b42581ce91175908424c571b1aca0e1329637ae8dc9ab44e656d5e3468baef78997c075468681a0bbebf041c59f0f6878d1d26d4389b086a9b7a3fc60a5bc701c498e3364b5df6a76418ec223124e046bf89ceccd647e9f6a007a9e8982b8011bbc0dd9c384fcb5cae2e06d763fdaa8b2684df22e768d00a93f70162333f778d6aff66f0861d858f67e2d211fecee75ad1633e454d6fabf9add4ecbe75525a117509aa58522d76287bde98388b088abe6530633e2e0719d0be8dca8daafb974545ee2b3952abaa4af8049661af5e90ac8e77a732052f8cef301d86e0cdac744f7ca99cad925ca8f0221a2baa0621f4033f15f00bc6099e2d6da7bc7b25c1fd3b755a667b6bfab7081e0506796f3bc1f5493579ff0bb43201381ae7094ad16bcaf084cb033750e13436c781a9be8800d2cd233f72e0e9506b098fc42406d1710d2fcbc95eb78b14959198186dee5c3e3539d50bbecb9743a7a4239ef7bc6c07153a7796eb95ad0237576be09a5494ac043bdd7039ebdc2ad32dd5}336

443{43007fc3354206aec598015ea71bd8cce12e9bc5fd1d118e361ef473b7ef98c0e71e7d09352dd29ce11ae1c5e6e36e750575401bbf9a9cba850c38028b6d9e4657abe2295f01058ce779579c60e55aa958412ed7aadc091e9a0d97a1fcef055753a201d3ccd0aa2c9d0c65defb361cee8e8a6e287f2756a4936df30fd0e0b10654b0d414282638b94600b8a95c14ed3fb956c6d58b3c468c42de5953fee184c2092cfb59d00a41a67647b27e98719f845b13b5e149f18e678f1e8e45f0470000f6a424c2044c24dffd5e6b183e3702aaa59a761bb84c5cf359791fb82f07e97d2444eb7467e68c84eddd76027c742fe16f2f9d84d6eee70d70aaff7ec0f7b55e6647aef9e7dbff79105d189de8c22c69506bea533aa0ffe46174298ce0df879628d30c1a5c85434fae1124343c25b65d6a9df0d230156fd9005c76525756704230cdeaf57e2e0a7d1edc70ca1437ac4739de663c2596ead20695d6d8ad5dcfa6cc95a8cc9d7c380b1338fa3cc4d087054d0c055d4b1b19d6020c70716bad9295fb466467422a38bae279996d0a5b616e5f40afae411210fde8c2dd1c26cc29dc526abb7d7a8b0e5bc605dad4f1735618f3a77205b876226dea44a988c6c5d44baceba619b5fb98629b17f0c0b6b63145d740fe3f48f974f7a99e288e9322fa7a9247dfe10036373b36906efb24f98d5e919965b6c410b2c6e15dc7667954087eb1adb49df9f6641a4a416603b60c43307a7c36d99935874799f075786377782a12c1ec97d690e9c3d25d48e87f7e72ee9d5df900c063e4599cba9579bb764a2ec4f0300c96e699f63c7d34a99cf9825de1f5204371e23769e24b3402e71aca0dca277ba7ab7133c1b8346816673e67eabb58060c003c787ec4fe0a3574fe0bac380e2948b01443c53f88f7cbc148}336

### Keyboard Shortcuts:
* Open PlainSight Popup (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd>)
* Decrypt Page (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>)
* Revert Page (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>)
* Encrypt Selected Text (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>)

This concludes the PlainSight tutorial for version 1.1.0. Have fun!

---

Icons by [Royyan Wijaya](https://www.iconfinder.com/royyanwijaya) via [Iconfinder](https://www.iconfinder.com) are licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

Third party libraries used:
* [aes-js](https://github.com/ricmoo/aes-js) (MIT License)
* [js-sha256](https://github.com/emn178/js-sha256) (MIT License)

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