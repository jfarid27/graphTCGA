(function(){


    define([], function(){

        return function(module){

            module.directive('searchInterface', [function(){

                return {

                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/searchInterface.html',
                    link: function(scope, element, attributes){
                        console.log(scope.environment)
                        return
                    }

                }

            }])

        }

    })


})()
