(function(){

    var deps = [
        './Factories/ApiFactory',
        './Factories/EnvironmentFactory'
    ]

    define(deps, function(ApiFactory, EnvironmentFactory){

        return function(module){

            module
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

        }




    })

})()
