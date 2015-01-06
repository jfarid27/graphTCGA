var pandaControllerClass = require('./../../../src/Panda/Controller/PandaController.js').construct,
    events = require('events'),
    util = require('util'),
    should = require('should')

describe('PandaController', function(){

    var mockDbParseModule,
        mockFolderStructureEmitter,
        mockDBConnectionEmitter,
        mockGeneCheckEmitter

    beforeEach(function(){

        mockDbParseModule = {
            parse: function(){return 'foo'}
        }

        mockFolderStructureEmitter = {
             on: function(event, callback){
                if(this.$registeredWatchers[event]){
                    this.$registeredWatchers[event].push(callback)
                } else {
                    this.$registeredWatchers[event] = [callback]
                }
            },
            emit: function(){
                var self = this;
                var args = Array.prototype.slice.call(arguments)
                var event = args.shift()
                for (var k in self.$registeredWatchers[event]) {
                    self.$registeredWatchers[event][k].apply(self, args)
                }
            },
            $registeredWatchers: {}
        }

        mockGeneCheckEmitter = {
             on: function(event, callback){
                if(this.$registeredWatchers[event]){
                    this.$registeredWatchers[event].push(callback)
                } else {
                    this.$registeredWatchers[event] = [callback]
                }
            },
            emit: function(){
                var self = this;
                var args = Array.prototype.slice.call(arguments)
                var event = args.shift()
                for (var k in self.$registeredWatchers[event]) {
                    self.$registeredWatchers[event][k].apply(self, args)
                }
            },
            $registeredWatchers: {}
        }

        mockDBConnectionEmitter = {
            on: function(event, callback){
                if(this.$registeredWatchers[event]){
                    this.$registeredWatchers[event].push(callback)
                } else {
                    this.$registeredWatchers[event] = [callback]
                }
            },
            emit: function(){
                var self = this;
                var args = Array.prototype.slice.call(arguments)
                var event = args.shift()
                for (var k in self.$registeredWatchers[event]) {
                    self.$registeredWatchers[event][k].apply(self, args)
                }
            },
            $registeredWatchers: {}
        }
    })

    afterEach(function(){

        mockDbParseModule = undefined
        mockFolderStructureEmitter = undefined
        mockDBConnectionEmitter = undefined
        mockGeneCheckEmitter = undefined

    })

    describe('on getFile event', function(){


        var Controller

        beforeEach(function(){
            Controller = new pandaControllerClass(mockFolderStructureEmitter, mockDBConnectionEmitter, mockDbParseModule, mockGeneCheckEmitter)
        })

        it('should emit getFile on dbConnection', function(done){
            mockDBConnectionEmitter.on('getFile', function(params){
                params.data.should.eql('foo')
                done()
            })

            Controller.emit('getFile', {data:'foo'})
        })

        describe('on DBConnection data event', function(){

            beforeEach(function(){
                Controller.emit('getFile', {data:'foo'})
            })

            it('should buffer data', function(){
                mockDBConnectionEmitter.emit('data', 'foo')
                Controller.buffer.length.should.eql(1)
                Controller.buffer.should.containEql('foo')
            })
        })

        describe('on DBConnection close event', function(){

            var result

            afterEach(function(){
                result = undefined
            })

            it('should emit data event with parsed data', function(done){

                Controller.on('data', function(data){
                    data.should.eql('foo')
                })

                Controller.on('close', function(){
                    done()
                })

                Controller.emit('getFile', {data:'foo'})

                mockDBConnectionEmitter.emit('close')


            })
        })

        describe('on DBConnection error event', function(){
            it('should call error', function(done){

                Controller.on('error', function(){ done() })
                Controller.emit('getFile', {data:'foo'})

                mockDBConnectionEmitter.emit('error')
            })
        })
    })

    describe('on getFolders event', function(){

        var Controller

        beforeEach(function(){
            Controller = new pandaControllerClass(mockFolderStructureEmitter, mockDBConnectionEmitter, mockDbParseModule, mockGeneCheckEmitter)
        })


        it('should emit getFolder on folderStructureEmitter', function(done){

            mockFolderStructureEmitter.on('getFolders', function(){
                done()
            })

            Controller.emit('getFolders')
        })
    })

    describe('on geneCheck event', function(){

        var Controller

        beforeEach(function(){
            Controller = new pandaControllerClass(mockFolderStructureEmitter, mockDBConnectionEmitter, mockDbParseModule, mockGeneCheckEmitter)
        })

        it('should emit geneCheck event on geneCheckEmitter', function(done){

            mockGeneCheckEmitter.on('geneCheck', function(params){
                params.collection.should.eql('foo')
                params.zScoreThreshold.should.eql(1)
                done()
            })

            Controller.emit('geneCheck', {collection:'foo', zScoreThreshold: 1})

        })

        describe('on geneCheckEmitter data event', function(){

            beforeEach(function(){
                Controller.emit('geneCheck', {collection:'foo', zScoreThreshold: 1})

            })

            it('should emit data event with returned data', function(done){

                Controller.on('data', function(data){
                    data.foo.should.eql(true)
                    done()
                })

                mockGeneCheckEmitter.emit('data', {'foo': true})

            })
        })

        describe('on geneCheckEmitter close event', function(){

            beforeEach(function(){
                Controller.emit('geneCheck', {collection:'foo', zScoreThreshold: 1})
            })

            it('should emit close event', function(done){
                Controller.on('close', function(data){
                    done()
                })

                mockGeneCheckEmitter.emit('close')
            })
        })

        describe('on geneCheckEmitter error event', function(){

            beforeEach(function(){
                Controller.emit('geneCheck', {collection:'foo', zScoreThreshold: 1})
            })

            it('should emit error event', function(done){

                Controller.on('error', function(data){
                    done()
                })

                mockGeneCheckEmitter.emit('error')

            })
        })

    })

})
