djb        = require './lib/djb'
normalize  = require './lib/normalize'
fs         = require 'fs'
path       = require 'path'

tokoro = (address, callback) ->
  basePath = path.join __dirname, '..', 'data'
  key      = normalize address
  hash     = djb key
  group    = Math.floor(hash.toString().slice(-4) / 5)
  dataPath = path.join basePath, "#{ group }.data"

  fs.readFile dataPath, (error, buffer) ->
    if error
      console.log 'Data file not found.'
      return callback()
    offset = 0
    while offset < buffer.length
      if hash == buffer.readUInt32BE offset
        callback [
          buffer.readUInt32BE(offset + 4) / 1000000
          buffer.readUInt32BE(offset + 8) / 1000000
        ]
        return
      offset += 12
    callback() # 見つからない場合はundefinedを返す

module.exports = tokoro
