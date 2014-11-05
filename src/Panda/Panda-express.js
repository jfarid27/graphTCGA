var fs = require('fs'),
    pandaRest = require('./Rest/PandaRest.js').rest,
    fileStructure = require('./Data/fileStructure.js'),
    pathToFiles = './Data';

var folderStructParseEmitter = require('./Modules/folderStructParseEmitter.js')
    .get(fileStructure)

var readableStreamAccumulator = require('./Modules/readableStreamAccumulator.js')
    .construct

var fileReaderEmitter = require('./Modules/databaseConnectionEmitter.js')
    .get(pathToFiles, fs)

var bufferToGraphEdges = require('./Modules/arrayToGraphEdge.js').bufferToGraphEdges

var pandaController = require('./Controller/PandaController.js')
    .get(folderStructParseEmitter, fileReaderEmitter, bufferToGraphEdges);

var pandaExpress = function(app) {
    pandaRest(app, pandaController)
}

exports.addRoutesTo = pandaExpress
