(function(){

    define([], function(){

        function ApiFactory(fileResource, folderResource){
            var self = this

            self.getFile = function(params){
                return fileResource.get(params)
            }

            self.getFolder = function(params){
                return folderResource.get(params)
            }
        }

        return ApiFactory

    })

})()
