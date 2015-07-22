(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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

},{"./default_mojisyu":2,"./moji.core":3,"./moji.string":5,"object-assign":1}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
var djb;

djb = function(s) {
  return s.split('').reduce(function(h, str) {
    return ((h << 5) + h + str.charCodeAt(0)) >>> 0;
  }, 5381);
};

module.exports = djb;


},{}],8:[function(require,module,exports){
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


},{}],9:[function(require,module,exports){
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


},{"moji":4}],10:[function(require,module,exports){
var base94, dataDir, djb, loader, normalize, setup, tokoro;

djb = require('./lib/djb');

base94 = require('./lib/base94');

normalize = require('./lib/normalize');

loader = require('./lib/loader');

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


},{"./lib/base94":6,"./lib/djb":7,"./lib/loader":8,"./lib/normalize":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbW9qaS9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tb2ppL3NyYy9kZWZhdWx0X21vamlzeXUuanMiLCJub2RlX21vZHVsZXMvbW9qaS9zcmMvbW9qaS5jb3JlLmpzIiwibm9kZV9tb2R1bGVzL21vamkvc3JjL21vamkuanMiLCJub2RlX21vZHVsZXMvbW9qaS9zcmMvbW9qaS5zdHJpbmcuanMiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9zcmMvbGliL2Jhc2U5NC5jb2ZmZWUiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9zcmMvbGliL2RqYi5jb2ZmZWUiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9zcmMvbGliL2xvYWRlci5jb2ZmZWUiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9zcmMvbGliL25vcm1hbGl6ZS5jb2ZmZWUiLCIvVXNlcnMvY29nbml0b20vR2l0L3Rva29yby9zcmMvdG9rb3JvLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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UUFBQSxDQUFTLEVBQVQ7RUFScUMsQ0FBdkM7QUFUTzs7QUFtQlQsSUFBRyxPQUFPLE9BQVAsS0FBa0IsUUFBckI7RUFDRSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQURuQjtDQUFBLE1BRUssSUFBRyxPQUFPLE1BQVAsS0FBaUIsVUFBakIsSUFBK0IsTUFBTSxDQUFDLEdBQXpDO0VBQ0gsTUFBQSxDQUFPLFNBQUE7V0FBRyxNQUFNLENBQUMsTUFBUCxHQUFnQjtFQUFuQixDQUFQLEVBREc7Q0FBQSxNQUFBO0VBR0gsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsT0FIYiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIFRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBvd25FbnVtZXJhYmxlS2V5cyhvYmopIHtcblx0dmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuXG5cdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0a2V5cyA9IGtleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG5cdH1cblxuXHRyZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiBwcm9wSXNFbnVtZXJhYmxlLmNhbGwob2JqLCBrZXkpO1xuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIGtleXM7XG5cdHZhciB0byA9IFRvT2JqZWN0KHRhcmdldCk7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gYXJndW1lbnRzW3NdO1xuXHRcdGtleXMgPSBvd25FbnVtZXJhYmxlS2V5cyhPYmplY3QoZnJvbSkpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ1pFJzoge3N0YXJ0OjB4ZmYwMSwgZW5kOjB4ZmY1ZX0sIC8vIOWFqOinkuiLseaVsFxuICAgICdIRSc6IHtzdGFydDoweDAwMjEsIGVuZDoweDAwN2V9LCAvLyDljYrop5Loi7HmlbBcbiAgICAnSEcnOiB7c3RhcnQ6MHgzMDQxLCBlbmQ6MHgzMDk2fSwgLy8g44Gy44KJ44GM44GqXG4gICAgJ0tLJzoge3N0YXJ0OjB4MzBhMSwgZW5kOjB4MzBmNn0sIC8vIOOCq+OCv+OCq+ODilxuXG4gICAgJ0hTJzoge3JlZ2V4cDogLyhcXHN8XFx1MDBBMCkvZywgbGlzdDpbJ1xcdTAwMjAnLCAnXFx1MDBBMCddfSwgLy8g5Y2K6KeS44K544Oa44O844K5XG4gICAgJ1pTJzoge3JlZ2V4cDogLyhcXHUzMDAwKS9nLCBsaXN0Olsn44CAJywgJ+OAgCddfSwgLy/lhajop5Ljgrnjg5rjg7zjgrlcblxuICAgICdISyc6IHtyZWdleHA6IC8oW1xcdWZmNjYtXFx1ZmY5Y11cXHVmZjllKXwoW1xcdWZmOGEtXFx1ZmY4ZV1cXHVmZjlmKXwoW1xcdWZmNjEtXFx1ZmY5Zl0pL2csIC8vIOWNiuinkuOCq+ODilxuICAgICAgICBsaXN0OiBbJ++9oScsICfvvaInLCAn772jJywgJ++9pCcsICfvvaUnLCAn772mJywgJ++9pycsICfvvagnLCAn772pJywgJ++9qicsICfvvasnLCAn772sJywgJ++9rScsICfvva4nLCAn772vJywgJ++9sCcsICfvvbEnLCAn772yJywgJ++9sycsICfvvbQnLCAn7721JywgJ++9ticsICfvvbcnLCAn7724JywgJ++9uScsICfvvbonLCAn7727JywgJ++9vCcsICfvvb0nLCAn772+JywgJ++9vycsICfvvoAnLCAn776BJywgJ+++gicsICfvvoMnLCAn776EJywgJ+++hScsICfvvoYnLCAn776HJywgJ+++iCcsICfvvoknLCAn776KJywgJ+++iycsICfvvownLCAn776NJywgJ+++jicsICfvvo8nLCAn776QJywgJ+++kScsICfvvpInLCAn776TJywgJ+++lCcsICfvvpUnLCAn776WJywgJ+++lycsICfvvpgnLCAn776ZJywgJ+++micsICfvvpsnLCAn776cJywgJ+++nScsICfvvp4nLCAn776fJywgJ++9pu++nicsICfvvbPvvp4nLCAn7722776eJywgJ++9t+++nicsICfvvbjvvp4nLCAn7725776eJywgJ++9uu++nicsICfvvbvvvp4nLCAn7728776eJywgJ++9ve++nicsICfvvb7vvp4nLCAn772/776eJywgJ+++gO++nicsICfvvoHvvp4nLCAn776C776eJywgJ+++g+++nicsICfvvoTvvp4nLCAn776K776eJywgJ+++iu++nycsICfvvovvvp4nLCAn776L776fJywgJ+++jO++nicsICfvvozvvp8nLCAn776N776eJywgJ+++je++nycsICfvvo7vvp4nLCAn776O776fJywgJ+++nO++niddfSxcbiAgICAnWksnOiB7cmVnZXhwOiAvKFtcXHUzMDAxLVxcdTMwZmNdKS9nLCAgLy/lhajop5Ljgqvjg4ogKOWNiuinkuOCq+ODiuWkieaPm+eUqClcbiAgICAgICAgbGlzdDogWyfjgIInLCAn44CMJywgJ+OAjScsICfjgIEnLCAn44O7JywgJ+ODsicsICfjgqEnLCAn44KjJywgJ+OCpScsICfjgqcnLCAn44KpJywgJ+ODoycsICfjg6UnLCAn44OnJywgJ+ODgycsICfjg7wnLCAn44KiJywgJ+OCpCcsICfjgqYnLCAn44KoJywgJ+OCqicsICfjgqsnLCAn44KtJywgJ+OCrycsICfjgrEnLCAn44KzJywgJ+OCtScsICfjgrcnLCAn44K5JywgJ+OCuycsICfjgr0nLCAn44K/JywgJ+ODgScsICfjg4QnLCAn44OGJywgJ+ODiCcsICfjg4onLCAn44OLJywgJ+ODjCcsICfjg40nLCAn44OOJywgJ+ODjycsICfjg5InLCAn44OVJywgJ+ODmCcsICfjg5snLCAn44OeJywgJ+ODnycsICfjg6AnLCAn44OhJywgJ+ODoicsICfjg6QnLCAn44OmJywgJ+ODqCcsICfjg6knLCAn44OqJywgJ+ODqycsICfjg6wnLCAn44OtJywgJ+ODrycsICfjg7MnLCAn44KbJywgJ+OCnCcsICfjg7onLCAn44O0JywgJ+OCrCcsICfjgq4nLCAn44KwJywgJ+OCsicsICfjgrQnLCAn44K2JywgJ+OCuCcsICfjgronLCAn44K8JywgJ+OCvicsICfjg4AnLCAn44OCJywgJ+ODhScsICfjg4cnLCAn44OJJywgJ+ODkCcsICfjg5EnLCAn44OTJywgJ+ODlCcsICfjg5YnLCAn44OXJywgJ+ODmScsICfjg5onLCAn44OcJywgJ+ODnScsICfjg7cnXX1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gbW9qaXN5dVxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiBNb2ppKG1vamlzeXUsIHN0cikge1xuICAgIHRoaXMub3JpZ2luID0gc3RyO1xuICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMub3JpZ2luO1xuICAgIHRoaXMuX21vamlzeXUgPSBtb2ppc3l1O1xufVxuXG5Nb2ppLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0O1xufTtcblxuXG4vKipcbiAqIGNvbnZlcnRcbiAqIOWkieaPm+OBruWun+ihjFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tX3N5dW1laSDlpInmj5vliY3jga7mloflrZfnqK7lkI1cbiAqIEBwYXJhbSB7c3RyaW5nfSB0b19zeXVtZWkg5aSJ5YyW5b6M44Gu5paH5a2X56iu5ZCNXG4gKiBAcmV0dXJucyB7TW9qaX1cbiAqL1xuTW9qaS5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uIGNvbnZlcnQoZnJvbV9zeXVtZWksIHRvX3N5dW1laSkge1xuICAgIHZhciBmcm9tX21vamlzeXVfYm9keSA9IHRoaXMuX21vamlzeXVbZnJvbV9zeXVtZWldO1xuICAgIHZhciB0b19tb2ppc3l1X2JvZHkgPSB0aGlzLl9tb2ppc3l1W3RvX3N5dW1laV07XG5cbiAgICBpZiAodGhpcy5fbW9qaXN5dVR5cGUoZnJvbV9tb2ppc3l1X2JvZHkpID09PSAncmFuZ2UnICYmIHRoaXMuX21vamlzeXVUeXBlKHRvX21vamlzeXVfYm9keSkgPT09ICdyYW5nZScpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmFuZ2VDb252ZXJ0KGZyb21fbW9qaXN5dV9ib2R5LCB0b19tb2ppc3l1X2JvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbW9qaXN5dVR5cGUoZnJvbV9tb2ppc3l1X2JvZHkpID09PSAncmVnZXhwJyAmJiB0aGlzLl9tb2ppc3l1VHlwZSh0b19tb2ppc3l1X2JvZHkpID09PSAncmVnZXhwJykge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yZWdleHBDb252ZXJ0KGZyb21fbW9qaXN5dV9ib2R5LCB0b19tb2ppc3l1X2JvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG4vKipcbiAqIF9yYW5nZUNvbnZlcnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBmcm9tX3N5dVxuICogQHBhcmFtIHtvYmplY3R9IHRvX3N5dVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JhbmdlQ29udmVydCA9IGZ1bmN0aW9uIF9yYW5nZUNvbnZlcnQoZnJvbV9zeXUsIHRvX3N5dSkge1xuICAgIHZhciBkaXN0YW5jZSA9IHRvX3N5dS5zdGFydCAtIGZyb21fc3l1LnN0YXJ0O1xuICAgIHJldHVybiB0aGlzLl9yYW5nZU1hcChmcm9tX3N5dSwgZnVuY3Rpb24gKG1vamksIGlzX21hdGNoLCBjb2RlKSB7XG4gICAgICAgIGlmIChpc19tYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIGRpc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9qaTtcbiAgICB9KS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogX3JlZ2V4cENvbnZlcnRcbiAqIEBwYXJhbSBmcm9tX3N5dVxuICogQHBhcmFtIHRvX3N5dVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JlZ2V4cENvbnZlcnQgPSBmdW5jdGlvbiBfcmVnZXhwQ29udmVydChmcm9tX3N5dSwgdG9fc3l1KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZ2V4cE1hcChmcm9tX3N5dSwgZnVuY3Rpb24gKG1vamksIGlzX21hdGNoLCBpbmRleCkge1xuICAgICAgICBpZiAoIWlzX21hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9qaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9fc3l1Lmxpc3RbaW5kZXhdO1xuICAgIH0pO1xufTtcblxuXG4vKipcbiAqICBmaWx0ZXJcbiAqICDmloflrZfnqK7jga7jgb/jgavntZ7ovrxcbiAqICBAcGFyYW0ge3N0cmluZ30gbW9qaXN5dV9uYW1lIOe1nuOCiui+vOOBvuOCjOOCi+aWh+Wtl+eorlxuICogIEByZXR1cm5zIHtNb2ppfVxuICovXG5Nb2ppLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiBmaWx0ZXIobW9qaXN5dV9uYW1lKSB7XG4gICAgdmFyIG1vamlzeXVfYm9keSA9IHRoaXMuX21vamlzeXVbbW9qaXN5dV9uYW1lXTtcblxuICAgIGlmICh0aGlzLl9tb2ppc3l1VHlwZShtb2ppc3l1X2JvZHkpID09PSAncmFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3JhbmdlRmlsdGVyKG1vamlzeXVfYm9keSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tb2ppc3l1VHlwZShtb2ppc3l1X2JvZHkpID09PSAncmVnZXhwJykge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yZWdleHBGaWx0ZXIobW9qaXN5dV9ib2R5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuLyoqXG4gKiBfcmFuZ2VGaWx0ZXJcbiAqIEBwYXJhbSBtb2ppc3l1XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmFuZ2VGaWx0ZXIgPSBmdW5jdGlvbiBfcmFuZ2VGaWx0ZXIobW9qaXN5dSkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZU1hcChtb2ppc3l1LCBmdW5jdGlvbiAobW9qaSwgaXNfcmFuZ2UpIHtcbiAgICAgICAgaWYgKGlzX3JhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9qaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfSkuam9pbignJyk7XG59O1xuXG4vKipcbiAqIF9yZWdleHBGaWx0ZXJcbiAqIEBwYXJhbSBtb2ppc3l1XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmVnZXhwRmlsdGVyID0gZnVuY3Rpb24gX3JlZ2V4cEZpbHRlcihtb2ppc3l1KSB7XG4gICAgdmFyIG1hdGNoX21vamlzID0gW107XG4gICAgdGhpcy5fcmVnZXhwTWFwKG1vamlzeXUsIGZ1bmN0aW9uIChtb2ppLCBpc19tYXRjaCkge1xuICAgICAgICBpZiAoaXNfbWF0Y2gpIHtcbiAgICAgICAgICAgIG1hdGNoX21vamlzLnB1c2gobW9qaSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hfbW9qaXMuam9pbignJyk7XG59O1xuXG5cbi8qKlxuICogcmVqZWN0XG4gKiDmloflrZfnqK7jga/mjpLpmaRcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2ppc3l1X25hbWUg5o6S6Zmk44GV44KM44KL5paH5a2X56iuXG4gKiBAcmV0dXJucyB7TW9qaX1cbiAqL1xuTW9qaS5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24gcmVqZWN0KG1vamlzeXVfbmFtZSkge1xuICAgIHZhciBtb2ppc3l1X2JvZHkgPSB0aGlzLl9tb2ppc3l1W21vamlzeXVfbmFtZV07XG5cbiAgICBpZiAodGhpcy5fbW9qaXN5dVR5cGUobW9qaXN5dV9ib2R5KSA9PT0gJ3JhbmdlJykge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yYW5nZVJlamVjdChtb2ppc3l1X2JvZHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbW9qaXN5dVR5cGUobW9qaXN5dV9ib2R5KSA9PT0gJ3JlZ2V4cCcpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fcmVnZXhwUmVqZWN0KG1vamlzeXVfYm9keSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbi8qKlxuICogX3JhbmdlUmVqZWN0XG4gKiBAcGFyYW0gbW9qaXN5dVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTW9qaS5wcm90b3R5cGUuX3JhbmdlUmVqZWN0ID0gZnVuY3Rpb24gX3JhbmdlUmVqZWN0KG1vamlzeXUpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VNYXAobW9qaXN5dSwgZnVuY3Rpb24gKG1vamksIGlzX3JhbmdlKSB7XG4gICAgICAgIGlmICghaXNfcmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2ppO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9KS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogX3JlZ2V4cFJlamVjdFxuICogQHBhcmFtIG1vamlzeXVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yZWdleHBSZWplY3QgPSBmdW5jdGlvbiBfcmVnZXhwUmVqZWN0KG1vamlzeXUpIHtcbiAgICB2YXIgcmVqZWN0X21vamkgPSB0aGlzLl9yZWdleHBGaWx0ZXIobW9qaXN5dSk7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdC5yZXBsYWNlKHJlamVjdF9tb2ppLCAnJyk7XG59O1xuXG5cbi8qKlxuICogX21vamlzeXVUeXBlXG4gKiDmloflrZfnqK7jga7jgr/jgqTjg5fjgpLliKTliKVcbiAqIHJhbmdlIHx8IHJlZ2V4cFxuICogQHBhcmFtIHttb2ppc3l1fSBtb2ppc3l1IOaWh+Wtl+eorlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5Nb2ppLnByb3RvdHlwZS5fbW9qaXN5dVR5cGUgPSBmdW5jdGlvbiBfbW9qaXN5dVR5cGUobW9qaXN5dSkge1xuICAgIGlmIChtb2ppc3l1LnN0YXJ0ICYmIG1vamlzeXUuZW5kKSB7XG4gICAgICAgIHJldHVybiAncmFuZ2UnO1xuICAgIH1cbiAgICBpZiAobW9qaXN5dS5yZWdleHAgJiYgbW9qaXN5dS5saXN0KSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG59O1xuXG4vKipcbiAqIF9yYW5nZU1hcFxuICogQHBhcmFtIHtvYmplY3R9IG1vamlzeXUgLSDmloflrZfnqK7jgqrjg5bjgrjjgqfjgq/jg4hcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbk1vamkucHJvdG90eXBlLl9yYW5nZU1hcCA9IGZ1bmN0aW9uIF9yYW5nZU1hcChtb2ppc3l1LCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHQuc3BsaXQoJycpLm1hcChmdW5jdGlvbiAobW9qaSkge1xuICAgICAgICB2YXIgY29kZSA9IG1vamkuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgdmFyIGlzX21hdGNoID0gKGNvZGUgPj0gbW9qaXN5dS5zdGFydCAmJiBjb2RlIDw9IG1vamlzeXUuZW5kKTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgbW9qaSwgaXNfbWF0Y2gsIGNvZGUpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBfcmVnZXhwTWFwXG4gKiBAcGFyYW0ge29iamVjdH0gbW9qaXN5dSAtIOaWh+Wtl+eoruOCquODluOCuOOCp+OCr+ODiFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2ppLnByb3RvdHlwZS5fcmVnZXhwTWFwID0gZnVuY3Rpb24gX3JlZ2V4cE1hcChtb2ppc3l1LCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHQucmVwbGFjZShtb2ppc3l1LnJlZ2V4cCwgZnVuY3Rpb24gKG1vamkpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbW9qaXN5dS5saXN0LmluZGV4T2YobW9qaSk7XG4gICAgICAgIHZhciBpc19tYXRjaCA9IGluZGV4ID49IDA7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIG1vamksIGlzX21hdGNoLCBpbmRleCk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vamk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgTW9qaSA9IHJlcXVpcmUoXCIuL21vamkuY29yZVwiKTtcbnZhciBtb2ppU3RyID0gcmVxdWlyZShcIi4vbW9qaS5zdHJpbmdcIik7XG52YXIgX21vamlzeXUgPSByZXF1aXJlKFwiLi9kZWZhdWx0X21vamlzeXVcIik7XG52YXIgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG52YXIgbW9qaXN5dSA9IGFzc2lnbih7fSwgX21vamlzeXUpO1xuXG5tb2ppU3RyLmNhbGwoTW9qaS5wcm90b3R5cGUpO1xuXG52YXIgbW9qaSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gbmV3IE1vamkobW9qaXN5dSwgc3RyKTtcbn07XG5cbm1vamkuYWRkTW9qaXN5dSA9IGZ1bmN0aW9uIChzeXUpIHtcbiAgICBtb2ppc3l1ID0gYXNzaWduKG1vamlzeXUsIHN5dSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vamk7XG4iLCJmdW5jdGlvbiBtb2ppU3RyKCkge1xuICAgIC8qKlxuICAgICAqIHRyaW1cbiAgICAgKiDooYzpoK3jgIHooYzmnKvjga7nqbrnmb3jgpLliYrpmaRcbiAgICAgKi9cbiAgICB0aGlzLnRyaW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3Jlc3VsdC50cmltKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBtYXRjaFxuICAgICAqIG1hdGNo44GX44Gf5paH5a2X5YiX44Gr5aSJ5pu0XG4gICAgICogbWF0Y2jjgZfjgarjgZHjgozjgbDjgarjgavjgoLjgZfjgarjgYRcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAgICovXG4gICAgdGhpcy5tYXRjaCA9IGZ1bmN0aW9uKHJlZ2V4cCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fcmVzdWx0Lm1hdGNoKHJlZ2V4cCk7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQgfHwgIXJlZ2V4cCkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cblxuICAgIHRoaXMucmVwbGFjZSA9IGZ1bmN0aW9uKHJlZ2V4cCwgbmV3X3N0cikge1xuICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9yZXN1bHQucmVwbGFjZShyZWdleHAsIG5ld19zdHIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9qaVN0cjtcblxuLy8gc2xpY2Vcbi8vc3Vic3RyXG4vL3RvTG9jYWxlTG93ZXJDYXNlXG4vL3RvTG9jYWxlVXBwZXJDYXNlXG4vL3RvTG93ZXJDYXNlXG4vL3RvVXBwZXJDYXNlXG4vL3RyaW1cbi8vdHJpbUxlZnRcbi8vdHJpbVJpZ2h0XG4vL2VuY29kZVVSSUNvbXBvbmVudFxuLy9kZWNvZGVVUklDb21wb25lbnQiLCJDT0RFX0JJR0lOID0gMzNcbkJBU0VfTlVNICAgPSA5NFxuXG5lbmNvZGUgPSAobnVtKSAtPlxuICBudW0gPSBNYXRoLnJvdW5kIG51bVxuICByZXQgPSAnJ1xuICB3aGlsZSBudW0gPiAwXG4gICAgZCA9IG51bSAlIEJBU0VfTlVNXG4gICAgcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUgQ09ERV9CSUdJTiArIGRcbiAgICByZXQgPSBzICsgcmV0XG4gICAgbnVtID0gTWF0aC5mbG9vcihudW0gLyBCQVNFX05VTSlcbiAgcmV0XG5cbmRlY29kZSA9IChzdHIpIC0+XG4gIHJldCA9IDBcbiAgZm9yIGkgaW4gWzAuLi5zdHIubGVuZ3RoXVxuICAgIGRpZ2l0ID0gc3RyLmNoYXJDb2RlQXQoc3RyLmxlbmd0aCAtIDEgLSBpKSAtIENPREVfQklHSU5cbiAgICByZXQgKz0gZGlnaXQgKiBNYXRoLnBvdyBCQVNFX05VTSwgaVxuICByZXRcblxubW9kdWxlLmV4cG9ydHMgPVxuICBlbmNvZGU6IGVuY29kZVxuICBkZWNvZGU6IGRlY29kZVxuIiwiZGpiID0gKHMpIC0+XG4gIHMuc3BsaXQoJycpLnJlZHVjZSAoaCwgc3RyKSAtPlxuICAgICgoaCA8PCA1KSArIGggKyBzdHIuY2hhckNvZGVBdCAwKSA+Pj4gMFxuICAsIDUzODFcblxubW9kdWxlLmV4cG9ydHMgPSBkamJcbiIsImxvYWRlciA9ICh1cmwsIGNhbGxiYWNrKSAtPlxuICByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAtPlxuICAgIGlmIHJlcS5yZWFkeVN0YXRlID09IDQgJiYgcmVxLnN0YXR1cyA9PSAyMDBcbiAgICAgIGNhbGxiYWNrIHJlcS5yZXNwb25zZVRleHRcblxuICByZXEub3BlbiAnR0VUJywgdXJsLCB0cnVlXG4gIHJlcS5zZW5kICcnXG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZGVyXG4iLCJNb2ppID0gcmVxdWlyZSAnbW9qaSdcblxuQ0hJTkVTRV9OVU1TID0gJ+OAh+S4gOS6jOS4ieWbm+S6lOWFreS4g+WFq+S5nSdcblxuY2hpbmEgPSAocmF3KSAtPlxuICBudW0gPSBwYXJzZUludCByYXdcbiAgcmV0dXJuICcnIGlmIG51bSA8PSAwXG4gIHJldHVybiBDSElORVNFX05VTVNbbnVtXSBpZiBudW0gPCAxMFxuICByZXR1cm4gQ0hJTkVTRV9OVU1TW01hdGguZmxvb3IobnVtIC8gMTApXSArICfljYEnICsgY2hpbmEobnVtICUgMTApIGlmIG51bSA8IDEwMFxuICB0aHJvdyAnVG9vIGJpZyBmb3IgbWUuJ1xuXG5ub3JtYWxpemUgPSAoc3RyKSAtPlxuICBuZXcgTW9qaSBzdHJcbiAgLmNvbnZlcnQgJ0hLJywgJ1pLJyAjIOOCq+OCv+OCq+ODiuOBr+WFqOinklxuICAuY29udmVydCAnWkUnLCAnSEUnICMg6Iux5pWw44Gv5Y2K6KeSXG4gIC5jb252ZXJ0ICdaUycsICdIUycgIyDjgrnjg5rjg7zjgrnjga/ljYrop5JcbiAgLnRvU3RyaW5nKClcblxuICAjIOepuueZveOCkumZpOWOu1xuICAucmVwbGFjZSAvXFxzKy9nLCAnJ1xuXG4gICMg5LiB55uu44Gv5ryi5pWw5a2XXG4gIC5yZXBsYWNlIC8oXFxkKynkuIHnm64vLCAoXywgbTEpIC0+IFwiI3sgY2hpbmEgbTEgfeS4geebrlwiXG5cbiAgIyAxLTItMyDihpIgMeS4geebrjItM1xuICAucmVwbGFjZSAvKFxcZCspXFwtKFxcZCspXFwtKFxcZCspJC8sIChfLCBtMSwgbTIsIG0zKSAtPiBcIiN7IGNoaW5hIG0xIH3kuIHnm64jeyBtMn0tI3sgbTMgfVwiXG5cbiAgIyDnlarlnLDku6XpmY3jga/liYrpmaRcbiAgLnJlcGxhY2UgLyhbXmRcXC1dXFxkKylcXC0uKiQvLCAnJDEnXG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplXG4iLCJkamIgICAgICAgPSByZXF1aXJlICcuL2xpYi9kamInXG5iYXNlOTQgICAgPSByZXF1aXJlICcuL2xpYi9iYXNlOTQnXG5ub3JtYWxpemUgPSByZXF1aXJlICcuL2xpYi9ub3JtYWxpemUnXG5sb2FkZXIgICAgPSByZXF1aXJlICcuL2xpYi9sb2FkZXInXG5cbmRhdGFEaXIgPSAnbm9kZV9tb2R1bGVzL3Rva29yby9kYXRhJ1xuXG5zZXR1cCA9IChvcHRpb24pIC0+XG4gIGRhdGFEaXIgPSBvcHRpb24uZGF0YS5yZXBsYWNlIC9cXC8kLywgJycgaWYgb3B0aW9uLmRhdGFcblxudG9rb3JvID0gKGFkZHJlc3MsIGNhbGxiYWNrKSAtPlxuICB1bmxlc3MgdHlwZW9mIGFkZHJlc3MgaXMgJ3N0cmluZydcbiAgICBzZXR1cCBhZGRyZXNzXG4gICAgcmV0dXJuXG5cbiAga2V5ICAgID0gbm9ybWFsaXplIGFkZHJlc3NcbiAgZGlnZXN0ID0gYmFzZTk0LmVuY29kZSBkamIga2V5XG4gIGdyb3VwICA9IE1hdGguZmxvb3IoZGpiKGtleSkudG9TdHJpbmcoKS5zbGljZSgtNCkgLyA1KVxuXG4gIGxvYWRlciBcIiN7IGRhdGFEaXIgfS8jeyBncm91cCB9LmRhdGFcIiwgKGRhdGEpIC0+XG4gICAgZm9yIGxpbmUgaW4gZGF0YS5zcGxpdCAnXFxuJ1xuICAgICAgW2RnLCBsdCwgbGddID0gbGluZS5zcGxpdCAnICdcbiAgICAgIGlmIGRpZ2VzdCA9PSBkZ1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sgW1xuICAgICAgICAgIGJhc2U5NC5kZWNvZGUobHQpIC8gMTAwMDAwMFxuICAgICAgICAgIGJhc2U5NC5kZWNvZGUobGcpIC8gMTAwMDAwMFxuICAgICAgICBdXG4gICAgY2FsbGJhY2sgJycgIyDopovjgaTjgYvjgonjgarjgYTloLTlkIjjga/nqbrmloflrZfliJfjgpLov5TjgZlcblxuaWYgdHlwZW9mIGV4cG9ydHMgPT0gJ3N0cmluZydcbiAgbW9kdWxlLmV4cG9ydHMgPSB0b2tvcm9cbmVsc2UgaWYgdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWRcbiAgZGVmaW5lIC0+IHdpbmRvdy50b2tvcm8gPSB0b2tvcm9cbmVsc2VcbiAgd2luZG93LnRva29ybyA9IHRva29yb1xuIl19
