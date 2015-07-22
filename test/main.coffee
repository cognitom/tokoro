should    = require 'should'
fs        = require 'fs'
path      = require 'path'
tokoro    = require '../src/'
djb       = require '../src/lib/djb'
base94    = require '../src/lib/base94'
normalize = require '../src/lib/normalize'

describe 'tokoro', ->

  @timeout 10000

  describe 'Libraries', ->

    it '35662696をbase94でエンコード', (done) ->
      base94.encode(35662696).should.equal "Ky'E"
      done()

    it "Ky'Eをbase94でデコード", (done) ->
      base94.decode("Ky'E").should.equal 35662696
      done()

    it "東京都世田谷区粕谷一丁目25のダイジェスト", (done) ->
      digest = base94.encode djb '東京都世田谷区粕谷一丁目25'
      digest.should.equal "BpA$'"
      done()

    it 'Math.round(132.832487 * 1000000) == 132832487', (done) ->
      Math.round(132.832487 * 1000000).should.equal 132832487
      done()

    it "東京都世田谷区代田6-11-14を正規化", (done) ->
      normalize('東京都世田谷区代田6-11-14').should.equal '東京都世田谷区代田六丁目11'
      done()

    it "東京都渋谷区元代々木町11-1を正規化", (done) ->
      normalize('東京都渋谷区元代々木町11-1').should.equal '東京都渋谷区元代々木町11'
      done()

  describe 'Node/io.js', ->

    it '東京都世田谷区粕谷一丁目25', (done) ->
      tokoro '東京都世田谷区粕谷一丁目25', (code) ->
        code[0].should.equal 35.662696
        code[1].should.equal 139.614003
        done()

    it '愛媛県松山市平井町1234', (done) ->
      tokoro '愛媛県松山市平井町1234', (code) ->
        code[0].should.equal 33.808677
        code[1].should.equal 132.832487
        done()

    it '東京都東京タワー(存在しない住所)', (done) ->
      tokoro '東京都東京タワー', (code) ->
        code.should.equal ''
        done()
