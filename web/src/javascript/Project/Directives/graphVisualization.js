(function(){

    define(['cytoscape', './graphLayoutSettings', './graphStyleSettings'], function(cytoscape, layoutSettings, styleSettings){

        return function(module){

            module.directive('graphVisualization', [function(){
                return {
                    restrict: 'E',
                    templateUrl: module.urlPath+'/Directives/templates/graphVisualization.html',
                    link: function(scope, element, attributes){

                        scope.$watch('environment.graph', function(newval){

                            if (newval){

                                var options = {
                                    container: document.getElementById('vis'),
                                    elements: scope.environment.graph.elements,
                                    style: styleSettings,
                                    layout: layoutSettings,
                                    ready: function(event){
                                        return
                                    },
                                    zoom: 1,
                                    pan: { x:0, y:0},
                                    minZoom: 1e-50,
                                    maxZoom: 1e50,
                                    boxSelectionEnabled: false,
                                    zoomingEnabled: true,
                                    userZoomingEnabled: true,
                                    panningEnabled: true,
                                    userPanningEnabled: true,
                                    selectionType: 'additive',
                                    autolock: false,
                                    autoungrabify: false,
                                    autounselectify: false,
                                    headless: false,
                                    styleEnabled: true,
                                    hideEdgesOnViewport: false,
                                    hideLabelsOnViewport: false,
                                    textureOnViewport: true,
                                    motionBlur: false,
                                    wheelSensitivity: 1,
                                    pixelRatio: 1,
                                    initRender: function(event){
                                        return
                                    },
                                    renderer: {}
                                }
                                var cy = cytoscape(options)
                            }
                        });

                    }
                }

            }])

        }

    })

})()
