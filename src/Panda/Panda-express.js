var fs = require('fs'),
    pandaRest = require('./Rest/PandaRest.js').rest,
    fileStructure = require('./Data/fileStructure.js'),
    mongoClient = require('mongodb').MongoClient,
    folderStructParseEmitter = require('./Modules/folderStructParseEmitter.js')
        .get(fileStructure),
    dbParser = require('./Modules/dbParse.js').get(),
    PandaController = require('./Controller/PandaController.js').partial(),
    dbConnectionEmitter = require('./Modules/DBConnectionEmitter.js').partial()

var pandaExpress = function(app, dbUrl) {

    dbConnectionEmitter
        .url(dbUrl)
        .dbClient(mongoClient)

    PandaController
        .folderStruct(folderStructParseEmitter)
        .dbConn(dbConnectionEmitter)
        .dbParser(dbParser)

    pandaRest(app, PandaController)
}

exports.addRoutesTo = pandaExpress
