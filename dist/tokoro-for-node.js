(function() {
  var LineByLine, base94, djb, fs, normalize, path, tokoro;

  djb = require('../lib/djb');

  base94 = require('../lib/base94');

  normalize = require('../lib/normalize');

  LineByLine = require('line-by-line');

  fs = require('fs');

  path = require('path');

  tokoro = function(address, callback) {
    var basePath, dataPath, digest, group, key, stream;
    basePath = path.join(__dirname, '..', 'data');
    key = normalize(address);
    digest = base94.encode(djb(key));
    group = Math.floor(djb(key).toString().slice(-4) / 5);
    dataPath = path.join(basePath, group + ".data");
    stream = new LineByLine(dataPath);
    return stream.on('error', function(err) {
      console.log('Data file not found.');
      return callback('');
    }).on('line', function(line) {
      var dg, lg, lt, ref;
      ref = line.split(' '), dg = ref[0], lt = ref[1], lg = ref[2];
      if (digest === dg) {
        stream.pause();
        return callback([base94.decode(lt) / 1000000, base94.decode(lg) / 1000000]);
      }
    }).on('end', function() {
      return callback('');
    });
  };

  module.exports = tokoro;

}).call(this);
