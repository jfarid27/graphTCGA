(function(){

    var deps = ['./../../../../src/javascript/Project/Factories/EnvironmentFactory'];

    define(deps, function(EnvironmentFactory){

        describe('EnvironmentFactory', function(){

            var environment;

            beforeEach(function(){
                environment = new EnvironmentFactory()
            })

            describe('selectedFolder property', function(){
                it('should be defined', function(){
                    expect(Object.keys(environment)).toContain('selectedFolder')
                })
            })

            describe('selectedFiles property', function(){
                it('should be defined', function(){
                    expect(Object.keys(environment)).toContain('selectedFile')
                })
            })

            describe('availableFolders property', function(){
                it('should be defined', function(){
                    expect(Object.keys(environment)).toContain('availableFolders')
                })
            })

            describe('availableFiles property', function(){
                it('should be defined', function(){
                    expect(Object.keys(environment)).toContain('availableFiles')
                })
            })

            describe('graph property', function(){
                it('should be defined', function(){
                    expect(Object.keys(environment)).toContain('graph')
                })
            })

        })

    })
})()
