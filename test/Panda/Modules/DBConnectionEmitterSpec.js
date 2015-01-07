var DBConnectionEmitter = require('./../../../src/Panda/Modules/DBConnectionEmitter').construct,
    should = require('should')

describe('DBConnectionEmitter', function () {

    var mockDBInstance,
        mockDBClient,
        mockFailingDBClient,
        mockCursorStream,
        DBConnection,
        mockResolvedQuery,
        mockCollectionFailingDBClient

    beforeEach(function () {

        mockCursorStream = {
            on: function (event, callback) {
                if (this.$registeredWatchers[event]) {
                    this.$registeredWatchers[event].push(callback)
                } else {
                    this.$registeredWatchers[event] = [callback]
                }
            },
            emit: function () {

                var self = this;

                var args = Array.prototype.slice.call(arguments)

                var event = args.shift()
                for (var k in self.$registeredWatchers[event]) {

                    self.$registeredWatchers[event][k].apply(self, args)
                }
            },
            $registeredWatchers: {}
        }

        mockResolvedQuery = {}

        mockDBInstance = {
            isOpen: true,
            close: function () {
                this.isOpen = false
                return
            },
            collection: function (collection, callback) {
                callback(undefined, {
                    find: function (query) {
                        mockResolvedQuery.$resolved = true
                        mockResolvedQuery.query = query
                        //mock stream
                        return {stream: function(){return mockCursorStream}}
                    }
                })
            }

        }

        mockFailingDBCollectionInstance = {
            close: function () {},
            collection: function (collection, callback) {
                callback({
                    msg: "Failing"
                }, undefined)
            },
        }

        mockDBClient = {
            connect: function (dburl, callback) {
                callback(undefined, mockDBInstance)
            },

        }

        mockFailingDBClient = {
            connect: function (dburl, callback) {
                callback({
                    msg: "Failing"
                }, undefined)
            }
        }

        mockCollectionFailingDBClient = {
            connect: function (dburl, callback) {
                callback(undefined, mockFailingDBCollectionInstance)
            }
        }


    })

    afterEach(function(){
        mockDBInstance = undefined
        mockDBClient = undefined
        mockFailingDBClient = undefined
        mockCursorStream = undefined
        DBConnection = undefined
        mockResolvedQuery = undefined
        mockCollectionFailingDBClient = undefined
    })

    describe('on getNearby event', function(){

        var cleanParams = {
            gene: "HNF1B",
            collection: "MABRCA"
        }

        describe('on database connection failure', function(){

            beforeEach(function(){
                DBConnection = new DBConnectionEmitter('foo', mockFailingDBClient)
            })

            afterEach(function(){
                DBConnection = undefined
            })


            it('should emit an error', function(done){
                DBConnection.on('error', function () {
                    done()
                })

                DBConnection.emit('getNearby', cleanParams)
            })
        })

        describe('on proper database connection', function(){

            describe('if collection for query does not exist', function(){

                beforeEach(function(){
                    DBConnection = new DBConnectionEmitter('foo', mockCollectionFailingDBClient)
                })

                afterEach(function(){
                    DBConnection = undefined
                })


                it('should emit an error', function(done){

                    DBConnection.on('error', function () {
                        done()
                    })

                    DBConnection.emit('getNearby', cleanParams)

                })
            })

            describe('if collection exists', function(){

                beforeEach(function(){
                    DBConnection = new DBConnectionEmitter('foo', mockDBClient)
                })

                afterEach(function(){
                    DBConnection = undefined
                })

                it('should query database using params', function(){
                    DBConnection.emit('getNearby', cleanParams)
                    mockResolvedQuery.$resolved.should.eql(true)
                })
                describe('on cursor stream data event', function(done){
                    it('should emit data', function(done){
                        DBConnection.on('data', function(data){
                            mockResolvedQuery.$resolved.should.eql(true)
                            data.should.eql('foo')
                            done()
                        })

                        DBConnection.emit('getNearby', cleanParams)

                        mockCursorStream.emit('data', 'foo')
                    })
                })

                describe('on cursor stream close event', function(){
                    it('should close the database', function(done){
                        DBConnection.on('close', function(data){
                            mockResolvedQuery.$resolved.should.eql(true)
                            done()
                        })

                        DBConnection.emit('getNearby', cleanParams)

                        mockCursorStream.emit('close')
                    })
                    it('should emit close', function(done){
                        DBConnection.on('close', function(){

                            mockDBInstance.isOpen.should.eql(false)

                            done()
                        })

                        DBConnection.emit('getNearby', cleanParams)

                        mockCursorStream.emit('close')
                    })
                })
            })
        })
    })

    describe('on getFile event', function () {

        describe('on database connection failure', function () {

            beforeEach(function(){
                DBConnection = new DBConnectionEmitter('foo', mockFailingDBClient)
            })

            afterEach(function(){
                DBConnection = undefined
            })

            it('should emit an error', function (done) {

                DBConnection.on('error', function () {
                    done()
                })

                DBConnection.emit('getFile', {zScoreThreshold: 0, collection:"bar"})
            })


        })

        describe('on proper database connection', function () {

            describe('if collection for query does not exist', function () {

                beforeEach(function(){
                    DBConnection = new DBConnectionEmitter('foo', mockCollectionFailingDBClient)
                })
                afterEach(function(){
                    DBConnection = undefined
                })
                it('should emit an error', function(done){
                    DBConnection.on('error', function () {
                        done()
                    })

                    DBConnection.emit('getFile', {zScoreThresholdMin: 2, zScoreThresholdMax: 2, collection:"bar"})
                })
            })

            describe('if collection exists', function () {

                beforeEach(function(){
                    DBConnection = new DBConnectionEmitter('foo', mockDBClient)
                })

                afterEach(function(){
                    DBConnection = undefined
                })

                it('should query database using getfile params', function(){

                    DBConnection.emit('getFile', {zScoreThresholdMin: 2, zScoreThresholdMax: 2, collection:"bar"})
                    mockResolvedQuery.$resolved.should.eql(true)
                })

                describe('on cursor stream data event', function () {


                    it('should emit data', function(done){


                        DBConnection.on('data', function(data){
                            mockResolvedQuery.$resolved.should.eql(true)
                            data.should.eql('foo')
                            done()
                        })

                        DBConnection.emit('getFile', {zScoreThresholdMin: 2, zScoreThresholdMax: 2, collection:"bar"})

                        mockCursorStream.emit('data', 'foo')


                    })
                })

                describe('on cursor stream close', function () {
                    it('should emit close', function(done){
                        DBConnection.on('close', function(data){
                            mockResolvedQuery.$resolved.should.eql(true)
                            done()
                        })

                        DBConnection.emit('getFile', {zScoreThresholdMin: 2, zScoreThresholdMax: 2, collection:"bar"})

                        mockCursorStream.emit('close')
                    })
                    it('should close db connection', function(done){

                        DBConnection.on('close', function(){

                            mockDBInstance.isOpen.should.eql(false)

                            done()
                        })

                        DBConnection.emit('getFile', {zScoreThresholdMin: 2, zScoreThresholdMax: 2, collection:"bar"})

                        mockCursorStream.emit('close')


                    })
                })
            })
        })

    })

})
