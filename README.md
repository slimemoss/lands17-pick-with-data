# 概要
17landsのピック画面に、デッキ色ごとのGIHを表示させる拡張機能です。

Tampermonkeyスクリプトとして動作します。

いまのところ、最新セットのみ対応しています。

![screenshot](img/screenshot.png)

# インストール手順
## 1. TampermonkeyをChromeに追加
[Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)を
Chromeの拡張機能として追加

Chomeの`設定 > 拡張機能 > 拡張機能の管理` へ行き、右上から`デベロッパーモード`を有効にする [^1]

[^1]: [Q209: Developer mode to run userscripts](https://www.tampermonkey.net/faq.php#Q209)

## 2. このスクリプトをTampermonkeyに追加
[ここをクリック](https://github.com/slimemoss/lands17-pick-with-data/raw/deploy/dist/react-userscripts.user.js) すると、
このスクリプトがTampermonkeyに追加されます
