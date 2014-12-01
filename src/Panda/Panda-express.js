var fs = require('fs'),
    pandaRest = require('./Rest/PandaRest.js').rest,
    fileStructure = require('./Data/fileStructure.js'),
    mongoClient = require('mongodb').MongoClient;


var pandaExpress = function(app, dbUrl) {

    var folderStructParseEmitter = require('./Modules/folderStructParseEmitter.js')
        .get(fileStructure)

    var readableStreamAccumulator = require('./Modules/readableStreamAccumulator.js')
        .construct

    var dbConnectionEmitter = require('./Modules/DBConnectionEmitter.js')
        .get(dbUrl, mongoClient)

    var bufferToGraph = require('./Modules/arrayToGraph.js').get()

    var pandaController = require('./Controller/PandaController.js')
        .get(folderStructParseEmitter, dbConnectionEmitter, bufferToGraph);


    pandaRest(app, pandaController)
}

exports.addRoutesTo = pandaExpress
