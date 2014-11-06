(function(){

    define([], function(){

        return function($scope, Environment, Api){

            $scope.environment = Environment

            $scope.environment.availableFolders = Api.getFolder()

            $scope.$on('onFolderSelect', function(params){
                $scope.environment.availableFiles = Api.getFolder(params)
                $scope.environment.selectedFolder = params.folder
            })

            $scope.$on('onFileSelect', function(params){

                $scope.environment.graph = Api.getFile(params)
                $scope.environment.selectedFile = params.file
            })

            $scope.$on('onDownloadFile', function(params){
                Api.downloadFile(params)
            })
        }

    })

})()
