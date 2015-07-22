(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
var djb;

djb = function(s) {
  return s.split('').reduce(function(h, str) {
    return ((h << 5) + h + str.charCodeAt(0)) >>> 0;
  }, 5381);
};

module.exports = djb;


},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
var CHINESE_NUMS, Moji, china, normalize;

Moji = require('moji');

CHINESE_NUMS = '〇一二三四五六七八九';

china = function(raw) {
  var num;
  num = parseInt(raw);
  if (num <= 0) {
    return '';
  }
  if (num < 10) {
    return CHINESE_NUMS[num];
  }
  if (num < 100) {
    return CHINESE_NUMS[Math.floor(num / 10)] + '十' + china(num % 10);
  }
  throw 'Too big for me.';
};

normalize = function(str) {
  return new Moji(str).convert('HK', 'ZK').convert('ZE', 'HE').convert('ZS', 'HS').toString().replace(/\s+/g, '').replace(/(\d+)丁目/, function(_, m1) {
    return (china(m1)) + "丁目";
  }).replace(/(丁目\d+)[^\d].*$/, '$1').replace(/(\d+)-(\d+)/, function(_, m1, m2) {
    return (china(m1)) + "丁目" + m2;
  });
};

module.exports = normalize;


},{"moji":8}],5:[function(require,module,exports){
'use strict';
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],6:[function(require,module,exports){
"use strict";
module.exports = {
    'ZE': {start:0xff01, end:0xff5e}, // 全角英数
    'HE': {start:0x0021, end:0x007e}, // 半角英数
    'HG': {start:0x3041, end:0x3096}, // ひらがな
    'KK': {start:0x30a1, end:0x30f6}, // カタカナ

    'HS': {regexp: /(\s|\u00A0)/g, list:['\u0020', '\u00A0']}, // 半角スペース
    'ZS': {regexp: /(\u3000)/g, list:['　', '　']}, //全角スペース

    'HK': {regexp: /([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])/g, // 半角カナ
        list: ['｡', '｢', '｣', '､', '･', 'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', 'ﾞ', 'ﾟ', 'ｦﾞ', 'ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎﾞ', 'ﾎﾟ', 'ﾜﾞ']},
    'ZK': {regexp: /([\u3001-\u30fc])/g,  //全角カナ (半角カナ変換用)
        list: ['。', '「', '」', '、', '・', 'ヲ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ン', '゛', '゜', 'ヺ', 'ヴ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'パ', 'ビ', 'ピ', 'ブ', 'プ', 'ベ', 'ペ', 'ボ', 'ポ', 'ヷ']}
};
},{}],7:[function(require,module,exports){
'use strict';


/**
 * @constructor
 * @param {object} mojisyu
 * @param {string} str
 */
function Moji(mojisyu, str) {
    this.origin = str;
    this._result = this.origin;
    this._mojisyu = mojisyu;
}

Moji.prototype.toString = function () {
    return this._result;
};


/**
 * convert
 * 変換の実行
 *
 * @param {string} from_syumei 変換前の文字種名
 * @param {string} to_syumei 変化後の文字種名
 * @returns {Moji}
 */
Moji.prototype.convert = function convert(from_syumei, to_syumei) {
    var from_mojisyu_body = this._mojisyu[from_syumei];
    var to_mojisyu_body = this._mojisyu[to_syumei];

    if (this._mojisyuType(from_mojisyu_body) === 'range' && this._mojisyuType(to_mojisyu_body) === 'range') {
        this._result = this._rangeConvert(from_mojisyu_body, to_mojisyu_body);
        return this;
    }

    if (this._mojisyuType(from_mojisyu_body) === 'regexp' && this._mojisyuType(to_mojisyu_body) === 'regexp') {
        this._result = this._regexpConvert(from_mojisyu_body, to_mojisyu_body);
        return this;
    }
};

/**
 * _rangeConvert
 * @param {object} from_syu
 * @param {object} to_syu
 * @return {string}
 * @private
 */
Moji.prototype._rangeConvert = function _rangeConvert(from_syu, to_syu) {
    var distance = to_syu.start - from_syu.start;
    return this._rangeMap(from_syu, function (moji, is_match, code) {
        if (is_match) {
            return String.fromCharCode(code + distance);
        }
        return moji;
    }).join('');
};

/**
 * _regexpConvert
 * @param from_syu
 * @param to_syu
 * @return {string}
 * @private
 */
Moji.prototype._regexpConvert = function _regexpConvert(from_syu, to_syu) {
    return this._regexpMap(from_syu, function (moji, is_match, index) {
        if (!is_match) {
            return moji;
        }
        return to_syu.list[index];
    });
};


/**
 *  filter
 *  文字種のみに絞込
 *  @param {string} mojisyu_name 絞り込まれる文字種
 *  @returns {Moji}
 */
Moji.prototype.filter = function filter(mojisyu_name) {
    var mojisyu_body = this._mojisyu[mojisyu_name];

    if (this._mojisyuType(mojisyu_body) === 'range') {
        this._result = this._rangeFilter(mojisyu_body);
        return this;
    }

    if (this._mojisyuType(mojisyu_body) === 'regexp') {
        this._result = this._regexpFilter(mojisyu_body);
        return this;
    }
};

/**
 * _rangeFilter
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._rangeFilter = function _rangeFilter(mojisyu) {
    return this._rangeMap(mojisyu, function (moji, is_range) {
        if (is_range) {
            return moji;
        }
        return '';
    }).join('');
};

/**
 * _regexpFilter
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._regexpFilter = function _regexpFilter(mojisyu) {
    var match_mojis = [];
    this._regexpMap(mojisyu, function (moji, is_match) {
        if (is_match) {
            match_mojis.push(moji);
        }
    });
    return match_mojis.join('');
};


/**
 * reject
 * 文字種は排除
 * @param {string} mojisyu_name 排除される文字種
 * @returns {Moji}
 */
Moji.prototype.reject = function reject(mojisyu_name) {
    var mojisyu_body = this._mojisyu[mojisyu_name];

    if (this._mojisyuType(mojisyu_body) === 'range') {
        this._result = this._rangeReject(mojisyu_body);
        return this;
    }

    if (this._mojisyuType(mojisyu_body) === 'regexp') {
        this._result = this._regexpReject(mojisyu_body);
        return this;
    }
};

/**
 * _rangeReject
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._rangeReject = function _rangeReject(mojisyu) {
    return this._rangeMap(mojisyu, function (moji, is_range) {
        if (!is_range) {
            return moji;
        }
        return '';
    }).join('');
};

/**
 * _regexpReject
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._regexpReject = function _regexpReject(mojisyu) {
    var reject_moji = this._regexpFilter(mojisyu);
    return this._result.replace(reject_moji, '');
};


/**
 * _mojisyuType
 * 文字種のタイプを判別
 * range || regexp
 * @param {mojisyu} mojisyu 文字種
 * @return {string}
 */
Moji.prototype._mojisyuType = function _mojisyuType(mojisyu) {
    if (mojisyu.start && mojisyu.end) {
        return 'range';
    }
    if (mojisyu.regexp && mojisyu.list) {
        return 'regexp';
    }

    return '';
};

/**
 * _rangeMap
 * @param {object} mojisyu - 文字種オブジェクト
 * @param {function} callback
 * @return {Array}
 * @private
 */
Moji.prototype._rangeMap = function _rangeMap(mojisyu, callback) {
    return this._result.split('').map(function (moji) {
        var code = moji.charCodeAt(0);
        var is_match = (code >= mojisyu.start && code <= mojisyu.end);
        return callback.call(this, moji, is_match, code);
    });
};

/**
 * _regexpMap
 * @param {object} mojisyu - 文字種オブジェクト
 * @param callback
 * @return {string}
 * @private
 */
Moji.prototype._regexpMap = function _regexpMap(mojisyu, callback) {
    return this._result.replace(mojisyu.regexp, function (moji) {
        var index = mojisyu.list.indexOf(moji);
        var is_match = index >= 0;
        return callback.call(this, moji, is_match, index);
    });
};

module.exports = Moji;
},{}],8:[function(require,module,exports){
"use strict";
var Moji = require("./moji.core");
var mojiStr = require("./moji.string");
var _mojisyu = require("./default_mojisyu");
var assign = require("object-assign");
var mojisyu = assign({}, _mojisyu);

mojiStr.call(Moji.prototype);

var moji = function (str) {
    return new Moji(mojisyu, str);
};

moji.addMojisyu = function (syu) {
    mojisyu = assign(mojisyu, syu);
};

module.exports = moji;

},{"./default_mojisyu":6,"./moji.core":7,"./moji.string":9,"object-assign":5}],9:[function(require,module,exports){
function mojiStr() {
    /**
     * trim
     * 行頭、行末の空白を削除
     */
    this.trim = function () {
        this._result = this._result.trim();
        return this;
    };

    /**
     * match
     * matchした文字列に変更
     * matchしなければなにもしない
     * @param {RegExp} regexp
     */
    this.match = function(regexp) {
        var result = this._result.match(regexp);

        if (!result || !regexp) return this;

        this._result = result.toString();
        return this;
    };


    this.replace = function(regexp, new_str) {
        this._result = this._result.replace(regexp, new_str);
        return this;
    };

    return this;
}

module.exports = mojiStr;

// slice
//substr
//toLocaleLowerCase
//toLocaleUpperCase
//toLowerCase
//toUpperCase
//trim
//trimLeft
//trimRight
//encodeURIComponent
//decodeURIComponent
},{}],10:[function(require,module,exports){
var base94, dataDir, djb, loader, normalize, setup, tokoro;

djb = require('../lib/djb');

base94 = require('../lib/base94');

normalize = require('../lib/normalize');

loader = require('../lib/loader');

dataDir = 'node_modules/tokoro/data';

setup = function(option) {
  if (option.data) {
    return dataDir = option.data.replace(/\/$/, '');
  }
};

tokoro = function(address, callback) {
  var digest, group, key;
  if (typeof address !== 'string') {
    setup(address);
    return;
  }
  key = normalize(address);
  digest = base94.encode(djb(key));
  group = Math.floor(djb(key).toString().slice(-4) / 5);
  return loader(dataDir + "/" + group + ".data", function(data) {
    var dg, i, len, lg, line, lt, ref, ref1;
    ref = data.split('\n');
    for (i = 0, len = ref.length; i < len; i++) {
      line = ref[i];
      ref1 = line.split(' '), dg = ref1[0], lt = ref1[1], lg = ref1[2];
      if (digest === dg) {
        return callback([base94.decode(lt) / 1000000, base94.decode(lg) / 1000000]);
      }
    }
  });
};

if (typeof exports === 'string') {
  module.exports = tokoro;
} else if (typeof define === 'function' && define.amd) {
  define(function() {
    return window.tokoro = tokoro;
  });
} else {
  window.tokoro = tokoro;
}


},{"../lib/base94":1,"../lib/djb":2,"../lib/loader":3,"../lib/normalize":4}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9saWIvYmFzZTk0LmNvZmZlZSIsIi9Vc2Vycy9jb2duaXRvbS9HaXQvdG9rb3JvL2xpYi9kamIuY29mZmVlIiwiL1VzZXJzL2NvZ25pdG9tL0dpdC90b2tvcm8vbGliL2xvYWRlci5jb2ZmZWUiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9saWIvbm9ybWFsaXplLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9tb2ppL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21vamkvc3JjL2RlZmF1bHRfbW9qaXN5dS5qcyIsIm5vZGVfbW9kdWxlcy9tb2ppL3NyYy9tb2ppLmNvcmUuanMiLCJub2RlX21vZHVsZXMvbW9qaS9zcmMvbW9qaS5qcyIsIm5vZGVfbW9kdWxlcy9tb2ppL3NyYy9tb2ppLnN0cmluZy5qcyIsIi9Vc2Vycy9jb2duaXRvbS9HaXQvdG9rb3JvL3NyYy90b2tvcm8uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxVQUFBLEdBQWE7O0FBQ2IsUUFBQSxHQUFhOztBQUViLE1BQUEsR0FBUyxTQUFDLEdBQUQ7QUFDUCxNQUFBO0VBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWDtFQUNOLEdBQUEsR0FBTTtBQUNOLFNBQU0sR0FBQSxHQUFNLENBQVo7SUFDRSxDQUFBLEdBQUksR0FBQSxHQUFNO0lBQ1YsQ0FBQSxHQUFJLE1BQU0sQ0FBQyxZQUFQLENBQW9CLFVBQUEsR0FBYSxDQUFqQztJQUNKLEdBQUEsR0FBTSxDQUFBLEdBQUk7SUFDVixHQUFBLEdBQU0sSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFBLEdBQU0sUUFBakI7RUFKUjtTQUtBO0FBUk87O0FBVVQsTUFBQSxHQUFT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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQSxJQUFBOztBQUFBLEdBQUEsR0FBWSxPQUFBLENBQVEsWUFBUjs7QUFDWixNQUFBLEdBQVksT0FBQSxDQUFRLGVBQVI7O0FBQ1osU0FBQSxHQUFZLE9BQUEsQ0FBUSxrQkFBUjs7QUFDWixNQUFBLEdBQVksT0FBQSxDQUFRLGVBQVI7O0FBRVosT0FBQSxHQUFVOztBQUVWLEtBQUEsR0FBUSxTQUFDLE1BQUQ7RUFDTixJQUEyQyxNQUFNLENBQUMsSUFBbEQ7V0FBQSxPQUFBLEdBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFaLENBQW9CLEtBQXBCLEVBQTJCLEVBQTNCLEVBQVY7O0FBRE07O0FBR1IsTUFBQSxHQUFTLFNBQUMsT0FBRCxFQUFVLFFBQVY7QUFDUCxNQUFBO0VBQUEsSUFBTyxPQUFPLE9BQVAsS0FBa0IsUUFBekI7SUFDRSxLQUFBLENBQU0sT0FBTjtBQUNBLFdBRkY7O0VBSUEsR0FBQSxHQUFTLFNBQUEsQ0FBVSxPQUFWO0VBQ1QsTUFBQSxHQUFTLE1BQU0sQ0FBQyxNQUFQLENBQWMsR0FBQSxDQUFJLEdBQUosQ0FBZDtFQUNULEtBQUEsR0FBUyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQUEsQ0FBSSxHQUFKLENBQVEsQ0FBQyxRQUFULENBQUEsQ0FBbUIsQ0FBQyxLQUFwQixDQUEwQixDQUFDLENBQTNCLENBQUEsR0FBZ0MsQ0FBM0M7U0FFVCxNQUFBLENBQVcsT0FBRixHQUFXLEdBQVgsR0FBZSxLQUFmLEdBQXNCLE9BQS9CLEVBQXVDLFNBQUMsSUFBRDtBQUNyQyxRQUFBO0FBQUE7QUFBQSxTQUFBLHFDQUFBOztNQUNFLE9BQWUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQWYsRUFBQyxZQUFELEVBQUssWUFBTCxFQUFTO01BQ1QsSUFBRyxNQUFBLEtBQVUsRUFBYjtBQUNFLGVBQU8sUUFBQSxDQUFTLENBQ2QsTUFBTSxDQUFDLE1BQVAsQ0FBYyxFQUFkLENBQUEsR0FBb0IsT0FETixFQUVkLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxDQUFBLEdBQW9CLE9BRk4sQ0FBVCxFQURUOztBQUZGO0VBRHFDLENBQXZDO0FBVE87O0FBa0JULElBQUcsT0FBTyxPQUFQLEtBQWtCLFFBQXJCO0VBQ0UsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FEbkI7Q0FBQSxNQUVLLElBQUcsT0FBTyxNQUFQLEtBQWlCLFVBQWpCLElBQStCLE1BQU0sQ0FBQyxHQUF6QztFQUNILE1BQUEsQ0FBTyxTQUFBO1dBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7RUFBbkIsQ0FBUCxFQURHO0NBQUEsTUFBQTtFQUdILE1BQU0sQ0FBQyxNQUFQLEdBQWdCLE9BSGIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiQ09ERV9CSUdJTiA9IDMzXG5CQVNFX05VTSAgID0gOTRcblxuZW5jb2RlID0gKG51bSkgLT5cbiAgbnVtID0gTWF0aC5yb3VuZCBudW1cbiAgcmV0ID0gJydcbiAgd2hpbGUgbnVtID4gMFxuICAgIGQgPSBudW0gJSBCQVNFX05VTVxuICAgIHMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlIENPREVfQklHSU4gKyBkXG4gICAgcmV0ID0gcyArIHJldFxuICAgIG51bSA9IE1hdGguZmxvb3IobnVtIC8gQkFTRV9OVU0pXG4gIHJldFxuXG5kZWNvZGUgPSAoc3RyKSAtPlxuICByZXQgPSAwXG4gIGZvciBpIGluIFswLi4uc3RyLmxlbmd0aF1cbiAgICBkaWdpdCA9IHN0ci5jaGFyQ29kZUF0KHN0ci5sZW5ndGggLSAxIC0gaSkgLSBDT0RFX0JJR0lOXG4gICAgcmV0ICs9IGRpZ2l0ICogTWF0aC5wb3cgQkFTRV9OVU0sIGlcbiAgcmV0XG5cbm1vZHVsZS5leHBvcnRzID1cbiAgZW5jb2RlOiBlbmNvZGVcbiAgZGVjb2RlOiBkZWNvZGVcbiIsImRqYiA9IChzKSAtPlxuICBzLnNwbGl0KCcnKS5yZWR1Y2UgKGgsIHN0cikgLT5cbiAgICAoKGggPDwgNSkgKyBoICsgc3RyLmNoYXJDb2RlQXQgMCkgPj4+IDBcbiAgLCA1MzgxXG5cbm1vZHVsZS5leHBvcnRzID0gZGpiXG4iLCJsb2FkZXIgPSAodXJsLCBjYWxsYmFjaykgLT5cbiAgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gLT5cbiAgICBpZiByZXEucmVhZHlTdGF0ZSA9PSA0ICYmIHJlcS5zdGF0dXMgPT0gMjAwXG4gICAgICBjYWxsYmFjayByZXEucmVzcG9uc2VUZXh0XG5cbiAgcmVxLm9wZW4gJ0dFVCcsIHVybCwgdHJ1ZVxuICByZXEuc2VuZCAnJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWRlclxuIiwiTW9qaSA9IHJlcXVpcmUgJ21vamknXG5cbkNISU5FU0VfTlVNUyA9ICfjgIfkuIDkuozkuInlm5vkupTlha3kuIPlhavkuZ0nXG5cbmNoaW5hID0gKHJhdykgLT5cbiAgbnVtID0gcGFyc2VJbnQgcmF3XG4gIHJldHVybiAnJyBpZiBudW0gPD0gMFxuICByZXR1cm4gQ0hJTkVTRV9OVU1TW251bV0gaWYgbnVtIDwgMTBcbiAgcmV0dXJuIENISU5FU0VfTlVNU1tNYXRoLmZsb29yKG51bSAvIDEwKV0gKyAn5Y2BJyArIGNoaW5hKG51bSAlIDEwKSBpZiBudW0gPCAxMDBcbiAgdGhyb3cgJ1RvbyBiaWcgZm9yIG1lLidcblxubm9ybWFsaXplID0gKHN0cikgLT5cbiAgbmV3IE1vamkgc3RyXG4gIC5jb252ZXJ0ICdISycsICdaSycgIyDjgqvjgr/jgqvjg4rjga/lhajop5JcbiAgLmNvbnZlcnQgJ1pFJywgJ0hFJyAjIOiLseaVsOOBr+WNiuinklxuICAuY29udmVydCAnWlMnLCAnSFMnICMg44K544Oa44O844K544Gv5Y2K6KeSXG4gIC50b1N0cmluZygpXG5cbiAgIyDnqbrnmb3jgpLpmaTljrtcbiAgLnJlcGxhY2UgL1xccysvZywgJydcblxuICAjIOS4geebruOBr+a8ouaVsOWtl1xuICAucmVwbGFjZSAvKFxcZCsp5LiB55uuLywgKF8sIG0xKSAtPiBcIiN7IGNoaW5hIG0xIH3kuIHnm65cIlxuXG4gICMg55Wq5Zyw5Lul6ZmN44Gv5YmK6ZmkXG4gIC5yZXBsYWNlIC8o5LiB55uuXFxkKylbXlxcZF0uKiQvLCAnJDEnXG5cbiAgIyDjgIzkuIHnm67jgI3ooajoqJhcbiAgLnJlcGxhY2UgLyhcXGQrKS0oXFxkKykvLCAoXywgbTEsIG0yKSAtPiBcIiN7IGNoaW5hIG0xIH3kuIHnm64jeyBtMn1cIlxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiBUb09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gb3duRW51bWVyYWJsZUtleXMob2JqKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gcHJvcElzRW51bWVyYWJsZS5jYWxsKG9iaiwga2V5KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciBrZXlzO1xuXHR2YXIgdG8gPSBUb09iamVjdCh0YXJnZXQpO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IGFyZ3VtZW50c1tzXTtcblx0XHRrZXlzID0gb3duRW51bWVyYWJsZUtleXMoT2JqZWN0KGZyb20pKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dG9ba2V5c1tpXV0gPSBmcm9tW2tleXNbaV1dO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdaRSc6IHtzdGFydDoweGZmMDEsIGVuZDoweGZmNWV9LCAvLyDlhajop5Loi7HmlbBcbiAgICAnSEUnOiB7c3RhcnQ6MHgwMDIxLCBlbmQ6MHgwMDdlfSwgLy8g5Y2K6KeS6Iux5pWwXG4gICAgJ0hHJzoge3N0YXJ0OjB4MzA0MSwgZW5kOjB4MzA5Nn0sIC8vIOOBsuOCieOBjOOBqlxuICAgICdLSyc6IHtzdGFydDoweDMwYTEsIGVuZDoweDMwZjZ9LCAvLyDjgqvjgr/jgqvjg4pcblxuICAgICdIUyc6IHtyZWdleHA6IC8oXFxzfFxcdTAwQTApL2csIGxpc3Q6WydcXHUwMDIwJywgJ1xcdTAwQTAnXX0sIC8vIOWNiuinkuOCueODmuODvOOCuVxuICAgICdaUyc6IHtyZWdleHA6IC8oXFx1MzAwMCkvZywgbGlzdDpbJ+OAgCcsICfjgIAnXX0sIC8v5YWo6KeS44K544Oa44O844K5XG5cbiAgICAnSEsnOiB7cmVnZXhwOiAvKFtcXHVmZjY2LVxcdWZmOWNdXFx1ZmY5ZSl8KFtcXHVmZjhhLVxcdWZmOGVdXFx1ZmY5Zil8KFtcXHVmZjYxLVxcdWZmOWZdKS9nLCAvLyDljYrop5Ljgqvjg4pcbiAgICAgICAgbGlzdDogWyfvvaEnLCAn772iJywgJ++9oycsICfvvaQnLCAn772lJywgJ++9picsICfvvacnLCAn772oJywgJ++9qScsICfvvaonLCAn772rJywgJ++9rCcsICfvva0nLCAn772uJywgJ++9rycsICfvvbAnLCAn772xJywgJ++9sicsICfvvbMnLCAn7720JywgJ++9tScsICfvvbYnLCAn7723JywgJ++9uCcsICfvvbknLCAn7726JywgJ++9uycsICfvvbwnLCAn7729JywgJ++9vicsICfvvb8nLCAn776AJywgJ+++gScsICfvvoInLCAn776DJywgJ+++hCcsICfvvoUnLCAn776GJywgJ+++hycsICfvvognLCAn776JJywgJ+++iicsICfvvosnLCAn776MJywgJ+++jScsICfvvo4nLCAn776PJywgJ+++kCcsICfvvpEnLCAn776SJywgJ+++kycsICfvvpQnLCAn776VJywgJ+++licsICfvvpcnLCAn776YJywgJ+++mScsICfvvponLCAn776bJywgJ+++nCcsICfvvp0nLCAn776eJywgJ+++nycsICfvvabvvp4nLCAn772z776eJywgJ++9tu++nicsICfvvbfvvp4nLCAn7724776eJywgJ++9ue++nicsICfvvbrvvp4nLCAn7727776eJywgJ++9vO++nicsICfvvb3vvp4nLCAn772+776eJywgJ++9v+++nicsICfvvoDvvp4nLCAn776B776eJywgJ+++gu++nicsICfvvoPvvp4nLCAn776E776eJywgJ+++iu++nicsICfvvorvvp8nLCAn776L776eJywgJ+++i+++nycsICfvvozvvp4nLCAn776M776fJywgJ+++je++nicsICfvvo3vvp8nLCAn776O776eJywgJ+++ju++nycsICfvvpzvvp4nXX0sXG4gICAgJ1pLJzoge3JlZ2V4cDogLyhbXFx1MzAwMS1cXHUzMGZjXSkvZywgIC8v5YWo6KeS44Kr44OKICjljYrop5Ljgqvjg4rlpInmj5vnlKgpXG4gICAgICAgIGxpc3Q6IFsn44CCJywgJ+OAjCcsICfjgI0nLCAn44CBJywgJ+ODuycsICfjg7InLCAn44KhJywgJ+OCoycsICfjgqUnLCAn44KnJywgJ+OCqScsICfjg6MnLCAn44OlJywgJ+ODpycsICfjg4MnLCAn44O8JywgJ+OCoicsICfjgqQnLCAn44KmJywgJ+OCqCcsICfjgqonLCAn44KrJywgJ+OCrScsICfjgq8nLCAn44KxJywgJ+OCsycsICfjgrUnLCAn44K3JywgJ+OCuScsICfjgrsnLCAn44K9JywgJ+OCvycsICfjg4EnLCAn44OEJywgJ+ODhicsICfjg4gnLCAn44OKJywgJ+ODiycsICfjg4wnLCAn44ONJywgJ+ODjicsICfjg48nLCAn44OSJywgJ+ODlScsICfjg5gnLCAn44ObJywgJ+ODnicsICfjg58nLCAn44OgJywgJ+ODoScsICfjg6InLCAn44OkJywgJ+ODpicsICfjg6gnLCAn44OpJywgJ+ODqicsICfjg6snLCAn44OsJywgJ+ODrScsICfjg68nLCAn44OzJywgJ+OCmycsICfjgpwnLCAn44O6JywgJ+ODtCcsICfjgqwnLCAn44KuJywgJ+OCsCcsICfjgrInLCAn44K0JywgJ+OCticsICfjgrgnLCAn44K6JywgJ+OCvCcsICfjgr4nLCAn44OAJywgJ+ODgicsICfjg4UnLCAn44OHJywgJ+ODiScsICfjg5AnLCAn44ORJywgJ+ODkycsICfjg5QnLCAn44OWJywgJ+ODlycsICfjg5knLCAn44OaJywgJ+ODnCcsICfjg50nLCAn44O3J119XG59OyIsIid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IG1vamlzeXVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqL1xuZnVuY3Rpb24gTW9qaShtb2ppc3l1LCBzdHIpIHtcbiAgICB0aGlzLm9yaWdpbiA9IHN0cjtcbiAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLm9yaWdpbjtcbiAgICB0aGlzLl9tb2ppc3l1ID0gbW9qaXN5dTtcbn1cblxuTW9qaS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdDtcbn07XG5cblxuLyoqXG4gKiBjb252ZXJ0XG4gKiDlpInmj5vjga7lrp/ooYxcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJvbV9zeXVtZWkg5aSJ5o+b5YmN44Gu5paH5a2X56iu5ZCNXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9fc3l1bWVpIOWkieWMluW+jOOBruaWh+Wtl+eoruWQjVxuICogQHJldHVybnMge01vaml9XG4gKi9cbk1vamkucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiBjb252ZXJ0KGZyb21fc3l1bWVpLCB0b19zeXVtZWkpIHtcbiAgICB2YXIgZnJvbV9tb2ppc3l1X2JvZHkgPSB0aGlzLl9tb2ppc3l1W2Zyb21fc3l1bWVpXTtcbiAgICB2YXIgdG9fbW9qaXN5dV9ib2R5ID0gdGhpcy5fbW9qaXN5dVt0b19zeXVtZWldO1xuXG4gICAgaWYgKHRoaXMuX21vamlzeXVUeXBlKGZyb21fbW9qaXN5dV9ib2R5KSA9PT0gJ3JhbmdlJyAmJiB0aGlzLl9tb2ppc3l1VHlwZSh0b19tb2ppc3l1X2JvZHkpID09PSAncmFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3JhbmdlQ29udmVydChmcm9tX21vamlzeXVfYm9keSwgdG9fbW9qaXN5dV9ib2R5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX21vamlzeXVUeXBlKGZyb21fbW9qaXN5dV9ib2R5KSA9PT0gJ3JlZ2V4cCcgJiYgdGhpcy5fbW9qaXN5dVR5cGUodG9fbW9qaXN5dV9ib2R5KSA9PT0gJ3JlZ2V4cCcpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmVnZXhwQ29udmVydChmcm9tX21vamlzeXVfYm9keSwgdG9fbW9qaXN5dV9ib2R5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuLyoqXG4gKiBfcmFuZ2VDb252ZXJ0XG4gKiBAcGFyYW0ge29iamVjdH0gZnJvbV9zeXVcbiAqIEBwYXJhbSB7b2JqZWN0fSB0b19zeXVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yYW5nZUNvbnZlcnQgPSBmdW5jdGlvbiBfcmFuZ2VDb252ZXJ0KGZyb21fc3l1LCB0b19zeXUpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0b19zeXUuc3RhcnQgLSBmcm9tX3N5dS5zdGFydDtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VNYXAoZnJvbV9zeXUsIGZ1bmN0aW9uIChtb2ppLCBpc19tYXRjaCwgY29kZSkge1xuICAgICAgICBpZiAoaXNfbWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgKyBkaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vamk7XG4gICAgfSkuam9pbignJyk7XG59O1xuXG4vKipcbiAqIF9yZWdleHBDb252ZXJ0XG4gKiBAcGFyYW0gZnJvbV9zeXVcbiAqIEBwYXJhbSB0b19zeXVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yZWdleHBDb252ZXJ0ID0gZnVuY3Rpb24gX3JlZ2V4cENvbnZlcnQoZnJvbV9zeXUsIHRvX3N5dSkge1xuICAgIHJldHVybiB0aGlzLl9yZWdleHBNYXAoZnJvbV9zeXUsIGZ1bmN0aW9uIChtb2ppLCBpc19tYXRjaCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCFpc19tYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vamk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvX3N5dS5saXN0W2luZGV4XTtcbiAgICB9KTtcbn07XG5cblxuLyoqXG4gKiAgZmlsdGVyXG4gKiAg5paH5a2X56iu44Gu44G/44Gr57We6L68XG4gKiAgQHBhcmFtIHtzdHJpbmd9IG1vamlzeXVfbmFtZSDntZ7jgorovrzjgb7jgozjgovmloflrZfnqK5cbiAqICBAcmV0dXJucyB7TW9qaX1cbiAqL1xuTW9qaS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gZmlsdGVyKG1vamlzeXVfbmFtZSkge1xuICAgIHZhciBtb2ppc3l1X2JvZHkgPSB0aGlzLl9tb2ppc3l1W21vamlzeXVfbmFtZV07XG5cbiAgICBpZiAodGhpcy5fbW9qaXN5dVR5cGUobW9qaXN5dV9ib2R5KSA9PT0gJ3JhbmdlJykge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yYW5nZUZpbHRlcihtb2ppc3l1X2JvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbW9qaXN5dVR5cGUobW9qaXN5dV9ib2R5KSA9PT0gJ3JlZ2V4cCcpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmVnZXhwRmlsdGVyKG1vamlzeXVfYm9keSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbi8qKlxuICogX3JhbmdlRmlsdGVyXG4gKiBAcGFyYW0gbW9qaXN5dVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JhbmdlRmlsdGVyID0gZnVuY3Rpb24gX3JhbmdlRmlsdGVyKG1vamlzeXUpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VNYXAobW9qaXN5dSwgZnVuY3Rpb24gKG1vamksIGlzX3JhbmdlKSB7XG4gICAgICAgIGlmIChpc19yYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vamk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH0pLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBfcmVnZXhwRmlsdGVyXG4gKiBAcGFyYW0gbW9qaXN5dVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JlZ2V4cEZpbHRlciA9IGZ1bmN0aW9uIF9yZWdleHBGaWx0ZXIobW9qaXN5dSkge1xuICAgIHZhciBtYXRjaF9tb2ppcyA9IFtdO1xuICAgIHRoaXMuX3JlZ2V4cE1hcChtb2ppc3l1LCBmdW5jdGlvbiAobW9qaSwgaXNfbWF0Y2gpIHtcbiAgICAgICAgaWYgKGlzX21hdGNoKSB7XG4gICAgICAgICAgICBtYXRjaF9tb2ppcy5wdXNoKG1vamkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoX21vamlzLmpvaW4oJycpO1xufTtcblxuXG4vKipcbiAqIHJlamVjdFxuICog5paH5a2X56iu44Gv5o6S6ZmkXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9qaXN5dV9uYW1lIOaOkumZpOOBleOCjOOCi+aWh+Wtl+eorlxuICogQHJldHVybnMge01vaml9XG4gKi9cbk1vamkucHJvdG90eXBlLnJlamVjdCA9IGZ1bmN0aW9uIHJlamVjdChtb2ppc3l1X25hbWUpIHtcbiAgICB2YXIgbW9qaXN5dV9ib2R5ID0gdGhpcy5fbW9qaXN5dVttb2ppc3l1X25hbWVdO1xuXG4gICAgaWYgKHRoaXMuX21vamlzeXVUeXBlKG1vamlzeXVfYm9keSkgPT09ICdyYW5nZScpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmFuZ2VSZWplY3QobW9qaXN5dV9ib2R5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX21vamlzeXVUeXBlKG1vamlzeXVfYm9keSkgPT09ICdyZWdleHAnKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3JlZ2V4cFJlamVjdChtb2ppc3l1X2JvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG4vKipcbiAqIF9yYW5nZVJlamVjdFxuICogQHBhcmFtIG1vamlzeXVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yYW5nZVJlamVjdCA9IGZ1bmN0aW9uIF9yYW5nZVJlamVjdChtb2ppc3l1KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlTWFwKG1vamlzeXUsIGZ1bmN0aW9uIChtb2ppLCBpc19yYW5nZSkge1xuICAgICAgICBpZiAoIWlzX3JhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9qaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfSkuam9pbignJyk7XG59O1xuXG4vKipcbiAqIF9yZWdleHBSZWplY3RcbiAqIEBwYXJhbSBtb2ppc3l1XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmVnZXhwUmVqZWN0ID0gZnVuY3Rpb24gX3JlZ2V4cFJlamVjdChtb2ppc3l1KSB7XG4gICAgdmFyIHJlamVjdF9tb2ppID0gdGhpcy5fcmVnZXhwRmlsdGVyKG1vamlzeXUpO1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHQucmVwbGFjZShyZWplY3RfbW9qaSwgJycpO1xufTtcblxuXG4vKipcbiAqIF9tb2ppc3l1VHlwZVxuICog5paH5a2X56iu44Gu44K/44Kk44OX44KS5Yik5YilXG4gKiByYW5nZSB8fCByZWdleHBcbiAqIEBwYXJhbSB7bW9qaXN5dX0gbW9qaXN5dSDmloflrZfnqK5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuTW9qaS5wcm90b3R5cGUuX21vamlzeXVUeXBlID0gZnVuY3Rpb24gX21vamlzeXVUeXBlKG1vamlzeXUpIHtcbiAgICBpZiAobW9qaXN5dS5zdGFydCAmJiBtb2ppc3l1LmVuZCkge1xuICAgICAgICByZXR1cm4gJ3JhbmdlJztcbiAgICB9XG4gICAgaWYgKG1vamlzeXUucmVnZXhwICYmIG1vamlzeXUubGlzdCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xufTtcblxuLyoqXG4gKiBfcmFuZ2VNYXBcbiAqIEBwYXJhbSB7b2JqZWN0fSBtb2ppc3l1IC0g5paH5a2X56iu44Kq44OW44K444Kn44Kv44OIXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmFuZ2VNYXAgPSBmdW5jdGlvbiBfcmFuZ2VNYXAobW9qaXN5dSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0LnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKG1vamkpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBtb2ppLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHZhciBpc19tYXRjaCA9IChjb2RlID49IG1vamlzeXUuc3RhcnQgJiYgY29kZSA8PSBtb2ppc3l1LmVuZCk7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIG1vamksIGlzX21hdGNoLCBjb2RlKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogX3JlZ2V4cE1hcFxuICogQHBhcmFtIHtvYmplY3R9IG1vamlzeXUgLSDmloflrZfnqK7jgqrjg5bjgrjjgqfjgq/jg4hcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JlZ2V4cE1hcCA9IGZ1bmN0aW9uIF9yZWdleHBNYXAobW9qaXN5dSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0LnJlcGxhY2UobW9qaXN5dS5yZWdleHAsIGZ1bmN0aW9uIChtb2ppKSB7XG4gICAgICAgIHZhciBpbmRleCA9IG1vamlzeXUubGlzdC5pbmRleE9mKG1vamkpO1xuICAgICAgICB2YXIgaXNfbWF0Y2ggPSBpbmRleCA+PSAwO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBtb2ppLCBpc19tYXRjaCwgaW5kZXgpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2ppOyIsIlwidXNlIHN0cmljdFwiO1xudmFyIE1vamkgPSByZXF1aXJlKFwiLi9tb2ppLmNvcmVcIik7XG52YXIgbW9qaVN0ciA9IHJlcXVpcmUoXCIuL21vamkuc3RyaW5nXCIpO1xudmFyIF9tb2ppc3l1ID0gcmVxdWlyZShcIi4vZGVmYXVsdF9tb2ppc3l1XCIpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCJvYmplY3QtYXNzaWduXCIpO1xudmFyIG1vamlzeXUgPSBhc3NpZ24oe30sIF9tb2ppc3l1KTtcblxubW9qaVN0ci5jYWxsKE1vamkucHJvdG90eXBlKTtcblxudmFyIG1vamkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBNb2ppKG1vamlzeXUsIHN0cik7XG59O1xuXG5tb2ppLmFkZE1vamlzeXUgPSBmdW5jdGlvbiAoc3l1KSB7XG4gICAgbW9qaXN5dSA9IGFzc2lnbihtb2ppc3l1LCBzeXUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2ppO1xuIiwiZnVuY3Rpb24gbW9qaVN0cigpIHtcbiAgICAvKipcbiAgICAgKiB0cmltXG4gICAgICog6KGM6aCt44CB6KGM5pyr44Gu56m655m944KS5YmK6ZmkXG4gICAgICovXG4gICAgdGhpcy50cmltID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yZXN1bHQudHJpbSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogbWF0Y2hcbiAgICAgKiBtYXRjaOOBl+OBn+aWh+Wtl+WIl+OBq+WkieabtFxuICAgICAqIG1hdGNo44GX44Gq44GR44KM44Gw44Gq44Gr44KC44GX44Gq44GEXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgICAqL1xuICAgIHRoaXMubWF0Y2ggPSBmdW5jdGlvbihyZWdleHApIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3Jlc3VsdC5tYXRjaChyZWdleHApO1xuXG4gICAgICAgIGlmICghcmVzdWx0IHx8ICFyZWdleHApIHJldHVybiB0aGlzO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5cbiAgICB0aGlzLnJlcGxhY2UgPSBmdW5jdGlvbihyZWdleHAsIG5ld19zdHIpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmVzdWx0LnJlcGxhY2UocmVnZXhwLCBuZXdfc3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vamlTdHI7XG5cbi8vIHNsaWNlXG4vL3N1YnN0clxuLy90b0xvY2FsZUxvd2VyQ2FzZVxuLy90b0xvY2FsZVVwcGVyQ2FzZVxuLy90b0xvd2VyQ2FzZVxuLy90b1VwcGVyQ2FzZVxuLy90cmltXG4vL3RyaW1MZWZ0XG4vL3RyaW1SaWdodFxuLy9lbmNvZGVVUklDb21wb25lbnRcbi8vZGVjb2RlVVJJQ29tcG9uZW50IiwiZGpiICAgICAgID0gcmVxdWlyZSAnLi4vbGliL2RqYidcbmJhc2U5NCAgICA9IHJlcXVpcmUgJy4uL2xpYi9iYXNlOTQnXG5ub3JtYWxpemUgPSByZXF1aXJlICcuLi9saWIvbm9ybWFsaXplJ1xubG9hZGVyICAgID0gcmVxdWlyZSAnLi4vbGliL2xvYWRlcidcblxuZGF0YURpciA9ICdub2RlX21vZHVsZXMvdG9rb3JvL2RhdGEnXG5cbnNldHVwID0gKG9wdGlvbikgLT5cbiAgZGF0YURpciA9IG9wdGlvbi5kYXRhLnJlcGxhY2UgL1xcLyQvLCAnJyBpZiBvcHRpb24uZGF0YVxuXG50b2tvcm8gPSAoYWRkcmVzcywgY2FsbGJhY2spIC0+XG4gIHVubGVzcyB0eXBlb2YgYWRkcmVzcyBpcyAnc3RyaW5nJ1xuICAgIHNldHVwIGFkZHJlc3NcbiAgICByZXR1cm5cblxuICBrZXkgICAgPSBub3JtYWxpemUgYWRkcmVzc1xuICBkaWdlc3QgPSBiYXNlOTQuZW5jb2RlIGRqYiBrZXlcbiAgZ3JvdXAgID0gTWF0aC5mbG9vcihkamIoa2V5KS50b1N0cmluZygpLnNsaWNlKC00KSAvIDUpXG5cbiAgbG9hZGVyIFwiI3sgZGF0YURpciB9LyN7IGdyb3VwIH0uZGF0YVwiLCAoZGF0YSkgLT5cbiAgICBmb3IgbGluZSBpbiBkYXRhLnNwbGl0ICdcXG4nXG4gICAgICBbZGcsIGx0LCBsZ10gPSBsaW5lLnNwbGl0ICcgJ1xuICAgICAgaWYgZGlnZXN0ID09IGRnXG4gICAgICAgIHJldHVybiBjYWxsYmFjayBbXG4gICAgICAgICAgYmFzZTk0LmRlY29kZShsdCkgLyAxMDAwMDAwXG4gICAgICAgICAgYmFzZTk0LmRlY29kZShsZykgLyAxMDAwMDAwXG4gICAgICAgIF1cblxuaWYgdHlwZW9mIGV4cG9ydHMgPT0gJ3N0cmluZydcbiAgbW9kdWxlLmV4cG9ydHMgPSB0b2tvcm9cbmVsc2UgaWYgdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWRcbiAgZGVmaW5lIC0+IHdpbmRvdy50b2tvcm8gPSB0b2tvcm9cbmVsc2VcbiAgd2luZG93LnRva29ybyA9IHRva29yb1xuIl19
