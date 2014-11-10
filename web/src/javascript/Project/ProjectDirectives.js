(function(){

    var deps = [
        './Directives/graphVisualization',
        './Directives/environmentInterface',
        './Directives/appHeader',
        './Directives/aboutSection'
    ]

    define(deps, function(addGraphVisualization, addEnvironmentInterface, addAppHeader, addAboutSection){

        return function(module){

            addGraphVisualization(module)
            addEnvironmentInterface(module)
            addAppHeader(module)
            addAboutSection(module)

        }

    })

})()
