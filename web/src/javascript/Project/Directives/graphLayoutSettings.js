(function(){

    define([], function(){
        return {
            name: 'cose',
            ready: function(){
                return
            },
            stop: function(){
                return
            },
            animate: true,
            refresh: 4,
            fit: true,
            padding: 10,
            boundingBox: undefined,
            randomize: true,
            debug: true,
            nodeRepulsion : 400000,
            nodeOverlap : 10,
            idealEdgeLength: 10,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 250,
            numIter: 100,
            initialTemp: 200,
            coolingFactor: .95,
            minTemp: 1
        }
    })

})()
