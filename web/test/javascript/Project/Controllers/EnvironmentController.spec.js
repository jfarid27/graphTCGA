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
                        self.$registeredEvents[event](params)
                    }
                    self.$registeredEvents = {}
                }

                $scope = new scopeConstr()

                Api = {
                    getFile: function(params){return 'zed'},
                    downloadFile: function(params){ return },
                    getFolder: function(params){ return (params && params.folder) ? ['foo'] : ['bar']}
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
                    it('should update selected folder', function(){
                        expect($scope.environment.selectedFolder).toBe('foo')
                    })
                })

                describe('on onFileSelect event', function(){

                    var params, results

                    beforeEach(function(){

                        params = {file: 'foo'}

                        spyOn($scope.$registeredEvents, 'onFileSelect').and.callThrough()
                        spyOn(Api, 'getFile').and.callThrough()
                        $scope.$emit('onFileSelect', params)
                    })

                    it('should call getFile on api', function(){
                        expect(Api.getFile).toHaveBeenCalledWith({file:'foo'})
                    })
                    it('should populate graph on scope', function(){
                        expect($scope.$registeredEvents.onFileSelect).toHaveBeenCalled()
                        expect($scope.environment.graph).toBe('zed')
                    })
                    it('should update selected file', function(){
                        expect($scope.environment.selectedFile).toBe('foo')
                    })
                })

                describe('on onDownloadFile event', function(){

                    var params, results

                    beforeEach(function(){
                        params = {file:'foo'}

                        spyOn($scope.$registeredEvents, 'onDownloadFile').and.callThrough()
                        spyOn(Api, 'downloadFile').and.callThrough()
                        $scope.$emit('onDownloadFile', params)

                    })

                    it('should call downloadFile on Api', function(){
                        expect(Api.downloadFile).toHaveBeenCalledWith({file:'foo'})
                    })
                })

            })
        })

    })

})()
