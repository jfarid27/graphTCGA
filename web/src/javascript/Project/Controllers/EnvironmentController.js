(function(){

    define([], function(){

        return function($scope, Environment, Api){

            $scope.environment = Environment

            //Initial folder get
            Api.getFolder().$promise.then(function(data){
                $scope.environment.availableFolders = data.folders
            })

            $scope.$watch('environment.selectedFolder', function(newval, oldval){
                if (newval){
                    $scope.environment.availableFiles = $scope.environment.selectedFolder.files
                }
            })

            $scope.$on('visualizeGraph', function(event){
                if ($scope.environment.selectedFolder &&
                    $scope.environment.selectedFile &&
                    $scope.environment.interactionThreshold &&
                    $scope.environment.zScoreThreshold){

                    var params = {
                        folder: $scope.environment.selectedFolder.name,
                        file: $scope.environment.selectedFile,
                        format: "cytoscape",
                        interactionThreshold: $scope.environment.interactionThreshold,
                        zScoreThreshold: $scope.environment.zScoreThreshold
                    }

                    Api.getFile(params).$promise.then(function(data){
                        $scope.environment.graph = data
                    })
                }
            })

            $scope.$on('downloadGraph', function(event){
                if ($scope.environment.selectedFolder &&
                    $scope.environment.selectedFile &&
                    $scope.environment.selectedType &&
                    $scope.environment.interactionThreshold &&
                    $scope.environment.zScoreThreshold){

                    var params = {
                        folder: $scope.environment.selectedFolder.name,
                        file: $scope.environment.selectedFile,
                        format: $scope.environment.selectedType.value,
                        interactionThreshold: $scope.environment.interactionThreshold,
                        zScoreThreshold: $scope.environment.zScoreThreshold
                    }
                    Api.getFile(params)
                }
            })

            $scope.visualizeGraph = function(){
                $scope.$emit('visualizeGraph')
            }

            $scope.downloadGraph = function(){
                $scope.$emit('downloadGraph')
            }

        }

    })

})()
