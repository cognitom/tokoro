(function() {
  var djb;

  djb = function(s) {
    return s.split('').reduce(function(h, str) {
      return ((h << 5) + h + str.charCodeAt(0)) >>> 0;
    }, 5381);
  };

  module.exports = djb;

}).call(this);
