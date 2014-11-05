var events = require('events'),
  util = require('util'),
  should = require('should'),
  stream = require('stream'),
  readableStreamAccumulator = require('./../../../src/Panda/Modules/readableStreamAccumulator.js').construct

describe('readableStreamAccumulator', function(){

  var mockReadableStream = function(){
    var self = this
    stream.Readable.call(self)
    self._count = 0
  }
  util.inherits(mockReadableStream, stream.Readable)
  mockReadableStream.prototype._read = function(){
      var self = this
      self._count++
      
      if (self._count == 1){
          self.push(new Buffer("Hello\n"))
      } else if (self._count == 2){
          self.push(new Buffer("World\n"))
      } else {
          self.push(null)
          self.emit('end')
      }
  }



  describe('cache', function(){

    var readableStream, accumulator

    beforeEach(function(){
        readableStream = new mockReadableStream();
        accumulator = new readableStreamAccumulator(readableStream)
    })
    it('should be defined', function(){
      accumulator.cache.should.be.an.Array
    })

  })

  describe('on readableStream end event', function(){
    it('should raise data event and return cached buffer as single buffer', function(done){

      var accumulator = new readableStreamAccumulator(new mockReadableStream())

      accumulator.on('data', function(buffer){
        buffer.toString().should.equal("Hello\nWorld\n")
        done()
      })

    })
  })
  

})
