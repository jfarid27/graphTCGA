(function(){

    var deps = [
        './Directives/graphVisualization',
        './Directives/environmentInterface',
        './Directives/appHeader',
        './Directives/aboutSection',
        './Directives/histogramVisualization',
        './Directives/edgeTable',
        './Directives/barsVisualization'
    ]

    define(deps, function(addGraphVisualization, addEnvironmentInterface, addAppHeader, addAboutSection, addHistogramVisualization, addEdgeTable, addBars){

        return function(module){

            addGraphVisualization(module)
            addEnvironmentInterface(module)
            addAppHeader(module)
            addAboutSection(module)
            addHistogramVisualization(module)
            addEdgeTable(module)
            addBars(module)
        }

    })

})()
