var events = require('events'),
  util = require('util');

var bufferDataEmitter = function(stream){
    var self = this;
    events.EventEmitter.call(self)

    var stringBuffer = '';

    stream.on('data', function(chunk){
      stringBuffer = stringBuffer.concat(chunk.toString())
    })

    stream.once('close', function(){
      console.log(stringBuffer)
      var arrayOfLines = stringBuffer.split('\n');
      var arrayOfLinesSplit = arrayOfLines.map(function(line){
        return line.split('\t')
      })
      self.emit('close', arrayOfLinesSplit); 
    })

    stream.on('error', function(error){
      self.emit('error', error)
    })
};
util.inherits(bufferDataEmitter, events.EventEmitter)

exports.bufferDataEmitter = bufferDataEmitter
exports.connectToStream = function(stream){
  return new bufferDataEmitter(stream);
}
