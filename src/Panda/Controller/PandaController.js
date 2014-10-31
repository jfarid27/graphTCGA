var events = require('events'),
  util = require('util'),
  folderStructureEmitter = require('./folderStructParseEmitter'),
  readableStreamEmitter = require('./readableStreamBufferEmitter.js'),
  fs = require('fs'),
  arraysToGraphEdges = require('./arrayToGraphEdge.js').arraysToGraphEdgesSync

//Relative to server start for fs module
var pathToFiles = './src/Panda/data';


var PandaController = function(){

  var self = this;
  events.EventEmitter.call(self);

  self.on('fileRequestJsonEvent', function(params, callback, err){

    var filePath = pathToFiles + '/' + params.folder + '/' + params.file
    var fileConnection = fs.createReadStream(filePath)
     
    var connection = readableStreamEmitter
      .connectToStream(fileConnection, arraysToGraphEdgesWrapper(callback))
    
    connection.on('error', function(error){ 

      var message = "ReadableStreamEmitter Error"
      err(message) 

    })

  })

  self.on('availableFoldersEvent', function(params, callback, err){
  
    var connection = folderStructureEmitter.connectToEmitter()

    connection.emit('subfolders', params, subfolderWrapper(callback));

    connection.on('error', function() { err() }); 

  })

  self.on('listAvailableFilesEvent', function(params, callback, err){
    var connection = folderStructureEmitter.connectToEmitter()

    connection.emit('listFiles', params, subfolderWrapper(callback));

    connection.on('error', function(message) { err(message) }); 

  })

}
util.inherits(PandaController, events.EventEmitter)

exports.PandaController = PandaController
exports.connectToEmitter = function(){
  return new PandaController();
}

//Helper Functions

function subfolderWrapper(callback){

  return function(list){
    var response = {
      data: list
    }

    callback(response)
  }

}

function arraysToGraphEdgesWrapper(callback) {
 

    return function(list) {
      
      var response = { edges:arraysToGraphEdges(list) } 

      callback(response)
    }

}
