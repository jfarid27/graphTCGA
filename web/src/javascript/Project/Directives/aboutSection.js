(function(){

    define([], function(){

        return function(module){

            module.directive('aboutSection', [function(){

                return {
                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/aboutSection.html',
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
