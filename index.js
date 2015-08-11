(function() {
  var djb, fs, normalize, path, tokoro;

  djb = require('./lib/djb');

  normalize = require('./lib/normalize');

  fs = require('fs');

  path = require('path');

  tokoro = function(address, callback) {
    var basePath, dataPath, group, hash, key;
    basePath = path.join(__dirname, 'data');
    key = normalize(address);
    hash = djb(key);
    group = Math.floor(hash.toString().slice(-4) / 5);
    dataPath = path.join(basePath, group + ".data");
    return fs.readFile(dataPath, function(error, buffer) {
      var offset;
      if (error) {
        console.log('Data file not found.');
        return callback();
      }
      offset = 0;
      while (offset < buffer.length) {
        if (hash === buffer.readUInt32BE(offset)) {
          callback([buffer.readUInt32BE(offset + 4) / 1000000, buffer.readUInt32BE(offset + 8) / 1000000]);
          return;
        }
        offset += 12;
      }
      return callback();
    });
  };

  module.exports = tokoro;

}).call(this);
