(function(){

    var deps = ['./../../../../src/javascript/Project/Factories/ApiFactory']

    define(deps, function(ApiFactory){

        describe('ApiFactory', function(){

            var api, fileResource, folderResource
            beforeEach(function(){

                fileResource = {get: function(){return 'bar'}}

                folderResource = {get: function(params){return (params && params.folder) ? 'zed' : 'haz'}}

                api = new ApiFactory(fileResource, folderResource)

            })

            describe('on getFile call', function(){

                var response

                beforeEach(function(){
                    spyOn(fileResource, 'get').and.callThrough()

                    response = api.getFile({"file":"foo"})
                })

                it('should have called fileResource get method', function(){
                    expect(fileResource.get).toHaveBeenCalledWith({'file':'foo'})
                })

                it('should return fileResources return object', function(){
                    expect(response).toBe('bar')
                })

            })

            describe('on downloadGraph call', function(){

                var response

                beforeEach(function(){
                    spyOn(fileResource, 'get').and.callThrough()

                    response = api.downloadGraph({"file":"foo", "folder": "bar"})
                })

                it('should have called fileResource get method', function(){
                    expect(fileResource.get).toHaveBeenCalledWith({"file":"foo", "folder": "bar"})
                })

                it('should return fileResources return object', function(){
                    expect(response).toBe('bar')
                })

            })

            describe('on getFolder call', function(){

                beforeEach(function(){
                    spyOn(folderResource, 'get').and.callThrough()
                })

                describe('with specified folder parameter', function(){

                    var response

                    beforeEach(function(){

                        response = api.getFolder({"folder":"foo"})

                    })

                    it('should have called folderResource get method', function(){
                        expect(folderResource.get).toHaveBeenCalledWith({'folder': 'foo'})
                    })

                    it("should return folderResource get method's response", function(){
                        expect(response).toBe('zed')
                    })
                })

                describe('without specified folder parameter', function(){

                    var response

                    beforeEach(function(){

                        response = api.getFolder()

                    })

                    it('should have called folderResource get method', function(){
                        expect(folderResource.get).toHaveBeenCalled()
                    })

                    it("should return folderResource get method's response", function(){
                        expect(response).toBe('haz')
                    })
                })

            })
        })

    })

})()
