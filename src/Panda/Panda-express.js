var fs = require('fs'),
    pandaRest = require('./Rest/PandaRest.js').rest,
    fileStructure = require('./Data/fileStructure.js'),
    mongoClient = require('mongodb').MongoClient,
    folderStructParseEmitter = require('./Modules/folderStructParseEmitter.js')
        .get(fileStructure),
    dbParser = require('./Modules/dbParse.js').get(),
    PandaController = require('./Controller/PandaController.js').partial(),
    dbConnectionEmitter = require('./Modules/DBConnectionEmitter.js').partial(),
    geneCheckEmitter = require('./Modules/geneCheckEmitter').get

var pandaExpress = function(app, dbUrl) {

    dbConnectionEmitter
        .url(dbUrl)
        .dbClient(mongoClient)

    PandaController
        .folderStruct(folderStructParseEmitter)
        .dbConn(dbConnectionEmitter)
        .dbParser(dbParser)
        .geneCheckEmitter(geneCheckEmitter)

    pandaRest(app, PandaController)
}

exports.addRoutesTo = pandaExpress
