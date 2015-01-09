(function(){


    define([], function(){

        return function(module){

            module.directive('edgeTable', [function(){

                return {

                    restrict: 'E',
                    templateUrl: module.urlPath + '/Directives/templates/edgeTable.html',
                    link: function(scope, element, attributes){
                        return
                    }

                }

            }])

        }

    })


})()
