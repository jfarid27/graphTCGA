(function(){

    define([], function(){

        return function(module){

            module.directive('appHeader', [function(){

                return {
                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/appHeader.html',
                    link: function(scope, element, attributes){

                    }
                }

            }])

        }

    })

})()
