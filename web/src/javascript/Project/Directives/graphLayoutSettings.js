(function(){

    define([], function(){

        var cose = {
            name: 'cose',
            ready: function(){
                return
            },
            stop: function(){
                return
            },
            animate: true,
            refresh: 2,
            fit: true,
            padding: 10,
            boundingBox: undefined,
            randomize: true,
            debug: false,
            nodeRepulsion : 10000000,
            nodeOverlap : 1000,
            idealEdgeLength: 10,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 250,
            numIter: 300,
            initialTemp: 300,
            coolingFactor: .95,
            minTemp: 10
        }

        return cose
    })

})()
