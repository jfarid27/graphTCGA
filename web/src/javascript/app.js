(function(){

    var deps = ['angular', 'angular-route', './Project/ProjectModule']

    var appModuleDeps = ['Project', 'ngRoute']

    define(deps, function (angular) {

        var app = angular.module('graphTCGA', appModuleDeps)

        return app
    })

})()
