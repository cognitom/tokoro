djb       = require './lib/djb'
normalize = require './lib/normalize'
loader    = require './lib/loader'

# データが格納されているディレクトリ
dataDir = 'node_modules/tokoro/data'

setup = (option) ->
  dataDir = option.data.replace /\/$/, '' if option.data

tokoro = (address, callback) ->
  unless typeof address is 'string'
    setup address
    return

  key   = normalize address
  hash  = djb key
  group = Math.floor(hash.toString().slice(-4) / 5)

  loader "#{ dataDir }/#{ group }.data", (err, buffer) ->
    # jDataViewはDataViewのPolyfill (IE9対応のため)
    view = new (window.jDataView || DataView) buffer
    offset = 0
    while offset < buffer.byteLength
      if hash == view.getUint32 offset
        return callback [
          view.getUint32(offset + 4) / 1000000
          view.getUint32(offset + 8) / 1000000
        ]
      offset += 12
    callback() # 見つからない場合はundefinedを返す

unless window.tokoro
  if typeof exports == 'string'
    module.exports = tokoro
  else if typeof define == 'function' && define.amd
    define -> window.tokoro = tokoro
  else
    window.tokoro = tokoro
