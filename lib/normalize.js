(function() {
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

}).call(this);
