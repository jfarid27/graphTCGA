(function(){

    var deps = [
        './Controllers/EnvironmentController',
    ]

    define(deps, function(EnvironmentController){

        return function(module){
            module
            .controller('EnvironmentController', ['$scope', 'Project.Environment', 'Project.Api', EnvironmentController])
        }

    })

})()
