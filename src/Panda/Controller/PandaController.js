var events = require('events'),
  util = require('util')

var PandaController = function(folderStructureEmitter, dbConnectionEmitter, dbParseModule){
    
    var self = this;
    events.EventEmitter.call(self);


    self.buffer = []

    self.on('getFile', function(params, success, error){

        dbConnectionEmitter.on('data', function(data){
            self.buffer.push(data)
        })

        dbConnectionEmitter.on('close', function(){
            var data = dbParseModule.parse(self.buffer, params)
            success(data)
        })

        dbConnectionEmitter.on('error', function(){
            self.emit('error', {msg: "PandaController Error: dbConnection emitted error"})
        })

        dbConnectionEmitter.emit('getFile', params)

    })

    self.on('getFolders', function(params, success, error){
        folderStructureEmitter.emit('getFolders', params, success, error)
    })

}
util.inherits(PandaController, events.EventEmitter)

exports.construct = PandaController
exports.get = function(folderStructureEmitter, fileReaderEmitter, bufferToGraphEdges){
  return new PandaController(folderStructureEmitter, fileReaderEmitter, bufferToGraphEdges);
}
