var common = require('./helper/common')
var writer = require('../')
var test = require('tape')
var fs = require('fs')
var path = require('path')

var clean = common.clean()

test('can write', function (t) {
  var dir = path.join(__dirname,Date.now()+"_write")
  fs.mkdirSync(dir)

  clean.push(dir)

  var save = writer({dir:dir})

  save.write("hi",function(err){
    t.ok(!err,'should not have error')

    var buf = fs.readFileSync(path.join(dir,'0000000000.log'))
    t.equals(buf.length,3,'should have written 3 bytes. log message + delim')

    save.close()
    t.end()
    clean()
  })
})


