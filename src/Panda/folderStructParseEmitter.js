var events = require('events'),
  util = require('util'),
  fileStructure = require('./data/fileStructure.js');

var folderStructParseEmitter = function(path){

  var self = this;
  events.EventEmitter.call(self)

  self.on('subfolders', function(params, callback){

    var response = fileStructure.folders
      .map(function(folder){ return folder.name }) 

    self.emit('subFoldersResponse', response)

    callback(response)

  })

  self.on('listFiles', function(params, callback){
 
    var folder = fileStructure.folders
      .filter(function(folder){ return (params.folder == folder.name) })[0]

    var response = folder.files

    self.emit('listFilesResponse', response)
    
    callback(response)
  })

};
util.inherits(folderStructParseEmitter, events.EventEmitter)

exports.folderStructParseEmitter = folderStructParseEmitter 

exports.connectToEmitter = function(path){
  return new folderStructParseEmitter(path);
}
