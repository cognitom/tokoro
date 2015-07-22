(function() {
  var BASE_NUM, CODE_BIGIN, decode, encode;

  CODE_BIGIN = 33;

  BASE_NUM = 94;

  encode = function(num) {
    var d, ret, s;
    num = Math.round(num);
    ret = '';
    while (num > 0) {
      d = num % BASE_NUM;
      s = String.fromCharCode(CODE_BIGIN + d);
      ret = s + ret;
      num = Math.floor(num / BASE_NUM);
    }
    return ret;
  };

  decode = function(str) {
    var digit, i, j, ref, ret;
    ret = 0;
    for (i = j = 0, ref = str.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      digit = str.charCodeAt(str.length - 1 - i) - CODE_BIGIN;
      ret += digit * Math.pow(BASE_NUM, i);
    }
    return ret;
  };

  module.exports = {
    encode: encode,
    decode: decode
  };

}).call(this);
