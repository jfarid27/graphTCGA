(function(){

require.config({

    'baseUrl': '',

    'paths': {
        'angular': ['angular/angular'],
        'angular-route': ['angular-route/angular-route'],
        'jquery': ['jquery/jquery'],
        'd3': ['d3/d3']
    },

    'shim': {
        'angular': {
            'exports': 'angular'
        },
        'angular-route': {
            'exports': 'ngRoute',
            'deps': ['angular']
        },
        'jquery':{
            'exports': 'jquery'
        },
        'd3':{
            'exports': 'd3'
        }
    },

    'waitSeconds': 1
})

require(['angular', 'angular-route', './app'], function(angular){


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['graphTCGA']);
    });

})

})();
