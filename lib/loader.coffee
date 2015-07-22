loader = (url, callback) ->
  req = new XMLHttpRequest()

  req.onreadystatechange = ->
    if req.readyState == 4 && req.status == 200
      callback req.responseText

  req.open 'GET', url, true
  req.send ''

module.exports = loader
