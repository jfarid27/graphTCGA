var events = require('events'),
  util = require('util')

var folderStructParseEmitter = function(folderStruct){

  var self = this;
  events.EventEmitter.call(self)

  self.on('getFolders', function(params, callback, err){

    var list = folderStruct.folders

    callback({folders:list})

  })

  self.on('getListFiles', function(params, callback, err){

    var response

    if(!params.folder){
      response = {}
      response.folders = folderStruct.folders
        .map(function(folder){ return folder })
    }


    if(params.folder){ 

      var folder = folderStruct.folders
        .filter(function(folder){ 
          return (params.folder == folder.name) 
      })[0]
    
      if (folder && folder.files) {
        response = {}
        response.files = folder.files
      } else {
        err("Matched folder error")
        return
      }

 
    }

    if (response){
      callback(response)
    } else {
      err("Case not matched for getListFiles event")
    }
  })

};
util.inherits(folderStructParseEmitter, events.EventEmitter)

exports.construct = folderStructParseEmitter

exports.get = function(folderStruct){
  return new folderStructParseEmitter(folderStruct);
}
