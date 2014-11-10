(function(){

    define([], function(){

        return function($scope, Environment, Api){

            $scope.environment = Environment

            //Initial folder get
            Api.getFolder().$promise.then(function(data){
                $scope.environment.availableFolders = data.folders
            })

            function buildParams(){
                var params = {
                    file: $scope.environment.selectedFile,
                    folder: $scope.environment.selectedFolder,
                    zScoreThreshold: $scope.environment.zScoreThreshold,
                    interactionThreshold: $scope.environment.interactionThreshold
                }

                return paramsOK(params) ? params : undefined
            }

            function paramsOK(params) {

                var fileOk = params.file
                var folderOk = params.folder
                var zScoreOk = !(isNaN(parseFloat(params.zScoreThreshold))) && (parseFloat(params.zScoreThreshold) > 2 || parseFloat(params.zScoreThreshold) < 2)
                var interactionThresholdOk = !(isNaN(parseFloat(params.interactionThreshold)))
                if ( fileOk && folderOk && zScoreOk && interactionThresholdOk ) {
                    return true
                } else {
                    return false
                }
            }

            $scope.downloadGraph = function(){

                var params = buildParams()

                if (params) {
                    $scope.$emit('onDownloadGraph', params)
                }

            }

            $scope.downloadFile = function(){

                var params = buildParams()

                $scope.$emit('onDownloadFile', params)
            }

            $scope.$watch('environment.selectedFolder', function(newval, oldval){
                if (newval) {
                    $scope.$emit('onFolderSelect', {'folder': newval})
                }
            })

            $scope.$watch('environment.selectedFile', function(newval, oldval){
                if(newval){
                    //Force download only on drawGraph Event
                    return
                }
            })

            $scope.$on('onFolderSelect', function(event, params){
                Api.getFolder(params).$promise.then(function(data){
                    $scope.environment.availableFiles = data.files
                })
            })

            $scope.$on('onFileSelect', function(event, params){
                $scope.environment.selectedFile = params.file
            })

            $scope.$on('onDownloadGraph', function(event, params){

                Api.downloadGraph(params).$promise.then(function(data){

                    $scope.environment.graph = data
                })
            })

            $scope.$on('onDownloadFile', function(event, params){
                Api.downloadFile(params)
            })

            $scope.$watch('environment.graph', function(newval){

            })
        }

    })

})()
