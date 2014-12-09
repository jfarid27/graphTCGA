(function(){


    var dbParserModule = require('./../../../src/Panda/Modules/dbParse').construct,
    should = require('should')

    describe("dbParse", function(){

        var dbParser

        beforeEach(function(){

            dbParser = new dbParserModule()

        })

        describe('parse method', function(){

            var dataArray, returnGraph, expectedArray, expectedCytoscape,
                expectedTSV, expectedGephi

            beforeEach(function(){
                dataArray = [
                    {source:'foo', target:'bar', zScore:4, interaction:1},
                    {source:'bar', target:'zed', zScore:4, interaction:1}
                ]

                expectedArray = [
                    {source:0, target:1, zScore:4, interaction:1},
                    {source:1, target:2, zScore:4, interaction:1}
                ]

                expectedTSV = "foo\tbar\t1\t4\n"+"bar\tzed\t1\t4\n"
                expectedGephi = "source\ttarget\tinteraction\tzScore\n"+"foo\tbar\t1\t4\n"+"bar\tzed\t1\t4\n"

                expectedCytoscape = {
                    edges:[
                        {source: 'foo', target:'bar'},
                        {source: 'bar', target:'zed'}
                    ],
                    nodes:['foo', 'bar', 'zed']
                }
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

            describe('with cytoscape params', function(){

                var response

                beforeEach(function(){
                    response = dbParser.parse(dataArray, {format:'cytoscape'})
                })

                describe('return graph', function(){
                    describe('nodes property', function(){

                        var parsedNodes

                        beforeEach(function(){
                            parsedNodes = response.elements.nodes.map(function(node){return node.data.id })
                        })
                        it('should contain properly formatted nodes', function(){
                                parsedNodes.should.containEql(expectedCytoscape.nodes[0])
                                parsedNodes.should.containEql(expectedCytoscape.nodes[1])
                                parsedNodes.should.containEql(expectedCytoscape.nodes[2])
                        })
                    })
                    describe('edges property', function(){

                        var parsedEdges

                        beforeEach(function(){

                            parsedEdges = response.elements.edges
                                .map(function(edge){
                                    return {source:edge.data.source, target:edge.data.target}
                                })

                        })

                        it('should contain properly formatted edges', function(){

                                parsedEdges.should.containEql(expectedCytoscape.edges[0])
                                parsedEdges.should.containEql(expectedCytoscape.edges[1])
                        })
                    })
                })
            })

            describe('with tsv params', function(){

                var response

                beforeEach(function(){
                    response = dbParser.parse(dataArray, {format:'tsv'})
                })

                describe('return string', function(){

                    it('should contain properly formatted lines of edges', function(){
                        response.should.eql(expectedTSV)
                    })
                })
            })

            describe('with gephi params', function(){

                var response

                beforeEach(function(){
                    response = dbParser.parse(dataArray, {format:'gephi'})
                })

                describe('return string', function(){
                    it('should contain a header', function(){
                        response.split('\n')[0].should.eql(expectedGephi.split('\n')[0])
                    })
                    it('should contain properly formatted lines of edges', function(){
                        response.should.eql(expectedGephi)
                    })
                })
            })

        })
    })







})()
