var events = require('events'),
  util = require('util')

var PandaController = function(folderStructureEmitter, fileReaderEmitter, bufferToGraph){
    
    var self = this;
    events.EventEmitter.call(self);

    self.on('getFile', function(params, success, error){

        var successCurry = function(buffer, params){
            self.emit('parseBuffer', buffer, params, success, error)
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

    self.on('parseBuffer', function(buffer, params, success, error){

        var data = bufferToGraph.bufferToLines(buffer, params)

        if (params.format == 'tsv'){
            success(bufferToGraph.arrayToTsv(data))
        } else if (params.format == 'json'){
            success(bufferToGraph.arrayToJson(data))
        } else if (params.format == 'gephi') {
            success(bufferToGraph.arrayToGephi(data))
        } else if (params.format == 'cytoscape') {
            success(bufferToGraph.arrayToCytoscape(data))
        } else {
            error("Error on buffer parsing")
        }

    })


}
util.inherits(PandaController, events.EventEmitter)

exports.construct = PandaController
exports.get = function(folderStructureEmitter, fileReaderEmitter, bufferToGraphEdges){
  return new PandaController(folderStructureEmitter, fileReaderEmitter, bufferToGraphEdges);
}
