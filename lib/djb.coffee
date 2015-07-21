djb = (s) ->
  s.split('').reduce (h, str) ->
    ((h << 5) + h + str.charCodeAt 0) >>> 0
  , 5381

module.exports = djb
