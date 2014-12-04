var fs = require('fs'),
    pandaRest = require('./Rest/PandaRest.js').rest,
    fileStructure = require('./Data/fileStructure.js'),
    mongoClient = require('mongodb').MongoClient,
    folderStructParseEmitter = require('./Modules/folderStructParseEmitter.js')
        .get(fileStructure),
    dbParser = require('./Modules/dbParse.js').get(),
    pandaController = require('./Controller/PandaController.js'),
    dbConnectionEmitter = require('./Modules/DBConnectionEmitter.js')

var pandaExpress = function(app, dbUrl) {
    pandaRest(app, pandaController, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient)
}

exports.addRoutesTo = pandaExpress
