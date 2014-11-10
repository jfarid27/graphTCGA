(function(){

    var deps = [
        'angular',
        './ProjectControllers',
        './ProjectDirectives',
        './ProjectFactories',
        'angular-resource'
    ];

    define(deps, function(angular, addControllers, addDirectives, addFactories){

        var project = angular.module('Project', ['ngResource'])

        project.urlPath = 'javascript/Project'

        addFactories(project)
        addControllers(project)
        addDirectives(project)

        return project

    })



})()
