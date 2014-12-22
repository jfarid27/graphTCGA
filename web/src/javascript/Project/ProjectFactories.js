(function(){

    var deps = [
        './Factories/ApiFactory',
        './Factories/EnvironmentFactory',
        './Factories/SearchCorpus',
        'grammer'
    ]

    define(deps, function(ApiFactory, EnvironmentFactory, searchCorpus, grammer){

        return function(module){

            module
            .factory('Project.Environment', [function(){return new EnvironmentFactory}])
            .factory('Project.SearchLibrary', [function(){

                var nGrams = grammer()

                nGrams.corpus(searchCorpus).generateLibrary()

                return nGrams
            }])
            .factory('Project.Api', ['Project.FileResource', 'Project.FolderResource', ApiFactory])
            .factory('Project.FileResource', ['$resource', function($resource){
                return $resource('/file',{},{
                    get:{
                        method:"GET",
                        params:{
                            'format':'cytoscape'
                        }
                    }
                })
            }])
            .factory('Project.FolderResource', ['$resource', function($resource){
                return $resource('/folder',{},{
                    get:{
                        method:"GET"
                    }
                })
            }])

        }




    })

})()
