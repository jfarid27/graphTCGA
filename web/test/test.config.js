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
        'angular': 'bower_components/angular/angular',
        'angularMocks': 'node_modules/angular-mocks/angular-mocks',
        'jquery': '',
        'd3': 'bower_components/d3/d3',
        'grammer': 'bower_components/grammer/src/javascript/grammer',
        'ngTable': 'bower_components/angular-smart-table/dist/smart-table.debug'
    },

    'shim': {
        'angular': {
            'exports': 'angular'
        },
        'angularMocks': {
            'deps': ['angular'],
            'exports': 'inject'
        },
        'ngTable': {
            'deps': ['angular']
        },
        'jquery':{
            'exports': 'jquery'
        },
        'd3':{
            'exports': 'd3'
        },
        'grammer':{
            'exports': 'grammer'
        }
    },

    'waitSeconds': 6,

    'deps': allTestFiles,

    'callback': window.__karma__.start
})

})();
