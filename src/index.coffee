djb        = require '../lib/djb'
base94     = require '../lib/base94'
normalize  = require '../lib/normalize'
LineByLine = require 'line-by-line'
fs         = require 'fs'
path       = require 'path'

tokoro = (address, callback) ->
  basePath = path.join __dirname, '..', 'data'
  key      = normalize address
  digest   = base94.encode djb key
  group    = Math.floor(djb(key).toString().slice(-4) / 5)
  stream   = new LineByLine path.join basePath, "#{ group }.data"

  stream
  .on 'line', (line) ->
    [dg, lt, lg] = line.split ' '
    if digest == dg
      stream.pause()
      callback [
        base94.decode(lt) / 1000000
        base94.decode(lg) / 1000000
      ]
  .on 'end', ->
    console.log 'Not found!'
    callback ''

module.exports = tokoro
