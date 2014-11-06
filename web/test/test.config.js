(function(){
  var allTestFiles = [];
var TEST_REGEXP = /spec\.js$/;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
}

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
})

require.config({

    'baseUrl': '/base',

    'paths': {
        'bower': 'bower_components/',
        'web_js': 'web/src/javascript/',
        'angular': 'bower_components/angular/angular',
        'angularMocks': 'node_modules/angular-mocks/angular-mocks',
        'jquery': '',
        'd3': 'bower_components/d3/d3'
    },

    'shim': {
        'angular': {
            'exports': 'angular'
        },
        'angularMocks': {
            'deps': ['angular'],
            'exports': 'inject'
        },
        'jquery':{
            'exports': 'jquery'
        },
        'd3':{
            'exports': 'd3'
        }
    },

    'waitSeconds': 6,

    'deps': allTestFiles,

    'callback': window.__karma__.start
})

})();
