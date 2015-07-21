djb       = require './lib/djb'
base94    = require './lib/base94'
normalize = require './lib/normalize'
request   = require 'browser-request'

add2geo = (address) ->
  address = normalize address
  city = address.replace /([市区町村]).+$/, '$1'
  key = base94 djb address
