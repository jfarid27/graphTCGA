(function(){

    define(['d3', 'jquery'], function(d3){

        return function(module){

            module.directive('graphVisualization', [function(){
                return {
                    restrict: 'E',
                    templateUrl: module.urlPath+'/Directives/templates/graphVisualization.html',
                    link: function(scope, element, attributes){

                        var svg = d3.select('svg#graphVis')
                            .attr('width', 500)
                            .attr('height', 900);

                        scope.$watch('environment.graph', function(newval){
                            if (newval && newval.edges) {

                                var graph = newval

                                svg.selectAll().remove()

                                var prenodes = {};
                                graph.edges.map(function(edge){

                                    if( !(edge.source in prenodes)) {
                                        prenodes[edge.source] = Object.keys(prenodes).length
                                        console.log(prenodes[edge.source])
                                    }
                                    if( !(edge.target in prenodes)) {
                                        prenodes[edge.target] = Object.keys(prenodes).length
                                    }
                                })

                                var nodes = Object.keys(prenodes).map(function(nodestring, index){
                                    return {id:nodestring, index:index}
                                })

                                var edges = graph.edges.map(function(edge){
                                    return {
                                        source:prenodes[edge.source],
                                        target:prenodes[edge.target],
                                        weight: parseFloat(edge.weight)
                                    }
                                })





                            }
                        });

                    }
                }

            }])

        }

    })

})()
