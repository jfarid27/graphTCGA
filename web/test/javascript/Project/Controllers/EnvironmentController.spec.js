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
                        return 'zed'
                    },
                    downloadGraph: function(params){
                        return {
                            $promise: {
                                then: function(success){
                                    success({edges: ['foo', 'bar']})
                                }
                            }
                        }
                    },
                    downloadFile: function(params){ return },
                    getFolder: function(params){
                        return (params && params.folder) ? {
                            $promise: {
                                then: function(success){
                                    success({files: ['foo']})
                                }
                            }
                        }

                        : {
                            $promise: {
                                then: function(success){
                                    success({folders: ['bar']})
                                }
                            }
                        }
                    }
                }
                spyOn(Api, 'getFolder').and.callThrough()

                Environment = {
                    selectedFolder: undefined,
                    selectedFiles: undefined,
                    availableFolders: undefined,
                    availableFiles: undefined
                }

                EnvironmentController($scope, Environment, Api)


            })

            describe('scope', function(){

                describe('initialization', function(){

                    it('should call api to get available folders', function(){
                        expect(Api.getFolder).toHaveBeenCalled()
                    })
                    it('should add available folders to scope', function(){
                        expect($scope.environment.availableFolders).toContain('bar')
                    })
                })

                describe('on selectedFolder watch call', function(){

                    var selectedFolder = 'foo'

                    it('should emit onFolderSelect event if selected folder is not null', function(){

                        spyOn($scope, '$emit')

                        $scope.$registeredWatchers['environment.selectedFolder']('foo')
                        expect($scope.$emit).toHaveBeenCalledWith('onFolderSelect', {'folder': 'foo'})
                    })

                })

                describe('on onFolderSelect event', function(){

                    var params, results

                    beforeEach(function(){

                        params = {folder: 'foo'}

                        spyOn($scope.$registeredEvents, 'onFolderSelect').and.callThrough()
                        $scope.$emit('onFolderSelect', params)
                    })

                    it('should call getFolder on api', function(){
                        expect(Api.getFolder).toHaveBeenCalledWith({folder:'foo'})
                    })
                    it('should populate available files on scope', function(){
                        expect($scope.$registeredEvents['onFolderSelect']).toHaveBeenCalled()
                        expect($scope.environment.availableFiles).toContain('foo')
                    })
                })

                describe('on onFileSelect event', function(){

                    var params, results

                    beforeEach(function(){
                        params = {file: 'foo'}
                        spyOn($scope.$registeredEvents, 'onFileSelect').and.callThrough()
                        $scope.$emit('onFileSelect', params)
                    })

                    it('should update selected file', function(){
                        expect($scope.environment.selectedFile).toBe('foo')
                    })
                })

                describe('on onDownloadGraph event', function(){

                    var params, results

                    beforeEach(function(){
                        params = {file:'foo', folder:'zed'}

                        spyOn($scope.$registeredEvents, 'onDownloadGraph').and.callThrough()
                        spyOn(Api, 'downloadGraph').and.callThrough()
                        $scope.$emit('onDownloadGraph', params)

                    })

                    it('should call downloadGraph on Api', function(){
                        expect(Api.downloadGraph).toHaveBeenCalledWith({file:'foo', folder:'zed'})

                    })

                    it('should populate scope with downloadGraph response', function(){
                        expect($scope.environment.graph.edges).toContain('foo')
                        expect($scope.environment.graph.edges).toContain('bar')
                    })
                })

                describe('on onDownloadFile event', function(){

                    it('should call Api.downloadFile', function(){

                        spyOn(Api, 'downloadFile')

                        $scope.$emit('onDownloadFile', {file:'foo', folder:'bar'})

                        expect(Api.downloadFile).toHaveBeenCalledWith({file:'foo', folder:'bar'})
                    })

                })

            })
        })

    })

})()
