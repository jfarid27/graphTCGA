var pandaControllerClass = require('./../../../src/Panda/Controller/PandaController.js').construct,
    events = require('events'),
    util = require('util'),
    should = require('should')

describe('PandaController', function(){

    var pandaController,
        mockFolderStructureEmitterClass,
        mockFileReaderEmitterClass,
        mockFileReaderEmitter,
        mockFolderStructureEmitter,
        mockBufferToGraph,
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
                success(mockBuffer, params)
            })

        }
        util.inherits(mockFileReaderEmitterClass, events.EventEmitter)



        mockBufferToGraph = {

                    bufferToLines : function(buffer, params){
                        return "bufferToLines"
                    },
                    arrayToJson : function(){
                        return "arrayToJson"
                    },
                    arrayToTsv : function(){
                        return "arrayToTsv"
                    },
                    arrayToGephi : function(){
                        return "arrayToGephi"
                    },
                    arrayToCytoscape : function(){
                        return "arrayToCytoscape"
                    },

        }

        mockFileReaderEmitter = new mockFileReaderEmitterClass()
        mockFolderStructureEmitter = new mockFolderStructureEmitterClass()

        pandaController = new pandaControllerClass(mockFolderStructureEmitter,
                                                   mockFileReaderEmitter,
                                                   mockBufferToGraph)
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
                params.format.should.be.eql("zed")
                done()

            })

            var params = {file:"foo", folder:"bar", format:'zed'}

            var success = function(response){ return }

            var error = function(){ return }

            pandaController.emit('getFile', params, success, error)

        })

        it('should push file reading contents to parseBuffer', function(done){

            pandaController.on('parseBuffer', function(buffer, params, success, error){

                buffer.toString().should.be.eql(mockBufferString)

                done()

            })

            var params = {file:"foo", folder:"bar"}

            var success = function(response){ return }

            var error = function(){ return }

            pandaController.emit('getFile', params, success, error)

        })

    })

    describe('on parseBuffer event', function(){

        var expected = {
            json : "arrayToJson",
            tsv : "arrayToTsv",
            gephi : "arrayToGephi",
            cytoscape : "arrayToCytoscape"
        }

        var results = {
            json : undefined,
            tsv : undefined,
            gephi : undefined,
            cytoscape : undefined
        }



        describe('with format equals json', function(){
            beforeEach(function(){
                var params = {file:"foo", folder:"bar", format:'json'}

                var success = function(response){
                    results.json = response
                }

                var error = function(){
                    throw new Error("json failed")
                }

                pandaController.emit('getFile', params, success, error)
            })

            it('should call bufferToGraph.arrayToJson', function(){
                results.json.should.eql(expected.json)
            })
        })

        describe('with format equals tsv', function(){
            beforeEach(function(){
                var params = {file:"foo", folder:"bar", format:'tsv'}

                var success = function(response){
                    results.tsv = response
                }

                var error = function(){
                    throw new Error("tsv failed")
                }

                pandaController.emit('getFile', params, success, error)
            })

            it('should call bufferToGraph.arrayToTsv', function(){
                results.tsv.should.eql(expected.tsv)
            })
        })

        describe('with format equals gephi', function(){
            beforeEach(function(){
                var params = {file:"foo", folder:"bar", format:'gephi'}

                var success = function(response){
                    results.gephi = response
                }

                var error = function(){
                    throw new Error("gephi failed")
                }

                pandaController.emit('getFile', params, success, error)
            })

            it('should call bufferToGraph.arrayToGephi', function(){
                results.gephi.should.eql(expected.gephi)
            })
        })

        describe('with format equals cytoscape', function(){
            beforeEach(function(){
                var params = {file:"foo", folder:"bar", format:'cytoscape'}

                var success = function(response){
                    results.cytoscape = response
                }

                var error = function(){
                    throw new Error("cytoscape failed")
                }

                pandaController.emit('getFile', params, success, error)
            })

            it('should call bufferToGraph.arrayToCytoscape', function(){
                results.cytoscape.should.eql(expected.cytoscape)
            })
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
