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
  }).replace(/(\d+)\-(\d+)\-(\d+)$/, function(_, m1, m2, m3) {
    return (china(m1)) + "丁目" + m2 + "-" + m3;
  }).replace(/([^d\-]\d+)\-.*$/, '$1');
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
    return callback('');
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9saWIvYmFzZTk0LmNvZmZlZSIsIi9Vc2Vycy9jb2duaXRvbS9HaXQvdG9rb3JvL2xpYi9kamIuY29mZmVlIiwiL1VzZXJzL2NvZ25pdG9tL0dpdC90b2tvcm8vbGliL2xvYWRlci5jb2ZmZWUiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9saWIvbm9ybWFsaXplLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9tb2ppL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21vamkvc3JjL2RlZmF1bHRfbW9qaXN5dS5qcyIsIm5vZGVfbW9kdWxlcy9tb2ppL3NyYy9tb2ppLmNvcmUuanMiLCJub2RlX21vZHVsZXMvbW9qaS9zcmMvbW9qaS5qcyIsIm5vZGVfbW9kdWxlcy9tb2ppL3NyYy9tb2ppLnN0cmluZy5qcyIsIi9Vc2Vycy9jb2duaXRvbS9HaXQvdG9rb3JvL3NyYy90b2tvcm8uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxVQUFBLEdBQWE7O0FBQ2IsUUFBQSxHQUFhOztBQUViLE1BQUEsR0FBUyxTQUFDLEdBQUQ7QUFDUCxNQUFBO0VBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWDtFQUNOLEdBQUEsR0FBTTtBQUNOLFNBQU0sR0FBQSxHQUFNLENBQVo7SUFDRSxDQUFBLEdBQUksR0FBQSxHQUFNO0lBQ1YsQ0FBQSxHQUFJLE1BQU0sQ0FBQyxZQUFQLENBQW9CLFVBQUEsR0FBYSxDQUFqQztJQUNKLEdBQUEsR0FBTSxDQUFBLEdBQUk7SUFDVixHQUFBLEdBQU0sSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFBLEdBQU0sUUFBakI7RUFKUjtTQUtBO0FBUk87O0FBVVQsTUFBQSxHQUFT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QUFtQlosTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUM5QmpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBLElBQUE7O0FBQUEsR0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSOztBQUNaLE1BQUEsR0FBWSxPQUFBLENBQVEsZUFBUjs7QUFDWixTQUFBLEdBQVksT0FBQSxDQUFRLGtCQUFSOztBQUNaLE1BQUEsR0FBWSxPQUFBLENBQVEsZUFBUjs7QUFFWixPQUFBLEdBQVU7O0FBRVYsS0FBQSxHQUFRLFNBQUMsTUFBRDtFQUNOLElBQTJDLE1BQU0sQ0FBQyxJQUFsRDtXQUFBLE9BQUEsR0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQVosQ0FBb0IsS0FBcEIsRUFBMkIsRUFBM0IsRUFBVjs7QUFETTs7QUFHUixNQUFBLEdBQVMsU0FBQyxPQUFELEVBQVUsUUFBVjtBQUNQLE1BQUE7RUFBQSxJQUFPLE9BQU8sT0FBUCxLQUFrQixRQUF6QjtJQUNFLEtBQUEsQ0FBTSxPQUFOO0FBQ0EsV0FGRjs7RUFJQSxHQUFBLEdBQVMsU0FBQSxDQUFVLE9BQVY7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLE1BQVAsQ0FBYyxHQUFBLENBQUksR0FBSixDQUFkO0VBQ1QsS0FBQSxHQUFTLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBQSxDQUFJLEdBQUosQ0FBUSxDQUFDLFFBQVQsQ0FBQSxDQUFtQixDQUFDLEtBQXBCLENBQTBCLENBQUMsQ0FBM0IsQ0FBQSxHQUFnQyxDQUEzQztTQUVULE1BQUEsQ0FBVyxPQUFGLEdBQVcsR0FBWCxHQUFlLEtBQWYsR0FBc0IsT0FBL0IsRUFBdUMsU0FBQyxJQUFEO0FBQ3JDLFFBQUE7QUFBQTtBQUFBLFNBQUEscUNBQUE7O01BQ0UsT0FBZSxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZixFQUFDLFlBQUQsRUFBSyxZQUFMLEVBQVM7TUFDVCxJQUFHLE1BQUEsS0FBVSxFQUFiO0FBQ0UsZUFBTyxRQUFBLENBQVMsQ0FDZCxNQUFNLENBQUMsTUFBUCxDQUFjLEVBQWQsQ0FBQSxHQUFvQixPQUROLEVBRWQsTUFBTSxDQUFDLE1BQVAsQ0FBYyxFQUFkLENBQUEsR0FBb0IsT0FGTixDQUFULEVBRFQ7O0FBRkY7V0FPQSxRQUFBLENBQVMsRUFBVDtFQVJxQyxDQUF2QztBQVRPOztBQW1CVCxJQUFHLE9BQU8sT0FBUCxLQUFrQixRQUFyQjtFQUNFLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BRG5CO0NBQUEsTUFFSyxJQUFHLE9BQU8sTUFBUCxLQUFpQixVQUFqQixJQUErQixNQUFNLENBQUMsR0FBekM7RUFDSCxNQUFBLENBQU8sU0FBQTtXQUFHLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0VBQW5CLENBQVAsRUFERztDQUFBLE1BQUE7RUFHSCxNQUFNLENBQUMsTUFBUCxHQUFnQixPQUhiIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkNPREVfQklHSU4gPSAzM1xuQkFTRV9OVU0gICA9IDk0XG5cbmVuY29kZSA9IChudW0pIC0+XG4gIG51bSA9IE1hdGgucm91bmQgbnVtXG4gIHJldCA9ICcnXG4gIHdoaWxlIG51bSA+IDBcbiAgICBkID0gbnVtICUgQkFTRV9OVU1cbiAgICBzID0gU3RyaW5nLmZyb21DaGFyQ29kZSBDT0RFX0JJR0lOICsgZFxuICAgIHJldCA9IHMgKyByZXRcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIEJBU0VfTlVNKVxuICByZXRcblxuZGVjb2RlID0gKHN0cikgLT5cbiAgcmV0ID0gMFxuICBmb3IgaSBpbiBbMC4uLnN0ci5sZW5ndGhdXG4gICAgZGlnaXQgPSBzdHIuY2hhckNvZGVBdChzdHIubGVuZ3RoIC0gMSAtIGkpIC0gQ09ERV9CSUdJTlxuICAgIHJldCArPSBkaWdpdCAqIE1hdGgucG93IEJBU0VfTlVNLCBpXG4gIHJldFxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGVuY29kZTogZW5jb2RlXG4gIGRlY29kZTogZGVjb2RlXG4iLCJkamIgPSAocykgLT5cbiAgcy5zcGxpdCgnJykucmVkdWNlIChoLCBzdHIpIC0+XG4gICAgKChoIDw8IDUpICsgaCArIHN0ci5jaGFyQ29kZUF0IDApID4+PiAwXG4gICwgNTM4MVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRqYlxuIiwibG9hZGVyID0gKHVybCwgY2FsbGJhY2spIC0+XG4gIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IC0+XG4gICAgaWYgcmVxLnJlYWR5U3RhdGUgPT0gNCAmJiByZXEuc3RhdHVzID09IDIwMFxuICAgICAgY2FsbGJhY2sgcmVxLnJlc3BvbnNlVGV4dFxuXG4gIHJlcS5vcGVuICdHRVQnLCB1cmwsIHRydWVcbiAgcmVxLnNlbmQgJydcblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkZXJcbiIsIk1vamkgPSByZXF1aXJlICdtb2ppJ1xuXG5DSElORVNFX05VTVMgPSAn44CH5LiA5LqM5LiJ5Zub5LqU5YWt5LiD5YWr5LmdJ1xuXG5jaGluYSA9IChyYXcpIC0+XG4gIG51bSA9IHBhcnNlSW50IHJhd1xuICByZXR1cm4gJycgaWYgbnVtIDw9IDBcbiAgcmV0dXJuIENISU5FU0VfTlVNU1tudW1dIGlmIG51bSA8IDEwXG4gIHJldHVybiBDSElORVNFX05VTVNbTWF0aC5mbG9vcihudW0gLyAxMCldICsgJ+WNgScgKyBjaGluYShudW0gJSAxMCkgaWYgbnVtIDwgMTAwXG4gIHRocm93ICdUb28gYmlnIGZvciBtZS4nXG5cbm5vcm1hbGl6ZSA9IChzdHIpIC0+XG4gIG5ldyBNb2ppIHN0clxuICAuY29udmVydCAnSEsnLCAnWksnICMg44Kr44K/44Kr44OK44Gv5YWo6KeSXG4gIC5jb252ZXJ0ICdaRScsICdIRScgIyDoi7HmlbDjga/ljYrop5JcbiAgLmNvbnZlcnQgJ1pTJywgJ0hTJyAjIOOCueODmuODvOOCueOBr+WNiuinklxuICAudG9TdHJpbmcoKVxuXG4gICMg56m655m944KS6Zmk5Y67XG4gIC5yZXBsYWNlIC9cXHMrL2csICcnXG5cbiAgIyDkuIHnm67jga/mvKLmlbDlrZdcbiAgLnJlcGxhY2UgLyhcXGQrKeS4geebri8sIChfLCBtMSkgLT4gXCIjeyBjaGluYSBtMSB95LiB55uuXCJcblxuICAjIDEtMi0zIOKGkiAx5LiB55uuMi0zXG4gIC5yZXBsYWNlIC8oXFxkKylcXC0oXFxkKylcXC0oXFxkKykkLywgKF8sIG0xLCBtMiwgbTMpIC0+IFwiI3sgY2hpbmEgbTEgfeS4geebriN7IG0yfS0jeyBtMyB9XCJcblxuICAjIOeVquWcsOS7pemZjeOBr+WJiumZpFxuICAucmVwbGFjZSAvKFteZFxcLV1cXGQrKVxcLS4qJC8sICckMSdcblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gVG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIG93bkVudW1lcmFibGVLZXlzKG9iaikge1xuXHR2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cblx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKTtcblx0fVxuXG5cdHJldHVybiBrZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuIHByb3BJc0VudW1lcmFibGUuY2FsbChvYmosIGtleSk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIga2V5cztcblx0dmFyIHRvID0gVG9PYmplY3QodGFyZ2V0KTtcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBhcmd1bWVudHNbc107XG5cdFx0a2V5cyA9IG93bkVudW1lcmFibGVLZXlzKE9iamVjdChmcm9tKSk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRvW2tleXNbaV1dID0gZnJvbVtrZXlzW2ldXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnWkUnOiB7c3RhcnQ6MHhmZjAxLCBlbmQ6MHhmZjVlfSwgLy8g5YWo6KeS6Iux5pWwXG4gICAgJ0hFJzoge3N0YXJ0OjB4MDAyMSwgZW5kOjB4MDA3ZX0sIC8vIOWNiuinkuiLseaVsFxuICAgICdIRyc6IHtzdGFydDoweDMwNDEsIGVuZDoweDMwOTZ9LCAvLyDjgbLjgonjgYzjgapcbiAgICAnS0snOiB7c3RhcnQ6MHgzMGExLCBlbmQ6MHgzMGY2fSwgLy8g44Kr44K/44Kr44OKXG5cbiAgICAnSFMnOiB7cmVnZXhwOiAvKFxcc3xcXHUwMEEwKS9nLCBsaXN0OlsnXFx1MDAyMCcsICdcXHUwMEEwJ119LCAvLyDljYrop5Ljgrnjg5rjg7zjgrlcbiAgICAnWlMnOiB7cmVnZXhwOiAvKFxcdTMwMDApL2csIGxpc3Q6WyfjgIAnLCAn44CAJ119LCAvL+WFqOinkuOCueODmuODvOOCuVxuXG4gICAgJ0hLJzoge3JlZ2V4cDogLyhbXFx1ZmY2Ni1cXHVmZjljXVxcdWZmOWUpfChbXFx1ZmY4YS1cXHVmZjhlXVxcdWZmOWYpfChbXFx1ZmY2MS1cXHVmZjlmXSkvZywgLy8g5Y2K6KeS44Kr44OKXG4gICAgICAgIGxpc3Q6IFsn772hJywgJ++9oicsICfvvaMnLCAn772kJywgJ++9pScsICfvvaYnLCAn772nJywgJ++9qCcsICfvvaknLCAn772qJywgJ++9qycsICfvvawnLCAn772tJywgJ++9ricsICfvva8nLCAn772wJywgJ++9sScsICfvvbInLCAn772zJywgJ++9tCcsICfvvbUnLCAn7722JywgJ++9tycsICfvvbgnLCAn7725JywgJ++9uicsICfvvbsnLCAn7728JywgJ++9vScsICfvvb4nLCAn772/JywgJ+++gCcsICfvvoEnLCAn776CJywgJ+++gycsICfvvoQnLCAn776FJywgJ+++hicsICfvvocnLCAn776IJywgJ+++iScsICfvvoonLCAn776LJywgJ+++jCcsICfvvo0nLCAn776OJywgJ+++jycsICfvvpAnLCAn776RJywgJ+++kicsICfvvpMnLCAn776UJywgJ+++lScsICfvvpYnLCAn776XJywgJ+++mCcsICfvvpknLCAn776aJywgJ+++mycsICfvvpwnLCAn776dJywgJ+++nicsICfvvp8nLCAn772m776eJywgJ++9s+++nicsICfvvbbvvp4nLCAn7723776eJywgJ++9uO++nicsICfvvbnvvp4nLCAn7726776eJywgJ++9u+++nicsICfvvbzvvp4nLCAn7729776eJywgJ++9vu++nicsICfvvb/vvp4nLCAn776A776eJywgJ+++ge++nicsICfvvoLvvp4nLCAn776D776eJywgJ+++hO++nicsICfvvorvvp4nLCAn776K776fJywgJ+++i+++nicsICfvvovvvp8nLCAn776M776eJywgJ+++jO++nycsICfvvo3vvp4nLCAn776N776fJywgJ+++ju++nicsICfvvo7vvp8nLCAn776c776eJ119LFxuICAgICdaSyc6IHtyZWdleHA6IC8oW1xcdTMwMDEtXFx1MzBmY10pL2csICAvL+WFqOinkuOCq+ODiiAo5Y2K6KeS44Kr44OK5aSJ5o+b55SoKVxuICAgICAgICBsaXN0OiBbJ+OAgicsICfjgIwnLCAn44CNJywgJ+OAgScsICfjg7snLCAn44OyJywgJ+OCoScsICfjgqMnLCAn44KlJywgJ+OCpycsICfjgqknLCAn44OjJywgJ+ODpScsICfjg6cnLCAn44ODJywgJ+ODvCcsICfjgqInLCAn44KkJywgJ+OCpicsICfjgqgnLCAn44KqJywgJ+OCqycsICfjgq0nLCAn44KvJywgJ+OCsScsICfjgrMnLCAn44K1JywgJ+OCtycsICfjgrknLCAn44K7JywgJ+OCvScsICfjgr8nLCAn44OBJywgJ+ODhCcsICfjg4YnLCAn44OIJywgJ+ODiicsICfjg4snLCAn44OMJywgJ+ODjScsICfjg44nLCAn44OPJywgJ+ODkicsICfjg5UnLCAn44OYJywgJ+ODmycsICfjg54nLCAn44OfJywgJ+ODoCcsICfjg6EnLCAn44OiJywgJ+ODpCcsICfjg6YnLCAn44OoJywgJ+ODqScsICfjg6onLCAn44OrJywgJ+ODrCcsICfjg60nLCAn44OvJywgJ+ODsycsICfjgpsnLCAn44KcJywgJ+ODuicsICfjg7QnLCAn44KsJywgJ+OCricsICfjgrAnLCAn44KyJywgJ+OCtCcsICfjgrYnLCAn44K4JywgJ+OCuicsICfjgrwnLCAn44K+JywgJ+ODgCcsICfjg4InLCAn44OFJywgJ+ODhycsICfjg4knLCAn44OQJywgJ+ODkScsICfjg5MnLCAn44OUJywgJ+ODlicsICfjg5cnLCAn44OZJywgJ+ODmicsICfjg5wnLCAn44OdJywgJ+ODtyddfVxufTsiLCIndXNlIHN0cmljdCc7XG5cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBtb2ppc3l1XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKi9cbmZ1bmN0aW9uIE1vamkobW9qaXN5dSwgc3RyKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBzdHI7XG4gICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5vcmlnaW47XG4gICAgdGhpcy5fbW9qaXN5dSA9IG1vamlzeXU7XG59XG5cbk1vamkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XG59O1xuXG5cbi8qKlxuICogY29udmVydFxuICog5aSJ5o+b44Gu5a6f6KGMXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZyb21fc3l1bWVpIOWkieaPm+WJjeOBruaWh+Wtl+eoruWQjVxuICogQHBhcmFtIHtzdHJpbmd9IHRvX3N5dW1laSDlpInljJblvozjga7mloflrZfnqK7lkI1cbiAqIEByZXR1cm5zIHtNb2ppfVxuICovXG5Nb2ppLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gY29udmVydChmcm9tX3N5dW1laSwgdG9fc3l1bWVpKSB7XG4gICAgdmFyIGZyb21fbW9qaXN5dV9ib2R5ID0gdGhpcy5fbW9qaXN5dVtmcm9tX3N5dW1laV07XG4gICAgdmFyIHRvX21vamlzeXVfYm9keSA9IHRoaXMuX21vamlzeXVbdG9fc3l1bWVpXTtcblxuICAgIGlmICh0aGlzLl9tb2ppc3l1VHlwZShmcm9tX21vamlzeXVfYm9keSkgPT09ICdyYW5nZScgJiYgdGhpcy5fbW9qaXN5dVR5cGUodG9fbW9qaXN5dV9ib2R5KSA9PT0gJ3JhbmdlJykge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yYW5nZUNvbnZlcnQoZnJvbV9tb2ppc3l1X2JvZHksIHRvX21vamlzeXVfYm9keSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2ppc3l1VHlwZShmcm9tX21vamlzeXVfYm9keSkgPT09ICdyZWdleHAnICYmIHRoaXMuX21vamlzeXVUeXBlKHRvX21vamlzeXVfYm9keSkgPT09ICdyZWdleHAnKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3JlZ2V4cENvbnZlcnQoZnJvbV9tb2ppc3l1X2JvZHksIHRvX21vamlzeXVfYm9keSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbi8qKlxuICogX3JhbmdlQ29udmVydFxuICogQHBhcmFtIHtvYmplY3R9IGZyb21fc3l1XG4gKiBAcGFyYW0ge29iamVjdH0gdG9fc3l1XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmFuZ2VDb252ZXJ0ID0gZnVuY3Rpb24gX3JhbmdlQ29udmVydChmcm9tX3N5dSwgdG9fc3l1KSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdG9fc3l1LnN0YXJ0IC0gZnJvbV9zeXUuc3RhcnQ7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlTWFwKGZyb21fc3l1LCBmdW5jdGlvbiAobW9qaSwgaXNfbWF0Y2gsIGNvZGUpIHtcbiAgICAgICAgaWYgKGlzX21hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgZGlzdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb2ppO1xuICAgIH0pLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBfcmVnZXhwQ29udmVydFxuICogQHBhcmFtIGZyb21fc3l1XG4gKiBAcGFyYW0gdG9fc3l1XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmVnZXhwQ29udmVydCA9IGZ1bmN0aW9uIF9yZWdleHBDb252ZXJ0KGZyb21fc3l1LCB0b19zeXUpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnZXhwTWFwKGZyb21fc3l1LCBmdW5jdGlvbiAobW9qaSwgaXNfbWF0Y2gsIGluZGV4KSB7XG4gICAgICAgIGlmICghaXNfbWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2ppO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b19zeXUubGlzdFtpbmRleF07XG4gICAgfSk7XG59O1xuXG5cbi8qKlxuICogIGZpbHRlclxuICogIOaWh+Wtl+eoruOBruOBv+OBq+e1nui+vFxuICogIEBwYXJhbSB7c3RyaW5nfSBtb2ppc3l1X25hbWUg57We44KK6L6844G+44KM44KL5paH5a2X56iuXG4gKiAgQHJldHVybnMge01vaml9XG4gKi9cbk1vamkucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIGZpbHRlcihtb2ppc3l1X25hbWUpIHtcbiAgICB2YXIgbW9qaXN5dV9ib2R5ID0gdGhpcy5fbW9qaXN5dVttb2ppc3l1X25hbWVdO1xuXG4gICAgaWYgKHRoaXMuX21vamlzeXVUeXBlKG1vamlzeXVfYm9keSkgPT09ICdyYW5nZScpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmFuZ2VGaWx0ZXIobW9qaXN5dV9ib2R5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX21vamlzeXVUeXBlKG1vamlzeXVfYm9keSkgPT09ICdyZWdleHAnKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3JlZ2V4cEZpbHRlcihtb2ppc3l1X2JvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG4vKipcbiAqIF9yYW5nZUZpbHRlclxuICogQHBhcmFtIG1vamlzeXVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yYW5nZUZpbHRlciA9IGZ1bmN0aW9uIF9yYW5nZUZpbHRlcihtb2ppc3l1KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlTWFwKG1vamlzeXUsIGZ1bmN0aW9uIChtb2ppLCBpc19yYW5nZSkge1xuICAgICAgICBpZiAoaXNfcmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2ppO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9KS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogX3JlZ2V4cEZpbHRlclxuICogQHBhcmFtIG1vamlzeXVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yZWdleHBGaWx0ZXIgPSBmdW5jdGlvbiBfcmVnZXhwRmlsdGVyKG1vamlzeXUpIHtcbiAgICB2YXIgbWF0Y2hfbW9qaXMgPSBbXTtcbiAgICB0aGlzLl9yZWdleHBNYXAobW9qaXN5dSwgZnVuY3Rpb24gKG1vamksIGlzX21hdGNoKSB7XG4gICAgICAgIGlmIChpc19tYXRjaCkge1xuICAgICAgICAgICAgbWF0Y2hfbW9qaXMucHVzaChtb2ppKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaF9tb2ppcy5qb2luKCcnKTtcbn07XG5cblxuLyoqXG4gKiByZWplY3RcbiAqIOaWh+Wtl+eoruOBr+aOkumZpFxuICogQHBhcmFtIHtzdHJpbmd9IG1vamlzeXVfbmFtZSDmjpLpmaTjgZXjgozjgovmloflrZfnqK5cbiAqIEByZXR1cm5zIHtNb2ppfVxuICovXG5Nb2ppLnByb3RvdHlwZS5yZWplY3QgPSBmdW5jdGlvbiByZWplY3QobW9qaXN5dV9uYW1lKSB7XG4gICAgdmFyIG1vamlzeXVfYm9keSA9IHRoaXMuX21vamlzeXVbbW9qaXN5dV9uYW1lXTtcblxuICAgIGlmICh0aGlzLl9tb2ppc3l1VHlwZShtb2ppc3l1X2JvZHkpID09PSAncmFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3JhbmdlUmVqZWN0KG1vamlzeXVfYm9keSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2ppc3l1VHlwZShtb2ppc3l1X2JvZHkpID09PSAncmVnZXhwJykge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yZWdleHBSZWplY3QobW9qaXN5dV9ib2R5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuLyoqXG4gKiBfcmFuZ2VSZWplY3RcbiAqIEBwYXJhbSBtb2ppc3l1XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmFuZ2VSZWplY3QgPSBmdW5jdGlvbiBfcmFuZ2VSZWplY3QobW9qaXN5dSkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZU1hcChtb2ppc3l1LCBmdW5jdGlvbiAobW9qaSwgaXNfcmFuZ2UpIHtcbiAgICAgICAgaWYgKCFpc19yYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vamk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH0pLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBfcmVnZXhwUmVqZWN0XG4gKiBAcGFyYW0gbW9qaXN5dVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JlZ2V4cFJlamVjdCA9IGZ1bmN0aW9uIF9yZWdleHBSZWplY3QobW9qaXN5dSkge1xuICAgIHZhciByZWplY3RfbW9qaSA9IHRoaXMuX3JlZ2V4cEZpbHRlcihtb2ppc3l1KTtcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0LnJlcGxhY2UocmVqZWN0X21vamksICcnKTtcbn07XG5cblxuLyoqXG4gKiBfbW9qaXN5dVR5cGVcbiAqIOaWh+Wtl+eoruOBruOCv+OCpOODl+OCkuWIpOWIpVxuICogcmFuZ2UgfHwgcmVnZXhwXG4gKiBAcGFyYW0ge21vamlzeXV9IG1vamlzeXUg5paH5a2X56iuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbk1vamkucHJvdG90eXBlLl9tb2ppc3l1VHlwZSA9IGZ1bmN0aW9uIF9tb2ppc3l1VHlwZShtb2ppc3l1KSB7XG4gICAgaWYgKG1vamlzeXUuc3RhcnQgJiYgbW9qaXN5dS5lbmQpIHtcbiAgICAgICAgcmV0dXJuICdyYW5nZSc7XG4gICAgfVxuICAgIGlmIChtb2ppc3l1LnJlZ2V4cCAmJiBtb2ppc3l1Lmxpc3QpIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn07XG5cbi8qKlxuICogX3JhbmdlTWFwXG4gKiBAcGFyYW0ge29iamVjdH0gbW9qaXN5dSAtIOaWh+Wtl+eoruOCquODluOCuOOCp+OCr+ODiFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JhbmdlTWFwID0gZnVuY3Rpb24gX3JhbmdlTWFwKG1vamlzeXUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdC5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChtb2ppKSB7XG4gICAgICAgIHZhciBjb2RlID0gbW9qaS5jaGFyQ29kZUF0KDApO1xuICAgICAgICB2YXIgaXNfbWF0Y2ggPSAoY29kZSA+PSBtb2ppc3l1LnN0YXJ0ICYmIGNvZGUgPD0gbW9qaXN5dS5lbmQpO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBtb2ppLCBpc19tYXRjaCwgY29kZSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIF9yZWdleHBNYXBcbiAqIEBwYXJhbSB7b2JqZWN0fSBtb2ppc3l1IC0g5paH5a2X56iu44Kq44OW44K444Kn44Kv44OIXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yZWdleHBNYXAgPSBmdW5jdGlvbiBfcmVnZXhwTWFwKG1vamlzeXUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdC5yZXBsYWNlKG1vamlzeXUucmVnZXhwLCBmdW5jdGlvbiAobW9qaSkge1xuICAgICAgICB2YXIgaW5kZXggPSBtb2ppc3l1Lmxpc3QuaW5kZXhPZihtb2ppKTtcbiAgICAgICAgdmFyIGlzX21hdGNoID0gaW5kZXggPj0gMDtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgbW9qaSwgaXNfbWF0Y2gsIGluZGV4KTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9qaTsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBNb2ppID0gcmVxdWlyZShcIi4vbW9qaS5jb3JlXCIpO1xudmFyIG1vamlTdHIgPSByZXF1aXJlKFwiLi9tb2ppLnN0cmluZ1wiKTtcbnZhciBfbW9qaXN5dSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRfbW9qaXN5dVwiKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwib2JqZWN0LWFzc2lnblwiKTtcbnZhciBtb2ppc3l1ID0gYXNzaWduKHt9LCBfbW9qaXN5dSk7XG5cbm1vamlTdHIuY2FsbChNb2ppLnByb3RvdHlwZSk7XG5cbnZhciBtb2ppID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBuZXcgTW9qaShtb2ppc3l1LCBzdHIpO1xufTtcblxubW9qaS5hZGRNb2ppc3l1ID0gZnVuY3Rpb24gKHN5dSkge1xuICAgIG1vamlzeXUgPSBhc3NpZ24obW9qaXN5dSwgc3l1KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbW9qaTtcbiIsImZ1bmN0aW9uIG1vamlTdHIoKSB7XG4gICAgLyoqXG4gICAgICogdHJpbVxuICAgICAqIOihjOmgreOAgeihjOacq+OBruepuueZveOCkuWJiumZpFxuICAgICAqL1xuICAgIHRoaXMudHJpbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmVzdWx0LnRyaW0oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIG1hdGNoXG4gICAgICogbWF0Y2jjgZfjgZ/mloflrZfliJfjgavlpInmm7RcbiAgICAgKiBtYXRjaOOBl+OBquOBkeOCjOOBsOOBquOBq+OCguOBl+OBquOBhFxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICAgKi9cbiAgICB0aGlzLm1hdGNoID0gZnVuY3Rpb24ocmVnZXhwKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9yZXN1bHQubWF0Y2gocmVnZXhwKTtcblxuICAgICAgICBpZiAoIXJlc3VsdCB8fCAhcmVnZXhwKSByZXR1cm4gdGhpcztcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuXG4gICAgdGhpcy5yZXBsYWNlID0gZnVuY3Rpb24ocmVnZXhwLCBuZXdfc3RyKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3Jlc3VsdC5yZXBsYWNlKHJlZ2V4cCwgbmV3X3N0cik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2ppU3RyO1xuXG4vLyBzbGljZVxuLy9zdWJzdHJcbi8vdG9Mb2NhbGVMb3dlckNhc2Vcbi8vdG9Mb2NhbGVVcHBlckNhc2Vcbi8vdG9Mb3dlckNhc2Vcbi8vdG9VcHBlckNhc2Vcbi8vdHJpbVxuLy90cmltTGVmdFxuLy90cmltUmlnaHRcbi8vZW5jb2RlVVJJQ29tcG9uZW50XG4vL2RlY29kZVVSSUNvbXBvbmVudCIsImRqYiAgICAgICA9IHJlcXVpcmUgJy4uL2xpYi9kamInXG5iYXNlOTQgICAgPSByZXF1aXJlICcuLi9saWIvYmFzZTk0J1xubm9ybWFsaXplID0gcmVxdWlyZSAnLi4vbGliL25vcm1hbGl6ZSdcbmxvYWRlciAgICA9IHJlcXVpcmUgJy4uL2xpYi9sb2FkZXInXG5cbmRhdGFEaXIgPSAnbm9kZV9tb2R1bGVzL3Rva29yby9kYXRhJ1xuXG5zZXR1cCA9IChvcHRpb24pIC0+XG4gIGRhdGFEaXIgPSBvcHRpb24uZGF0YS5yZXBsYWNlIC9cXC8kLywgJycgaWYgb3B0aW9uLmRhdGFcblxudG9rb3JvID0gKGFkZHJlc3MsIGNhbGxiYWNrKSAtPlxuICB1bmxlc3MgdHlwZW9mIGFkZHJlc3MgaXMgJ3N0cmluZydcbiAgICBzZXR1cCBhZGRyZXNzXG4gICAgcmV0dXJuXG5cbiAga2V5ICAgID0gbm9ybWFsaXplIGFkZHJlc3NcbiAgZGlnZXN0ID0gYmFzZTk0LmVuY29kZSBkamIga2V5XG4gIGdyb3VwICA9IE1hdGguZmxvb3IoZGpiKGtleSkudG9TdHJpbmcoKS5zbGljZSgtNCkgLyA1KVxuXG4gIGxvYWRlciBcIiN7IGRhdGFEaXIgfS8jeyBncm91cCB9LmRhdGFcIiwgKGRhdGEpIC0+XG4gICAgZm9yIGxpbmUgaW4gZGF0YS5zcGxpdCAnXFxuJ1xuICAgICAgW2RnLCBsdCwgbGddID0gbGluZS5zcGxpdCAnICdcbiAgICAgIGlmIGRpZ2VzdCA9PSBkZ1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sgW1xuICAgICAgICAgIGJhc2U5NC5kZWNvZGUobHQpIC8gMTAwMDAwMFxuICAgICAgICAgIGJhc2U5NC5kZWNvZGUobGcpIC8gMTAwMDAwMFxuICAgICAgICBdXG4gICAgY2FsbGJhY2sgJycgIyDopovjgaTjgYvjgonjgarjgYTloLTlkIjjga/nqbrmloflrZfliJfjgpLov5TjgZlcblxuaWYgdHlwZW9mIGV4cG9ydHMgPT0gJ3N0cmluZydcbiAgbW9kdWxlLmV4cG9ydHMgPSB0b2tvcm9cbmVsc2UgaWYgdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWRcbiAgZGVmaW5lIC0+IHdpbmRvdy50b2tvcm8gPSB0b2tvcm9cbmVsc2VcbiAgd2luZG93LnRva29ybyA9IHRva29yb1xuIl19
