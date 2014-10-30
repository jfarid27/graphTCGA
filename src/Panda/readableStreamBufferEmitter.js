var events = require('events'),
  util = require('util');

var readableStreamBufferEmitter = function(readableStream, callback){
    var self = this;
    events.EventEmitter.call(self)

    var stringBuffer = '';

    readableStream.on('data', function(chunk){
      stringBuffer = stringBuffer.concat(chunk.toString())
    })

    readableStream.once('close', function(){
      var arrayOfLines = stringBuffer.split('\n');
      var arrayOfLinesSplit = arrayOfLines.map(function(line){
        return line.split('\t')
      })
      self.emit('close', arrayOfLinesSplit);
      callback(arrayOfLinesSplit); 
    })

    readableStream.on('error', function(error){
      self.emit('error', error)
    })
};
util.inherits(readableStreamBufferEmitter, events.EventEmitter)

exports.readableStreamBufferEmitter = readableStreamBufferEmitter
exports.connectToStream = function(stream){
  return new readableStreamBufferEmitter(stream);
}
