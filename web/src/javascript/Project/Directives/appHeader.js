(function(){

    define([], function(){

        return function(module){

            module.directive('appHeader', ['appDefaults', function(appDefaults){

                return {
                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/appHeader.html',
                    link: function(scope, element, attributes){

                        scope.app = {}
                        scope.app.name = appDefaults.name;

                    }
                }

            }])

        }

    })

})()
