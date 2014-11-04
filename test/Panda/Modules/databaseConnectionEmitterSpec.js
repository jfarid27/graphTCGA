var databaseConnection = require('./../../../src/Panda/Modules/databaseConnectionEmitter.js').construct,
    events = require('events'),
    util = require('util'),
    stream = require('stream')
    should = require('should');

describe('databaseConnectionEmitter', function(){

    var databaseConnectionEmitter, mockDataPath, mockAccumulator, mockReadStream, mockFileSystemUtil;

    beforeEach(function(){

        mockDataPath = ".";

        mockAccumulator = function(stream){
            var self = this
            events.EventEmitter.call(self)

            self.cache = []

            stream.on('data', function(data){
                self.cache.push(data)
            })

            stream.on('end', function(){
                self.emit('data', Buffer.concat(self.cache))
                self.emit('close')
            })
        }
        util.inherits(mockAccumulator, events.EventEmitter)

        mockReadStream = function(filepath) {
            var self = this
            stream.Readable.call(self)
            self._used = false

        }
        util.inherits(mockReadStream, stream.Readable)

        mockReadStream.prototype._read = function(){

            var self = this

            if (!self._used){
                self.push(new Buffer("foo"))
                self._used = true
            } else {
                self.push(null)
                self.emit('end')
            }

        }

        mockFileSystemUtil = {
            createReadStream: function(filepath){
                return new mockReadStream(filepath)
            }
        }

        databaseConnectionEmitter = new databaseConnection(mockDataPath, mockAccumulator, mockFileSystemUtil)
    })

    describe('on getFile event', function(){
        it('should create readStream using filesystemUtil and return buffer', function(done){

            var success = function(buffer){
                buffer.toString().should.eql("foo")
                done()
            }

            var error = function(msg){
                throw new Error(msg)
                done()
            }
            var params = {'folder': 'foo', 'file': 'bar'}

            databaseConnectionEmitter.emit('getFile', params, success, error)

        })

        describe('on stream close with no cache from accumulator', function(){
            it('should error out')
        })

    })
})



