var events = require('events'),
  util = require('util'),
  fileStructure = require('./data/fileStructure.js');

var folderStructParseEmitter = function(path){

  var self = this;
  events.EventEmitter.call(self)

  self.on('subfolders', function(params, callback, err){

    var response = fileStructure.folders
      .map(function(folder){ return folder.name }) 

    callback(response)

  })

  self.on('listFiles', function(params, callback, err){
 
    var folder = fileStructure.folders
      .filter(function(folder){ return (params.folder == folder.name) })[0]

    if (folder && folder.files) {
      var response = folder.files
      callback(response)
    } else {
      err("Matched folder error")
    }

  })

};
util.inherits(folderStructParseEmitter, events.EventEmitter)

exports.folderStructParseEmitter = folderStructParseEmitter 

exports.connectToEmitter = function(path){
  return new folderStructParseEmitter(path);
}
