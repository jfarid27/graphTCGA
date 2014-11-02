var events = require('events'),
  util = require('util')

var PandaController = function(folderStructureEmitter, fileReaderEmitter, bufferToGraphEdges){
    
    var self = this;
    events.EventEmitter.call(self);

    self.on('getFile', function(params, success, error){

        var successCurry = function(buffer){
            self.emit('parseBuffer', {buffer:buffer}, success, error)
            return
        }

        fileReaderEmitter.emit('getFile', params, successCurry, error)
    })

    self.on('getFolders', function(params, success, error){
        folderStructureEmitter.emit('getFolders', params, success, error)
    })

    self.on('getListFiles', function(params, success, error){
        folderStructureEmitter.emit('getListFiles', params, success, error)
    })

    self.on('parseBuffer', function(params, success, error){
        var edges = bufferToGraphEdges(params.buffer);
        self.emit('converted buffer to edges', {edges:edges})
        success({edges:edges})
    })

}
util.inherits(PandaController, events.EventEmitter)

exports.constructor = PandaController
exports.get = function(){
  return new PandaController();
}
