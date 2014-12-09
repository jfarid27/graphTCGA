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
                    $scope.environment.selectedFile){

                    var params = {
                        collection: $scope.environment.selectedFile.collection,
                        format: "cytoscape",
                        interactionThreshold: 1,
                        zScoreThresholdMin: -5.5,
                        zScoreThresholdMax: 5.5
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
                    $scope.environment.zScoreThreshold.max &&
                    $scope.environment.zScoreThreshold.min){

                    var params = {
                        collection: $scope.environment.selectedFile.collection,
                        format: $scope.environment.selectedType.value,
                        interactionThreshold: $scope.environment.interactionThreshold,
                        zScoreThresholdMin: $scope.environment.zScoreThreshold.min,
                        zScoreThresholdMax: $scope.environment.zScoreThreshold.max,
                        file: true
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
