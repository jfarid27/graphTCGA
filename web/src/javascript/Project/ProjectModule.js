(function(){

    var deps = [
        'angular',
        './Controllers/EnvironmentController',
        './Factories/EnvironmentFactory',
        './Factories/ApiFactory'
    ];

    define(deps, function(angular, EnvironmentController, EnvironmentFactory, ApiFactory){

        angular.module('Project', [])
        .controller('EnvironmentController', ['$scope', 'Project.Environment', 'Project.Api', EnvironmentController])
        .factory('Project.Environment', [EnvironmentFactory])
        .factory('Project.Api', ['Project.FileResource', 'Project.FolderResource', ApiFactory])
        .factory('Project.FileResource', ['$resource', function($resource){
            return $resource('/file',{},{
                get:{
                    method:"GET"
                }
            })
        }])
        .factory('Project.FolderResource', ['$resource', function($resource){
            return $resource('/folder',{},{
                get:{
                    method:"GET"
                }
            })
        }])
    })

    return angular
})()
