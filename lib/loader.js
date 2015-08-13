(function() {
  var loader;

  loader = function(url, callback) {
    var req;
    req = new XMLHttpRequest();
    req.onload = function(event) {
      return callback('', req.response);
    };
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    return req.send('');
  };

  if (window.jBinary) {
    module.exports = function(url, callback) {
      return window.jBinary.loadData(url, function(err, buffer) {
        buffer.byteLength = buffer.length;
        return callback(err, buffer);
      });
    };
  } else {
    module.exports = loader;
  }

}).call(this);
