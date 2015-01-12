(function(){


    define(['d3', './histogram'], function(d3){

        return function(module){

            module.directive('histogramVisualization', [function(){

                return {

                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/histogramVisualization.html',
                    link: function(scope, element, attributes){

                        var data = [
                            {x: -6, y: .000000006075883},
                            {x: -5.75, y: .00000002639243},
                            {x: -5.5, y: .0000001076976},
                            {x: -5.25, y: .0000004128471},
                            {x: -5, y: .00000148672},
                            {x: -4.75, y: .000005029507},
                            {x: -4.5, y: .00001598374},
                            {x: -4.25, y: 0.00004771864},
                            {x: -4, y: 0.0001338302}
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
