(function(){

require.config({

    'baseUrl': '',

    'paths': {
        'angular': ['/angular/angular'],
        'angular-route': ['/angular-route/angular-route'],
        'angular-resource': ['/angular-resource/angular-resource'],
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
                   'jquery'],
        'd3': ['/d3/d3']
    },
    'shim': {
        'angular': {
            'exports': 'angular'
        },
        'angular-route': {
            'exports': 'ngRoute',
            'deps': ['angular']
        },
        'angular-resource': {
            'exports': 'ngResource',
            'deps': ['angular']
        },
        'd3':{
            'exports': 'd3'
        }
    },

    'waitSeconds': 1
})

require(['angular','jquery', './javascript/app'], function(angular){


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['graphTCGA']);
    });

})

})();
