(function(){

    var deps = [
        './Directives/graphVisualization',
        './Directives/environmentInterface',
        './Directives/appHeader',
        './Directives/aboutSection',
        './Directives/histogramVisualization',
        './Directives/edgeTable',
    ]

    define(deps, function(addGraphVisualization, addEnvironmentInterface, addAppHeader, addAboutSection, addHistogramVisualization, addEdgeTable){

        return function(module){

            addGraphVisualization(module)
            addEnvironmentInterface(module)
            addAppHeader(module)
            addAboutSection(module)
            addHistogramVisualization(module)
            addEdgeTable(module)

        }

    })

})()
