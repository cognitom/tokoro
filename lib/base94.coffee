CODE_BIGIN = 33
BASE_NUM   = 94

encode = (num) ->
  num = Math.floor num
  ret = ''
  while num != (d = num % BASE_NUM)
    s = String.fromCharCode CODE_BIGIN + d
    ret = s + ret
    num = (num - d) / BASE_NUM
  ret

decode = (str) ->
  ret = 0
  for i in [0...str.length]
    digit = str.slice(-1).charCodeAt(0) - CODE_BIGIN
    ret += digit * Math.pow BASE_NUM, i
  ret

module.exports =
  encode: encode
  decode: decode
