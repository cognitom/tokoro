(function() {
  var loader;

  loader = function(url, callback) {
    var req;
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        return callback(req.responseText);
      }
    };
    req.open('GET', url, true);
    return req.send('');
  };

  module.exports = loader;

}).call(this);
