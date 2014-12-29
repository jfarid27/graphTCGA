(function(){


    define(['d3', './histogram'], function(d3){

        return function(module){

            module.directive('histogramVisualization', [function(){

                return {

                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/histogramVisualization.html',
                    link: function(scope, element, attributes){

                        var data = [
                            {x: -4, y: .0013},
                            {x: -3, y: .0214},
                            {x: -2, y: .1359},
                            {x: -1, y: .3413},
                            {x: 0, y: .3413},
                            {x: 1, y: .1359},
                            {x: 2, y: .0214},
                            {x: 3, y: .0013}
                        ]

                        var params = {
                            width:300,
                            height:190
                        }

                        var svg = d3.select("#histogram").append('svg')
                        .attr("width", params.width)
                        .attr("height", params.height)

                        var histogram = d3.custom.histogram()
                            .data(data)
                            .width(params.width)
                            .height(params.height)
                            .on('brushing', function(brush){
                                var extent = brush.extent()
                                scope.environment.zScoreThreshold.max = extent[1]
                                scope.environment.zScoreThreshold.min = extent[0]
                                scope.$apply()
                            })

                        svg.call(histogram)

                    }

                }

            }])

        }

    })


})()
