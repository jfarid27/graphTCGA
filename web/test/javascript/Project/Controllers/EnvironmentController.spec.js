(function(){

    var deps = ['./../../../../src/javascript/Project/Controllers/EnvironmentController']

    define(deps, function(EnvironmentController){

        describe('EnvironmentController', function(){
            var $scope, scopeConstr, Api, Environment, mockWindow, mockLibrary

            beforeEach(function(){

                scopeConstr = function(){

                    var self = this;

                    self.$on = function(event, success){
                        self.$registeredEvents[event] = success
                    }
                    self.$emit = function(event, params){
                        self.$registeredEvents[event]({}, params)
                    }
                    self.$registeredEvents = {}
                    self.$registeredWatchers = {}
                    self.$watch = function(property, callback){
                        self.$registeredWatchers[property] = callback
                    }
                }

                $scope = new scopeConstr()

                mockWindow = {
                    open: function(){
                        return
                    }
                }

                Api = {
                    getFile: function(params){
                        return {
                            $promise: {
                                then: function(success){
                                    success({edges: ['blah', 'blah2']})
                                }
                            }
                        }
                    },
                    getNearby: function(params){
                        return {
                            $promise: {
                                then: function(success){
                                    success({edges: ['blah', 'blah2']})
                                }
                            }
                        }
                    },
                    downloadFile: function(params){ return },
                    getFolder: function(params){
                        return {
                            $promise: {
                                then: function(success){

                                    var response = {
                                        folders:[{
                                          name:"MicroArray",
                                          files: [
                                            {
                                                name: "Breast invasive carcinoma",
                                                tag:"BRCA",
                                                type:"MicroArray",
                                                collection:"MABRCA"
                                            }
                                          ]
                                        },
                                        {
                                          name:"RNASeq",
                                          files: [
                                            {
                                                name: "Mesothelioma",
                                                tag:"MESO",
                                                type:"RNASeq",
                                                collection:"RNAMESO"
                                            },
                                            {
                                                name: "Breast invasive carcinoma",
                                                tag:"BRCA",
                                                type:"RNASeq",
                                                collection:"RNABRCA"
                                            }
                                          ]

                                        }]
                                    }

                                    success(response)
                                }
                            }
                        }
                    }
                }


                Environment = function(){
                    self.selectedFolder = undefined
                    self.selectedFiles = undefined
                    self.selectedType = undefined
                    self.availableTypes = [
                        {name:'.JSON', value:'json'},
                        {name:'.TSV', value:'tsv'},
                        {name:'Gephi', value:'gephi'},
                        {name:'Cytoscape', value:'cytoscape'}
                    ]
                    self.availableFolders = undefined
                    self.availableFiles = undefined
                    self.interactionThreshold = undefined
                    self.zScoreThreshold = undefined
                    self.graph = undefined
                }

                spyOn(Api, 'getFolder').and.callThrough()

                mockLibrary = {
                    'search': function(term){
                        return [{'score':0, 'phrase': {'name': 'BRCA', 'value': 'BRCA'} }]
                    }
                }


                EnvironmentController($scope, new Environment, Api, mockWindow, mockLibrary)


            })

            describe('scope', function(){

                describe('initialization', function(){

                    var expected

                    beforeEach(function(){
                        expected = [{
                          name:"MicroArray",
                          files: [
                            {
                                name: "Breast invasive carcinoma",
                                tag:"BRCA",
                                type:"MicroArray",
                                collection:"MABRCA"
                            }
                          ]
                        },
                        {
                          name:"RNASeq",
                          files: [
                            {
                                name: "Mesothelioma",
                                tag:"MESO",
                                type:"RNASeq",
                                collection:"RNAMESO"
                            },
                            {
                                name: "Breast invasive carcinoma",
                                tag:"BRCA",
                                type:"RNASeq",
                                collection:"RNABRCA"
                            }
                          ]

                        }]
                    })

                    it('should call api to get available folders', function(){
                        expect(Api.getFolder).toHaveBeenCalled()
                    })
                    it('should add available folders to scope', function(){
                        expect($scope.environment.availableFolders).toContain(expected[0])
                        expect($scope.environment.availableFolders).toContain(expected[1])
                    })

                    it('should add all files to scope', function(){
                        expect($scope.environment.allFiles).toContain(expected[0].files[0])
                        expect($scope.environment.allFiles).toContain(expected[1].files[0])
                    })

                    it('should add all files to matching datasets', function(){
                        expect($scope.environment.matchingDatasets).toContain(expected[0].files[0])
                        expect($scope.environment.matchingDatasets).toContain(expected[1].files[0])
                    })
                })

                describe('geneExplore event', function(){

                    beforeEach(function(){
                        spyOn(Api, 'getNearby').and.callThrough()

                        gene = {
                            gene: "AR",
                            collection:"MABRCA"
                        }

                        expected = {
                            collection: "MABRCA",
                            format: 'cytoscape',
                            interactionThreshold: 1,
                            gene: "AR"
                        }

                        $scope.$emit('geneExplore', gene)

                    })

                    it('should call api to get gene nearby network', function(){
                        expect(Api.getNearby).toHaveBeenCalledWith(expected)
                    })

                    describe('when api response is ok', function(){
                        it('should populate environment.graph with response', function(){
                            expect($scope.environment.graph.edges).toContain('blah')
                            expect($scope.environment.graph.edges).toContain('blah2')
                        })
                    })
                })

                describe('geneExplore function wrapper', function(){

                    beforeEach(function(){
                        $scope.environment.selectedGene = "AR"
                        $scope.environment.selectedFile = {
                            name: "Breast invasive carcinoma",
                            tag:"BRCA",
                            type:"MicroArray",
                            collection:"MABRCA"
                        }
                    })

                    it('should raise gene explore with environment variables', function(done){

                        $scope.$on('geneExplore', function(event, params){
                            expect(params.gene).toBe('AR')
                            expect(params.collection).toBe("MABRCA")
                            done()
                        })

                        $scope.geneExplore()
                    })
                })

                describe('environment.searchTerm registered watcher', function(){
                    describe('when fired', function(){

                        describe('with empty string', function(){

                            var expected

                            beforeEach(function(){
                                expected = [{
                                  name:"MicroArray",
                                  files: [
                                    {
                                        name: "Breast invasive carcinoma",
                                        tag:"BRCA",
                                        type:"MicroArray",
                                        collection:"MABRCA"
                                    }
                                  ]
                                },
                                {
                                  name:"RNASeq",
                                  files: [
                                    {
                                        name: "Mesothelioma",
                                        tag:"MESO",
                                        type:"RNASeq",
                                        collection:"RNAMESO"
                                    },
                                    {
                                        name: "Breast invasive carcinoma",
                                        tag:"BRCA",
                                        type:"RNASeq",
                                        collection:"RNABRCA"
                                    }
                                  ]

                                }]

                                spyOn(mockLibrary, 'search').and.callThrough()

                                $scope.$registeredWatchers['environment.searchTerm']("")

                            })

                            it('should populate matching datasets with undefined', function(){

                                expect($scope.environment.matchingDatasets)
                                    .toContain(expected[0].files[0])
                                expect($scope.environment.matchingDatasets)
                                    .toContain(expected[1].files[0])
                            })
                        })

                        describe('with a search string', function(){

                            var expected

                            beforeEach(function(){

                                expected = [
                                    {
                                        name: "Breast invasive carcinoma",
                                        tag:"BRCA",
                                        type:"MicroArray",
                                        collection:"MABRCA"
                                    },
                                    {
                                        name: "Breast invasive carcinoma",
                                        tag:"BRCA",
                                        type:"RNASeq",
                                        collection:"RNABRCA"
                                    }
                                ]

                                spyOn(mockLibrary, 'search').and.callThrough()

                                $scope.$registeredWatchers['environment.searchTerm']("Blah")
                            })

                            it('should call to search library using term',function(){
                                expect(mockLibrary.search).toHaveBeenCalledWith('Blah', -80)
                            })
                            it('should bind matching terms to environment.matchingTerms', function(){
                                expect($scope.environment.matchingDatasets).toContain(expected[0])
                                expect($scope.environment.matchingDatasets).toContain(expected[1])
                            })
                        })
                    })
                })

                describe('environment.selectedFolder registered watcher', function(){
                    describe('when fired', function(){

                        var expected

                        beforeEach(function(){

                            expected = {
                                name: "Breast invasive carcinoma",
                                tag:"BRCA",
                                type:"MicroArray",
                                collection:"MABRCA"
                            }

                            $scope.environment.selectedFolder = {
                              name:"MicroArray",
                              files: [
                                    {
                                    name: "Breast invasive carcinoma",
                                    tag:"BRCA",
                                    type:"MicroArray",
                                    collection:"MABRCA"
                                }
                              ]
                            }

                            $scope.$registeredWatchers['environment.selectedFolder']('MicroArray')
                        })

                        it('should populate environment.availableFiles correctly', function(){
                            expect($scope.environment.availableFiles).toContain(expected)
                        })
                    })
                })

                describe('visualizeGraph event', function(){

                    describe('when called with valid environment selections', function(){

                        var expected, file

                        beforeEach(function(){
                            spyOn(Api, 'getFile').and.callThrough()

                            file = {
                                name: "Breast invasive carcinoma",
                                tag:"BRCA",
                                type:"MicroArray",
                                collection:"MABRCA"
                            }

                            $scope.environment.interactionThreshold = 1
                            $scope.environment.zScoreThreshold = {min:3, max: 12}

                            expected = {
                                collection: "MABRCA",
                                format: 'cytoscape',
                                interactionThreshold: 1,
                                zScoreThresholdMax: 5.5,
                                zScoreThresholdMin: -5.5
                            }

                            $scope.$emit('visualizeGraph', file)
                        })

                        it('should call Api getfile', function(){

                            expect(Api.getFile).toHaveBeenCalledWith(expected)
                        })

                        it('should populate environment.graph with response', function(){
                            expect($scope.environment.graph.edges).toContain('blah')
                            expect($scope.environment.graph.edges).toContain('blah2')
                        })
                    })
                })

                describe('downloadGraph event', function(){

                    describe('when called with valid environment selections', function(){

                        var expected, file, expectedAddress

                        beforeEach(function(){
                            spyOn(mockWindow, 'open').and.callThrough()

                            file = {
                                name: "Breast invasive carcinoma",
                                tag:"BRCA",
                                type:"MicroArray",
                                collection:"MABRCA"
                            }

                            $scope.environment.interactionThreshold = 1
                            $scope.environment.zScoreThreshold = {
                                min: -7,
                                max: 7
                            }

                            expected = {
                                collection:"MABRCA",
                                file: true,
                                format: 'tsv',
                                interactionThreshold: 1,
                                zScoreThresholdMin: -7,
                                zScoreThresholdMax: 7
                            }

                            expectedAddress = "/file?collection=" + expected.collection
                                + "&file=" + expected.file
                                + "&format=" + expected.format
                                + "&interactionThreshold=" + expected.interactionThreshold
                                + "&zScoreThresholdMax=" + expected.zScoreThresholdMax
                                + "&zScoreThresholdMin=" + expected.zScoreThresholdMin

                            $scope.$emit('downloadGraph', file)
                        })

                        it('should open a new window with address of given collection and parameters', function(){

                            expect(mockWindow.open).toHaveBeenCalledWith(expectedAddress)

                        })
                    })

                })

                describe('downloadGraph emitter wrapper', function(){
                    describe('when called', function(){

                        beforeEach(function(){
                            spyOn($scope, '$emit')
                            $scope.downloadGraph({file:"foo"})
                        })

                        it('should fire downloadGraph event', function(){

                            expect($scope.$emit).toHaveBeenCalledWith('downloadGraph', {file:"foo"})
                        })
                    })
                })

                describe('visualizeGraph emitter wrapper', function(){
                    describe('when called', function(){

                        beforeEach(function(){
                            spyOn($scope, '$emit')
                            $scope.visualizeGraph({file:"foo"})
                        })

                        it('should fire visualizeGraph event', function(){
                            expect($scope.$emit).toHaveBeenCalledWith('visualizeGraph', {file:"foo"})
                        })
                    })
                })
            })
        })

    })

})()
