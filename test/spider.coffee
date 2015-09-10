assert = require("assert")
should = require('chai').should()

util = require("../app/public/util")

describe "util", ->
  it  "util.root test", ->
    util.root.should.a('string')
    util.root.length.should.above 1

describe "mocha demo", ->
  it  "mocha demo1", ->
    2.should.a('number')
    4.should.above 1