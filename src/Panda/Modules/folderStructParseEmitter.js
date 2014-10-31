var events = require('events'),
  util = require('util')

var folderStructParseEmitter = function(folderStruct){

  var self = this;
  events.EventEmitter.call(self)

  self.on('subfolders', function(callback, err){

    var list = folderStruct.folders
      .map(function(folder){ return folder.name }) 

    callback(list)

  })

  self.on('listFiles', function(params, callback, err){

    var response

    if(!params.folder){
      response = folderStruct.folders
        .map(function(folder){ return folder })
    }


    if(params.folder){ 

      var folder = folderStruct.folders
        .filter(function(folder){ 
          return (params.folder == folder.name) 
      })[0]
    
      if (folder && folder.files) {
        response = folder.files
      } else {
        err("Matched folder error")
        return
      }

 
    }

    if (response){
      callback(response)
    } else {
      err("Case not matched for listFiles event")
    }
  })

};
util.inherits(folderStructParseEmitter, events.EventEmitter)

exports.constructor = folderStructParseEmitter 

exports.get = function(folderStruct){
  return new folderStructParseEmitter(folderStruct);
}
