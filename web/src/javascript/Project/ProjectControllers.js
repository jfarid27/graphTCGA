(function(){

    var deps = [
        './Controllers/EnvironmentController',
    ]

    define(deps, function(EnvironmentController){

        var environmentControllerDeps = [
            '$scope',
            'Project.Environment', 'Project.Api', '$window', 'Project.SearchLibrary', EnvironmentController]

        return function(module){
            module
            .controller('EnvironmentController', environmentControllerDeps)
        }

    })

})()
