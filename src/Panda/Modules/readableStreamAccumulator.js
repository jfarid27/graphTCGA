var events = require('events'),
  util = require('util')

var readableStreamAccumulator = function(readableStream){

  var self = this
  events.EventEmitter.call(self)

  self.cache = []

  readableStream.on('data', function(chunk){
    self.cache.push(chunk)
    self.emit('receivedDataEvent')
  })

  readableStream.on('close', function(){
    self.emit('data', Buffer.concat(self.cache))
    self.emit('close')
  })

}
util.inherits(readableStreamAccumulator, events.EventEmitter)

module.exports.construct = readableStreamAccumulator
module.exports.get = function(readableStream){
  return new readableStreamAccumulator(readableStream)
}
