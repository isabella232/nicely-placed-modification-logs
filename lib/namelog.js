var path = require('path')
var bw = require('bytewise')
module.exports = nameLog

function nameLog (p, suffix, previous) {
  if (!previous) return path.join(p, padNum(0) + suffix)
  var name = path.basename(previous, suffix)
  return path.join(p, padNum(+unPad(name) + 1) + suffix)
}


// extract data like file offset from sequence id.
//
// the current pattern is
// [filename without suffix]-[offset bytewise encoded]
//
// the legacy pattern is 
// [offset]-[filename without suffix]
module.exports.parseSeq = parseSeq

function parseSeq (seq, dir, suffix) {
  if(!seq) return false;
  var parts = seq.split('-')
  var offset = 0
  var file = false;

  if(parts[0] && parts[0] !== '0' && parts[0][0] === '0'){
    // new style
    offset = bw.decode(parts[1])||0
    file = parts[0]
  } else {
    // old style 
    offset = +(seq.substr(0, seq.indexOf('-')) || 0)
    file = seq.substr(seq.indexOf('-') + 1)
  } 
  return {offset: offset, file: file, path: path.join(dir, file + suffix)}
}


module.exports.nextLog = nextLog

function nextLog (current,list) {
  var cur = list.order.indexOf(current)

  // find the next log file after the missing log.
  if(cur === -1 && current) {
    var next
    list.order.some(function(p){
      if(current < p) {
        next = p
        return true
      }
    })

    if(next) return next
  }

  return list.order[cur + 1]
}




function padNum (n, to) {
  to = to || 10
  n = n + ''
  while (n.length < to) n = '0' + n
  return n
}

function unPad (n) {
  return n.replace(/^[0]+/, '')
}
