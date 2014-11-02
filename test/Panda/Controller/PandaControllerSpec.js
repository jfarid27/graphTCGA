var pandaControllerClass = require('./../../../src/Panda/Controller/PandaController.js').constructor,
    events = require('events'),
    util = require('util'),
    should = require('should')

describe('PandaController', function(){

    var pandaController,
        mockFolderStructureEmitterClass,
        mockFileReaderEmitterClass,
        mockFileReaderEmitter,
        mockFolderStructureEmitter,
        mockBufferToGraphEdges,
        mockBufferString,
        mockBuffer;

    beforeEach(function(){

        //FolderStructEmitter
        mockFolderStructureEmitterClass = function(){
            var self = this
            events.EventEmitter.call(self)

            self.on('getFolders', function(params, success, error){

                success(['foo', 'bar'])

            })

            self.on('getListFiles', function(params, success, error){

                success("foo")

            })

        }
        util.inherits(mockFolderStructureEmitterClass, events.EventEmitter)

        //FileReader
        mockBufferString = "foo\tbar\t0\t1\nbar\tfoo\t0\t1"
        mockBuffer = new Buffer(mockBufferString);
        mockFileReaderEmitterClass = function(readableStream){

            var self = this
            events.EventEmitter.call(self)

            self.on('getFile', function(params, success, error){
                success(mockBuffer)
            })

        }
        util.inherits(mockFileReaderEmitterClass, events.EventEmitter)



        mockBufferToGraphEdges = function(buffer){
            return [
                {source:'foo', target:'bar', weight:0, strength:1},
                {source:'zed', target:'foo', weight:0, strength:1},
            ]
        }

        mockFileReaderEmitter = new mockFileReaderEmitterClass()
        mockFolderStructureEmitter = new mockFolderStructureEmitterClass()

        pandaController = new pandaControllerClass(mockFolderStructureEmitter,
                                                   mockFileReaderEmitter,
                                                   mockBufferToGraphEdges)
    })

    describe('on getFile event', function(){

        var expected = [
                {source:'foo', target:'bar', weight:0, strength:1},
                {source:'zed', target:'foo', weight:0, strength:1},
            ],
            success,
            bufferStringResponse,
            response;

        it('should call getFile event on fileReader with given params', function(done){

            mockFileReaderEmitter.on('getFile', function(params, success, error){

                params.file.should.be.eql("foo")
                params.folder.should.be.eql("bar")
                done()

            })

            var params = {file:"foo", folder:"bar"}

            var success = function(response){ return }

            var error = function(){ return }

            pandaController.emit('getFile', params, success, error)

        })

        it('should push file reading contents to parseBuffer', function(done){

            pandaController.on('parseBuffer', function(params, success, error){

                params.buffer.toString().should.be.eql(mockBufferString)

                done()

            })

            var params = {file:"foo", folder:"bar"}

            var success = function(response){ return }

            var error = function(){ return }

            pandaController.emit('getFile', params, success, error)

        })

        it('should return buffer contents parsed to success function', function(done){

            var params = {file:"foo", folder:"bar"}

            var success = function(response){

                response.edges.should.containEql(expected[0])
                response.edges.should.containEql(expected[1])

                done()
            }

            var error = function(){ return }

            pandaController.emit('getFile', params, success, error)

        })
    })

    describe('on parseBuffer event', function(){

        var expected

        beforeEach(function(){
            expected = [
                {source:'foo', target:'bar', weight:0, strength:1},
                {source:'zed', target:'foo', weight:0, strength:1},
            ]
        })

        it('should parse given buffer with bufferToGraphEdges', function(done){

            var params = {
                    buffer: mockBuffer
                },
                error = function(){
                    throw new Error("parseBuffer event failed")
                },
                success = function(response){

                    response.edges.should.containEql(expected[0])
                    response.edges.should.containEql(expected[1])
                    done()

                }


            pandaController.emit('parseBuffer', params, success, error)
        })

    })

    describe('on getFolders event', function(){

        var expected

        beforeEach(function(){
            expected = ['foo', 'bar']
        })

        it("should call folderStructureEmitter's getFolders event", function(done){

            var success = function(){ done() }

            mockFolderStructureEmitter.on('getFolders', success)

            pandaController.emit('getFolders', {}, function(){return}, function(){return})
        })

        it('should pass given success to fileStructureEmitter', function(done){

            var params,
                error = function(){ throw new Error('panda listFiles errored out')},
                success = function(response){

                    response.should.containEql(expected[0])
                    response.should.containEql(expected[1])
                    done()
                }

            pandaController.emit('getFolders', params, success, error)

        })

    })

    describe('on getListFiles event', function(){

        var expected

        beforeEach(function(){
            expected = ['foo', 'bar']
        })


        it("should call folderStructureEmitter's getListFiles event", function(done){

            var success = function(){ done() }

            mockFolderStructureEmitter.on('getListFiles', success)

            pandaController.emit('getListFiles', {}, function(){ return }, function(){ return })
        })

        it('should pass given success to fileStructureEmitter', function(done){

            var params,
                error = function(){ throw new Error('panda listFiles errored out')},
                success = function(response){

                    response.should.eql("foo")
                    done()
                }

            pandaController.emit('getListFiles', params, success, error)

        })

    })

})
