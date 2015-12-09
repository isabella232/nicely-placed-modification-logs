# nicely-placed-modification-logs
write modifications/events to append only logs. process those changes sequentially. like an _changes feed but in a file


```js
var dir = __dirname+"/data"
var modlogs = require('nicely-placed-modification-logs')
var logs = modlogs({dir:__dirname+"/data"})

logs.on("error",function(err){
  console.log(err!)
})

logs.write({data:"important stufff"},function(err){
  // saved!
})

var s = modlogs.read({dir:,since:0})

s.on('data',function(event){
  console.log(event.seq)
  // [log name]-[byte offset]
  // 000000000-0
  console.log(event.data)
  // "hi!\n"  
})

```

## API


