# [WIP] tokoro

住所緯度経度変換ライブラリ (ジオコーディング)

## 特徴

- フロントエンドだけでジオコーディング可能
- モジュールを読み込むだけでNode/io.jsから利用可能 (DB不要)

## 実装方針

- 緯度経度情報を数千件ごとにファイルに格納
- ハッシュ化し、1ファイルあたり、100KB以下に抑える
- ハッシュ関数を最適化して、衝突をなるべく減らす (最初の時点で衝突ゼロは目指さない)

## インストール

※npmの登録は後日行います。下記はまだ使えません。

```bash
$ npm install --save tokoro
```

## 使い方

### クライアントサイドで使う

データファイルは同一ドメインに置くか、CORS設定をする必要があります。

```html
<script src="dist/tokoro.js"></script>
<script>
  tokoro({ data: 'data' })
  tokoro('東京都世田谷区粕谷一丁目25', function(code) {
    console.log('緯度', code[0]) // 35.662696
    console.log('経度', code[1]) // 139.614003
  })
</script>
```

### Node/io.jsから使う

```javascript
var tokoro = require('tokoro')

tokoro('東京都世田谷区粕谷一丁目25', function(code) {
  console.log('緯度', code[0]) // 35.662696
  console.log('経度', code[1]) // 139.614003
})
```

## 開発者向けの情報

以下の手順は、利用だけする場合は不要です。開発に加わる場合、自前でデータを変換する必要がある場合に参考にしてください。

### コマンド

#### 国交省のサイトからダウンロードして、ビルド

```bash
$ npm run build
```

#### ダウンロード済みのデータから、リビルド

```bash
$ npm run rebuild
```

#### ファイルの監視、自動リビルド

```bash
$ npm start
```

## データについて

国土交通省の公開している[街区レベル位置参照データ](http://nlftp.mlit.go.jp/isj/)を元にします。

## ライセンス

- プログラム部分: MIT
- データ部分: オープンデータな何か
