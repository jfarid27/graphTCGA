(function(){

    define(['d3', './bars'], function(d3){

        return function(module){

            module.directive('barsVisualization', [function(){

                return {

                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/barsVisualization.html',
                    link: function(scope, element, attributes){

                        var params = {
                            width:300,
                            height:140
                        }

                        var svg = d3.select("#bars").append('svg')
                            .attr("width", params.width)
                            .attr("height", params.height)

                        var bars = d3.custom.bars()
                            .width(params.width)
                            .height(params.height)
                            .on('brushing', function(brush){
                                var extent = brush.extent()
                                scope.environment.zScoreThreshold.max = extent[1]
                                scope.environment.zScoreThreshold.min = extent[0]
                                scope.$apply()
                            })

                        svg.call(bars)

                        return
                    }
                }
            }])

        }

    })

})()
