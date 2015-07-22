djb       = require '../lib/djb'
base94    = require '../lib/base94'
normalize = require '../lib/normalize'
loader    = require '../lib/loader'

dataDir = 'node_modules/tokoro/data'

setup = (option) ->
  dataDir = option.data.replace /\/$/, '' if option.data

tokoro = (address, callback) ->
  unless typeof address is 'string'
    setup address
    return

  key    = normalize address
  digest = base94.encode djb key
  group  = Math.floor(djb(key).toString().slice(-4) / 5)

  loader "#{ dataDir }/#{ group }.data", (data) ->
    for line in data.split '\n'
      [dg, lt, lg] = line.split ' '
      if digest == dg
        return callback [
          base94.decode(lt) / 1000000
          base94.decode(lg) / 1000000
        ]

if typeof exports == 'string'
  module.exports = tokoro
else if typeof define == 'function' && define.amd
  define -> window.tokoro = tokoro
else
  window.tokoro = tokoro
