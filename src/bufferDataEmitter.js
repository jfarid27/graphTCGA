var events = require('events'),
  util = require('util');

var bufferDataEmitter = function(stream){
    var self = this;
    events.EventEmitter.call(self)

    var buffer = [];

    stream.on('data', function(chunk){
      buffer.push(chunk.toString())
    })

    stream.once('close', function(){
      self.emit('close', buffer); 
    })

    stream.on('error', function(){
      self.emit('error')
    })
};
util.inherits(bufferDataEmitter, events.EventEmitter)

exports.bufferDataEmitter = bufferedEmitter
exports.connectToStream = function(stream){
  return new bufferDataEmitter(stream);
}
