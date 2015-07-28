djb        = require './lib/djb'
normalize  = require './lib/normalize'
perfect    = require 'perfect'
fs         = require 'fs'
path       = require 'path'

tokoro = (address, callback) ->
  basePath = path.join __dirname, '..', 'data'
  key      = normalize address
  group    = Math.floor(djb(key).toString().slice(-4) / 5)
  dataPath = path.join basePath, "#{ group }.data"

  fs.readFile dataPath, (error, buffer) ->
    if error
      console.log error
      return
    offset = 0
    hints = []
    coords = []
    while offset < buffer.length
      hint = buffer.readInt16BE  offset + 0
      lat  = buffer.readUInt32BE offset + 2
      long = buffer.readUInt32BE offset + 6
      hints.push hint || undefined
      coords.push [lat / 1000000, long / 1000000]
      offset += 10

    callback perfect.lookup hints, coords, key

module.exports = tokoro
