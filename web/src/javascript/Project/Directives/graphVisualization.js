(function(){

    define([], function(){

        return function(module){

            module.directive('graphVisualization', [function(){

                return {
                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/graphVisualization.html',
                    link: function(scope, element, attributes){

                    }
                }

            }])

        }

    })

})()
