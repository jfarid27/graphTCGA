var construct = require('./../../../src/Panda/Modules/arrayToGraph.js').construct,
should = require('should')


describe('arrayToGraph', function(){

    var testArray, testMultipleArrays, arrayToGraph

    beforeEach(function(){

        arrayToGraph = new construct()

        testArray = ['foo', 'bar', 0, 1]

        testMultipleArrays = [
          ['foo','bar', 1, 5],
          ['bar','foo', .5, 1],
        ]

        testBuffer = "foo\tbar\t1\t5\nzed\tbar\t0\t1"

    })

    describe('bufferToLines Method', function(){

        var response = undefined,
            params = {'zScoreThreshold': 4, 'interactionThreshold': 1}
        beforeEach(function(){
            response = arrayToGraph.bufferToLines(testBuffer, params)
        })

        it('should take a buffer and create an array of lines', function(){

            response.should.containEql(['foo', 'bar', 1, 5])

        })

        it('should properly filter on z-score threshold', function(){
            response.length.should.eql(1)
            response.should.not.containEql(['zed', 'bar', 0, 1])
        })

        it('should properly filter on interaction threshold', function(){
            response.length.should.eql(1)
            response.should.not.containEql(['zed', 'bar', 0, 1])
        })

    })

    describe('arrayToJson method', function(){

        var response = undefined,

            expected = {
                nodes: [{id:0, name:'foo'}, {id:1, name:'bar'}],
                edges: [
                    {source:0, target:1, interaction:1, zScore:5},
                    {source:1, target:0, interaction:.5, zScore:1},
                ]
            }

        beforeEach(function(){
            response = arrayToGraph.arrayToJson(testMultipleArrays)
        })

        it('should take an array of lines and return json', function(){
            response.nodes.should.containEql(expected.nodes[0])
            response.nodes.should.containEql(expected.nodes[1])
            response.edges.should.containEql(expected.edges[0])
            response.edges.should.containEql(expected.edges[1])
        })


    })

    describe('arrayToTsv method', function(){

        var response = undefined,
            expected = ["foo\tbar\t1\t5\n",
                        "bar\tfoo\t0.5\t1\n"]

        beforeEach(function(){
            response = arrayToGraph.arrayToTsv(testMultipleArrays)
        })

        it('should take an array of lines and return array of lines for tsv', function(){
            response.should.containEql(expected[0])
            response.should.containEql(expected[1])
        })
    })

    describe('arrayToGephi method', function(){

        var response = undefined,
            expected = "Source\tTarget\tInteraction\tzScore\nfoo\tbar\t1\t5\nbar\tfoo\t0.5\t1\n"

        beforeEach(function(){
            response = arrayToGraph.arrayToGephi(testMultipleArrays)
        })

        it('should take an array of lines and return gephi tsv', function(){

            response.should.eql(expected)

        })
    })

    describe('arrayToCytoscape method', function(){

        var response = undefined,
            expected = {
                elements:{
                    nodes: [{data:{id:'foo'}}, {data:{id:'bar'}}],
                    edges: [{data:{id:'0', source:'foo', target:'bar', interaction:1 , zScore:5}},
                        {data:{id:'1', source:'bar', target:'foo', interaction:.5 ,zScore:1}}]
                }
            }

        beforeEach(function(){
            response = arrayToGraph.arrayToCytoscape(testMultipleArrays)
        })

        describe('response object', function(){
            describe('nodes', function(){
                it('should contain properly formatted nodes', function(){
                    response.elements.nodes.should.containEql(expected.elements.nodes[0])
                    response.elements.nodes.should.containEql(expected.elements.nodes[1])
                })
            })

            describe('edges', function(){
                it('should contain properly formatted edges', function(){
                    response.elements.edges.should.containEql(expected.elements.edges[0])
                    response.elements.edges.should.containEql(expected.elements.edges[1])
                })
            })
        })
    })

})

