(function(){

    define([], function(){

        return function(module){

            module.directive('environmentInterface', [function(){

                return {
                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/environmentInterface.html',
                    link: function(scope, element, attributes){

                        scope.drawGraph = function(){

                            if (scope.environment.selectedFolder && scope.environment.selectedFile){
                                scope.emit('drawGraph')
                            }

                        }
                    }
                }

            }])

        }

    })

})()
