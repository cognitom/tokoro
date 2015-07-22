CODE_BIGIN = 33
BASE_NUM   = 94

encode = (num) ->
  num = Math.round num
  ret = ''
  while num > 0
    d = num % BASE_NUM
    s = String.fromCharCode CODE_BIGIN + d
    ret = s + ret
    num = Math.floor(num / BASE_NUM)
  ret

decode = (str) ->
  ret = 0
  for i in [0...str.length]
    digit = str.charCodeAt(str.length - 1 - i) - CODE_BIGIN
    ret += digit * Math.pow BASE_NUM, i
  ret

module.exports =
  encode: encode
  decode: decode
