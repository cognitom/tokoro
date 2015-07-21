djb       = require '../lib/djb'
base94    = require '../lib/base94'
normalize = require '../lib/normalize'
csv       = require 'csv-parser'
fs        = require 'fs'
path      = require 'path'

tokoro = (address, callback) ->
  basePath = path.join __dirname, '..', 'data'
  key      = normalize address
  digest   = base94.encode djb key
  group    = Math.floor(djb(key).toString().slice(-4) / 5)
  stream   = fs.createReadStream path.join basePath, "#{ group }.data"
  console.log group, digest
  console.log base94.decode "y'E"

  stream.pipe csv
    separator: ' '
    headers: ['digest', 'lat', 'long']
  .on 'data', (record) ->
    if digest == record.digest
      stream.pause()
      callback [
        0.000001 * base94.decode record.lat
        0.000001 * base94.decode record.long
      ]
  .on 'end', ->
    console.log 'Not found!'
    callback ''

module.exports = tokoro
