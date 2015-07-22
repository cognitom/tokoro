# tokoro

Japanese geocoding library for front-end and node/io.js.
国土交通省のデータを元にしたオープンな、住所緯度経度変換ライブラリ(ジオコーダー)です。フロントエンドから、あるいはNode/io.jsのモジュールとして利用可能です。
[OpenStreetMap](https://www.openstreetmap.org/)と組み合わせると、簡単に住所から地図表示させることができます。

## 特徴

- フロントエンドだけでジオコーディング可能
- モジュールを読み込むだけでNode/io.jsから利用可能 (DB不要)
- 位置参照データは全体で200MB以下 (圧縮時100MB)

## 実装と制限について

- 緯度経度情報を2000ファイルに分割して格納
- クライアントでの検索時、1検索ごとに1ファイルダウンロード
- 1ファイルあたりの容量は90〜100KB程度
- 全体で100件ほど(0.001%以下)、検索できないものあり ※ハッシュ関数の改良で改善の余地あり

## インストール

インストール時に、位置参照データ(約200MB)をダウンロードするため、環境によって10分程度かかります。

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
    if (code) {
      console.log('緯度', code[0]) // 35.662696
      console.log('経度', code[1]) // 139.614003
    } else {
      console.log('見つからないよ!')
    }
  })
</script>
```

### Node/io.jsから使う

```javascript
var tokoro = require('tokoro')

tokoro('東京都世田谷区粕谷一丁目25', function(code) {
  if (code) {
    console.log('緯度', code[0]) // 35.662696
    console.log('経度', code[1]) // 139.614003
  } else {
    console.log('見つからないよ!')
  }
})
```

## 開発者向けの情報

以下の手順は、利用だけする場合は不要です。開発に加わる場合、自前でデータを変換する必要がある場合に参考にしてください。

### コマンド

- `$ npm run build`: 国交省のサイトからダウンロードして、ビルド
- `$ npm run rebuild`: ダウンロード済みのデータから、リビルド
- `$ npm start`: ファイルの監視、自動リビルド

上記以外のコマンドは、`gulpfile`および`task`ディレクトリ内を参照のこと。

## データについて

国土交通省の公開している[街区レベル位置参照データ](http://nlftp.mlit.go.jp/isj/)を元にします。

## ライセンス

- プログラム部分: MIT
- データ部分: オープンデータな何か
