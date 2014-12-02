var fs = require('fs'),
    pandaRest = require('./Rest/PandaRest.js').rest,
    fileStructure = require('./Data/fileStructure.js'),
    mongoClient = require('mongodb').MongoClient,
    folderStructParseEmitter = require('./Modules/folderStructParseEmitter.js')
        .get(fileStructure),
    dbParser = require('./Modules/dbParse.js').get()



var pandaExpress = function(app, dbUrl) {

    var dbConnectionEmitter = require('./Modules/DBConnectionEmitter.js')
        .get(dbUrl, mongoClient)

    var pandaController = require('./Controller/PandaController.js')
        .get(folderStructParseEmitter, dbConnectionEmitter, dbParser);


    pandaRest(app, pandaController)
}

exports.addRoutesTo = pandaExpress
