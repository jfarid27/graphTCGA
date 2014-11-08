(function(){

    var deps = [
        './Directives/graphVisualization',
        './Directives/environmentInterface'
    ]

    define(deps, function(addGraphVisualization, addEnvironmentInterface){

        return function(module){

            addGraphVisualization(module)
            addEnvironmentInterface(module)

        }

    })

})()
