describe('geneCheckEmitter', function(){

    var geneCheckEmitterClass = require('./../../../src/Panda/Modules/geneCheckEmitter').construct,
        should = require('should')

    var geneCheckEmitter, dbconnectionemitter

    beforeEach(function(){

        dbconnectionemitter = {
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

        geneCheckEmitter = new geneCheckEmitterClass(dbconnectionemitter)
    })

    describe('on geneCheck event', function(){

        var falseParams, cleanParams

        beforeEach(function(){
            falseParams = {
                'foo': 'bar'
            }

            cleanParams = {
                collection: "mege",
                zScoreThresholdMax: 5,
                zScoreThresholdMin: -5
            }

            cleanPreParams = {
                collection: "mege",
                zScoreThreshold: 5,
                gene: "zed"
            }
        })



        it("should error if given parameters aren't present", function(done){

            geneCheckEmitter.on('error', function(err){
                done()
            })

            geneCheckEmitter.emit('geneCheck', falseParams)

        })
        it("should raise dbconnection getFile event with proper parameters", function(done){

            dbconnectionemitter.on('getFile', function(params){
                params.should.eql(cleanParams)
                done()
            })

            geneCheckEmitter.emit('geneCheck', cleanPreParams)

        })

        describe('on dbconnection data event', function(){

            describe('significance check on insignificant gene', function(){

                var mockInsignificantDBResponse = undefined

                beforeEach(function(){
                    geneCheckEmitter.emit('geneCheck', cleanPreParams)

                    mockInsignificantDBResponse = [
                        {source:'foo', target:'bar', zScore:4, interaction:1},
                        {source:'bar', target:'rad', zScore:4, interaction:1}
                    ]

                })

                it('should emit data event with falsy response', function(done){

                    geneCheckEmitter.on('data', function(response){
                        response.isSignificant.should.eql(false)
                        done()
                    })

                    dbconnectionemitter.emit('data', mockInsignificantDBResponse)
                })
            })

            describe('significance check on significant gene', function(){

                var mockSignificantDBResponse = undefined

                beforeEach(function(){

                    geneCheckEmitter.emit('geneCheck', cleanPreParams)

                    mockSignificantDBResponse = [
                        {source:'foo', target:'bar', zScore:5, interaction:1},
                        {source:'bar', target:'zed', zScore:5, interaction:1}
                    ]

                })

                it('should emit data event with truthy response', function(done){

                    geneCheckEmitter.on('data', function(response){
                        response.isSignificant.should.eql(true)
                        done()
                    })

                    dbconnectionemitter.emit('data', mockSignificantDBResponse)
                })
            })

            describe('on dbconnection close event', function(){

                beforeEach(function(){
                    geneCheckEmitter.emit('geneCheck', cleanPreParams)
                })


                it('should emit close', function(done){

                    geneCheckEmitter.on('close', function(data){
                        done()
                    })

                    dbconnectionemitter.emit('close')
                })
            })

            describe('on dbconnection error event', function(){

                beforeEach(function(){
                    geneCheckEmitter.emit('geneCheck', cleanPreParams)
                })

                it('should emit error', function(done){

                    geneCheckEmitter.on('error', function(err){
                        done()
                    })

                    dbconnectionemitter.emit('error')
                })
            })

        })



    })

})
