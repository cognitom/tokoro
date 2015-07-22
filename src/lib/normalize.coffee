Moji = require 'moji'

CHINESE_NUMS = '〇一二三四五六七八九'

china = (raw) ->
  num = parseInt raw
  return '' if num <= 0
  return CHINESE_NUMS[num] if num < 10
  return CHINESE_NUMS[Math.floor(num / 10)] + '十' + china(num % 10) if num < 100
  throw 'Too big for me.'

normalize = (str) ->
  new Moji str
  .convert 'HK', 'ZK' # カタカナは全角
  .convert 'ZE', 'HE' # 英数は半角
  .convert 'ZS', 'HS' # スペースは半角
  .toString()

  # 空白を除去
  .replace /\s+/g, ''

  # 丁目は漢数字
  .replace /(\d+)丁目/, (_, m1) -> "#{ china m1 }丁目"

  # 1-2-3 → 1丁目2-3
  .replace /(\d+)\-(\d+)\-(\d+)$/, (_, m1, m2, m3) -> "#{ china m1 }丁目#{ m2}-#{ m3 }"

  # 番地以降は削除
  .replace /([^d\-]\d+)\-.*$/, '$1'

module.exports = normalize
