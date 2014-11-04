var events = require('events'),
  util = require('util')

function readableStreamAccumulator(readableStream){

  var self = this
  events.EventEmitter.call(self)

  self.cache = []

  readableStream.on('data', function(chunk){
    self.cache.push(chunk)
    self.emit('receivedDataEvent')
  })

  readableStream.on('end', function(){
    self.emit('data', Buffer.concat(self.cache))
    self.emit('close')
  })

  readableStream.on('error', function(){
      self.emit('error')
      self.emit('close')
  })

}
util.inherits(readableStreamAccumulator, events.EventEmitter)

module.exports.construct = readableStreamAccumulator
module.exports.get = function(readableStream){
  return new readableStreamAccumulator(readableStream)
}
