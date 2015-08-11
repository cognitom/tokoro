loader = (url, callback) ->
  req = new XMLHttpRequest()

  req.onload = (event) ->
    callback '', req.response

  req.open 'GET', url, true
  console.log 'no req.responseType' if !req.responseType
  req.responseType = 'arraybuffer'
  req.send ''

# jBinaryが存在する場合は、そちらを優先
if window.jBinary
  module.exports = (url, callback) ->
    window.jBinary.loadData url, (err, buffer) ->
      # byteLengthプロパティのみ補完
      buffer.byteLength = buffer.length
      callback err, buffer
else
  module.exports = loader
