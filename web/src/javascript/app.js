(function(){

    var deps = ['angular', 'angular-route', './Project/ProjectModule', 'ngTable']

    var appModuleDeps = ['Project', 'ngRoute', 'smart-table']

    define(deps, function (angular) {

        var app = angular.module('graphTCGA', appModuleDeps)
            .value('appDefaults', {
                name: "Panda TCGA"
            })

        return app
    })

})()
