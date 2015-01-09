(function(){

    define([], function(){

        function ApiFactory(fileResource, folderResource, edgeResource){
            return {
                getFile: function(params){
                    return fileResource.get(params)
                },
                getFolder: function(params){
                    return folderResource.get(params)
                },
                downloadFile: function(params){
                    return fileResource.download(params)
                },
                downloadGraph: function(params){
                    return fileResource.get(params)
                },
                getNearby: function(params){
                    return edgeResource.get(params)
                }
            }
        }

        return ApiFactory

    })

})()
