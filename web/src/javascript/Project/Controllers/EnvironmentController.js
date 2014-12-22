(function(){

    define([], function(){

        return function($scope, Environment, Api , $window, library){

            $scope.environment = Environment

            //Initial folder get
            Api.getFolder().$promise.then(function(data){


                $scope.environment.availableFolders = data.folders

                $scope.environment.allFiles = []
                $scope.environment.availableFolders.map(function(folder){

                    folder.files.map(function(file){
                        $scope.environment.allFiles.push(file)
                    })
                })


            })

            $scope.$watch('environment.selectedFolder', function(newval, oldval){
                if (newval){
                    $scope.environment.availableFiles = $scope.environment.selectedFolder.files
                }
            })

            $scope.$watch('environment.searchTerm', function(newval, oldval){
                if (newval == "" || typeof newval == 'undefined'){
                    $scope.environment.matchingDatasets = undefined
                    return
                }

                if (newval.length > 2) {
                    var matchingTerms = library.search(newval, -80)
                    var matchingFiles = []

                    for (term in matchingTerms){

                        for (file in $scope.environment.allFiles) {

                            var filetag = $scope.environment.allFiles[file].tag

                            var matchingTag = matchingTerms[term].phrase.value

                            if (filetag == matchingTag){
                                matchingFiles.push($scope.environment.allFiles[file])
                            }
                        }
                    }

                    $scope.environment.matchingDatasets = matchingFiles

                }
            })

            $scope.$on('visualizeGraph', function(event, file){
                if (file){

                    var params = {
                        collection: file.collection,
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

            $scope.$on('downloadGraph', function(event, file){
                if (file &&
                    $scope.environment.selectedType &&
                    $scope.environment.zScoreThreshold.max &&
                    $scope.environment.zScoreThreshold.min){

                    var params = {
                        collection: file.collection,
                        format: $scope.environment.selectedType.value,
                        interactionThreshold: 1,
                        zScoreThresholdMin: $scope.environment.zScoreThreshold.min,
                        zScoreThresholdMax: $scope.environment.zScoreThreshold.max,
                        file: true
                    }

                    var string = "collection=" + params.collection
                    + "&file=true&format=tsv&interactionThreshold=1&zScoreThresholdMax="
                    + params.zScoreThresholdMax + "&zScoreThresholdMin="
                    + params.zScoreThresholdMin

                    $window.open('/file?' + string)
                }
            })

            $scope.visualizeGraph = function(file){
                $scope.$emit('visualizeGraph', file)
            }

            $scope.downloadGraph = function(file){
                $scope.$emit('downloadGraph', file)
            }

        }

    })

})()
