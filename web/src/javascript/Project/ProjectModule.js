(function(){

    var deps = [
        'angular',
        './ProjectControllers',
        './ProjectDirectives',
        './ProjectFactories',
    ];

    define(deps, function(angular, addControllers, addDirectives, addFactories){

        var project = angular.module('Project', [])

        project.urlPath = 'javascript/Project'

        addControllers(project)
        addFactories(project)
        addDirectives(project)

        return project

    })



})()
