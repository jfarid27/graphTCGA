(function(){

    var deps = [
        './Directives/graphVisualization',
        './Directives/environmentInterface',
        './Directives/appHeader',
        './Directives/aboutSection',
        './Directives/histogramVisualization'
    ]

    define(deps, function(addGraphVisualization, addEnvironmentInterface, addAppHeader, addAboutSection, addHistogramVisualization){

        return function(module){

            addGraphVisualization(module)
            addEnvironmentInterface(module)
            addAppHeader(module)
            addAboutSection(module)
            addHistogramVisualization(module)

        }

    })

})()
