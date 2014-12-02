(function(){


    var dbParserModule = require('./../../../src/Panda/Modules/dbParse').construct,
    should = require('should')

    describe("dbParse", function(){

        var dbParser

        beforeEach(function(){

            dbParser = new dbParserModule()

        })

        describe('parse method', function(){

            var dataArray, returnGraph, expectedArray

            beforeEach(function(){
                dataArray = [
                    {source:'foo', target:'bar', zScore:4, interaction:1},
                    {source:'bar', target:'zed', zScore:4, interaction:1}
                ]

                expectedArray = [
                    {source:0, target:1, zScore:4, interaction:1},
                    {source:1, target:2, zScore:4, interaction:1}
                ]
            })

            describe('with json params', function(){

                var response

                beforeEach(function(){
                    response = dbParser.parse(dataArray, {format:'json'})
                })

                describe('return graph', function(){
                    describe('nodes property', function(){
                        it('should have correctly parsed node array', function(){

                            response.nodes.map(function(n){return n.name})
                                .should.containEql('foo')
                            response.nodes.map(function(n){return n.name})
                                .should.containEql('bar')
                            response.nodes.map(function(n){return n.name})
                                .should.containEql('zed')

                        })
                    })

                    describe('edges property', function(){
                        it('should just return given edges array', function(){
                            response.edges
                                .should.containEql(expectedArray[0])
                            response.edges
                                .should.containEql(expectedArray[1])
                        })
                    })
                })

            })

        })
    })







})()
