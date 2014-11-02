var events = require('events'),
  util = require('util'),
  should = require('should'),
  readableStreamAccumulator = require('./../../../src/Panda/Modules/readableStreamAccumulator.js').construct

describe('readableStreamAccumulator', function(){

  function mockReadableStream (){
    var self = this
    events.EventEmitter.call(self)
      
    var testString1 = "Hello\n"
    var testString2 = "World\n"
    var bufferedString1 = new Buffer(testString1)
    var bufferedString2 = new Buffer(testString2)

    self.on('floodData', function(){
      self.emit('data', bufferedString1)
      self.emit('data', bufferedString2)
      self.emit('close')
    })

    self.on('raiseSingleDataEvent', function(){
      self.emit('data', bufferedString1)
    })


  }
  util.inherits(mockReadableStream, events.EventEmitter)

  var readableStream, accumulator


  beforeEach(function(){
    readableStream = new mockReadableStream();
    accumulator = new readableStreamAccumulator(readableStream)
  }) 

  describe('cache', function(){
    it('should be defined', function(){
      accumulator.cache.should.be.an.Array
    })

  })

  describe('on readableStream data event', function(){
    it('should push buffer into cache list', function(done){
      
      accumulator.on('receivedDataEvent', function(){
        accumulator.cache.length.should.eql(1)
        accumulator.cache[0].toString().should.be.equal("Hello\n")
        done()
      })
  
      readableStream.emit('raiseSingleDataEvent')
      
    })
  })

  describe('on readableStream close event', function(){
    it('should raise close event', function(done){

      accumulator.on('close', function(){
        done()
      })    

      readableStream.emit('close')


    })
    it('should raise data event and return cached buffer as single buffer', function(done){

      var bufferToString

      accumulator.on('data', function(chunk){
        bufferToString = chunk.toString()
      })

      accumulator.on('close', function(){
        
        bufferToString.should.equal("Hello\nWorld\n")
        done()
      })

      readableStream.emit('floodData')

    })
  })
  

})
