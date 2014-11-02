var construct = require('./../../../src/Panda/Modules/arrayToGraphEdge.js')

var arrayToGraphEdge = construct.arrayToGraphEdgeSync

var arraysToGraphEdges = construct.arraysToGraphEdgesSync

var bufferToGraphEdges = construct.bufferToGraphEdges

describe('arrayToGraphEdges', function(){

  var testArray, testMultipleArrays

  beforeEach(function(){

    testArray = ['foo', 'bar', 0, 1]

    testMultipleArrays = [
      ['foo','bar', 0, 1],
      ['bar','foo', 0, 1],
    ]

    testBuffer = "foo\tbar\t0\t1\nzed\tbar\t0\t1"

  })

  describe('single converter', function(){

    it('should convert an array to graph edge', function(){
  
      var expected = {source:'foo', target:'bar', weight:0, strength:1}

      arrayToGraphEdge(testArray).should.eql(expected)

    })

  })

  describe('multiple converter', function(){

    it('should convert arrays of arrays to array of graph edges', function(){

      var expected = [
        {source:'foo', target:'bar', weight:0, strength:1},
        {source:'bar', target:'foo', weight:0, strength:1},
      ]

      var converted = arraysToGraphEdges(testMultipleArrays)

      converted.should.containEql(expected[0])
      converted.should.containEql(expected[1])

    })

  })

    describe('bufferToGraphEdge', function(){
        describe('when given a buffer', function(){
            it('should convert buffer to array of graph edges', function(){
                var expected = [
                    {source:"foo", target:"bar", weight: 0, strength:1},
                    {source:"zed", target:"bar", weight: 0, strength:1}
                ]

                var converted = bufferToGraphEdges(testBuffer)

                converted.should.containEql(expected[0])
                converted.should.containEql(expected[1])

            })

        })
    })

})
