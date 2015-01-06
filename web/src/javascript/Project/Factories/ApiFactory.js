(function(){

    define([], function(){

        function ApiFactory(fileResource, folderResource, geneCheckResource){
            return {
                getFile: function(params){
                    return fileResource.get(params)
                },
                getFolder: function(params){
                    return folderResource.get(params)
                },
                getGeneCheck: function(params){
                    return geneCheckResource.get(params)
                },
                downloadFile: function(params){
                    return fileResource.download(params)
                },
                downloadGraph: function(params){
                    return fileResource.get(params)
                },

            }
        }

        return ApiFactory

    })

})()
