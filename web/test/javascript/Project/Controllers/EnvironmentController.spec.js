(function(){

    var deps = ['./../../../../src/javascript/Project/Controllers/EnvironmentController']

    define(deps, function(EnvironmentController){

        describe('EnvironmentController', function(){
            var $scope, scopeConstr, Api, Environment

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
                    downloadFile: function(params){ return },
                    getFolder: function(params){
                        return {
                            $promise: {
                                then: function(success){

                                    var response = {
                                        folders:[{
                                          name:"MicroArray",
                                          files: [
                                            "BRCA_FinalNetwork.pairs"
                                          ]
                                        },
                                        {
                                          name:"RNASeq",
                                          files: [
                                            "MVA_FinalNetwork.pairs"
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

                EnvironmentController($scope, new Environment, Api)


            })

            describe('scope', function(){

                describe('initialization', function(){

                    var expected

                    beforeEach(function(){
                        expected = [{
                          name:"MicroArray",
                          files: [
                            "BRCA_FinalNetwork.pairs"
                          ]
                        },
                        {
                          name:"RNASeq",
                          files: [
                            "MVA_FinalNetwork.pairs"
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
                })

                describe('environment.selectedFolder registered watcher', function(){
                    describe('when fired', function(){

                        beforeEach(function(){

                            $scope.environment.selectedFolder = {
                              name:"MicroArray",
                              files: [
                                "BRCA_FinalNetwork.pairs"
                              ]
                            }

                            $scope.$registeredWatchers['environment.selectedFolder']('MicroArray')
                        })

                        it('should populate environment.availableFiles correctly', function(){
                            expect($scope.environment.availableFiles).toContain("BRCA_FinalNetwork.pairs")
                        })
                    })
                })

                describe('visualizeGraph event', function(){

                    describe('when called with valid environment selections', function(){

                        var expected

                        beforeEach(function(){
                            spyOn(Api, 'getFile').and.callThrough()


                            $scope.environment.selectedFolder = {
                              name:"MicroArray",
                              files: [
                                "BRCA_FinalNetwork.pairs"
                              ]
                            }
                            $scope.environment.selectedFile = "BRCA_FinalNetwork.pairs"
                            $scope.environment.selectedType = {name:'Cytoscape', value:'cytoscape'}
                            $scope.environment.interactionThreshold = 1
                            $scope.environment.zScoreThreshold = 1

                            expected = {
                                folder: "MicroArray",
                                file: "BRCA_FinalNetwork.pairs",
                                format: 'cytoscape',
                                interactionThreshold: 1,
                                zScoreThreshold: 1
                            }

                            $scope.$emit('visualizeGraph')
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

                        var expected

                        beforeEach(function(){
                            spyOn(Api, 'getFile').and.callThrough()

                            $scope.environment.selectedFolder = {
                              name:"MicroArray",
                              files: [
                                "BRCA_FinalNetwork.pairs"
                              ]
                            }
                            $scope.environment.selectedFile = "BRCA_FinalNetwork.pairs"
                            $scope.environment.selectedType = {name:'.JSON', value:'json'}
                            $scope.environment.interactionThreshold = 1
                            $scope.environment.zScoreThreshold = 1

                            expected = {
                                folder: "MicroArray",
                                file: "BRCA_FinalNetwork.pairs",
                                format: 'json',
                                interactionThreshold: 1,
                                zScoreThreshold: 1
                            }

                            $scope.$emit('downloadGraph')
                        })

                        it('should call Api getfile', function(){

                            expect(Api.getFile).toHaveBeenCalledWith(expected)
                        })
                    })

                })
            })
        })

    })

})()
