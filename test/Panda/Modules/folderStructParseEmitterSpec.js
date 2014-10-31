var folderStructParseEmitter = require('./../../../src/Panda/Modules/folderStructParseEmitter').constructor

describe('folderStructParseEmitter', function(){

  var testFolderStruct, emitter

  beforeEach(function(){
    
    testFolderStruct = {
      folders: [
        {
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

        }
      ]
    } 

    emitter = new folderStructParseEmitter(testFolderStruct)

  })

  describe('on subfolders event', function(){

    it('should populate callback with names of subfolders', function(done){


      var expected = ["MicroArray", "RNASeq"]
      var callback = function(list){

        list.should.containEql(expected[0])
        list.should.containEql(expected[1])
        done()
      }
      var err = function(){ 
        throw new Error("Subfolder err func called") 
        done() 
      } 

      emitter.emit('subfolders', callback, err)

    })

  })

  describe('on listFiles event', function(){

    describe('with folder parameter given', function(){
      it('should return files within folder', function(done){

        var expected = ["MVA_FinalNetwork.pairs"]
        var callback = function(list){
          list.should.containEql(expected[0])
          done()
        }
        var err = function(){ 
          throw new Error("Subfolder err func called")  
          done()
        } 

        emitter.emit('listFiles', {folder: "RNASeq"}, callback, err) 

      })

      describe('but no folder name matches', function(){
        it('should call the error callback', function(done){

          var callback = function(list){
            throw new Error("Success func called when it should error")  
            done()
          }
          var err = function(){ 
            done()
          } 

          emitter.emit('listFiles', {folder:"foo"}, callback, err)

        })
      })
    })

    describe('with folder parameter not given', function(){
      it('should return all files in every folder', function(done){
        
        var callback = function(resp){
          resp.should.containEql(testFolderStruct.folders[0])
          resp.should.containEql(testFolderStruct.folders[1])
          done()
        },
        err = function(){
          throw new Error("Error func called in test")
        }

        emitter.emit('listFiles', {}, callback, err)
        
 
      })
    })

  })

})
