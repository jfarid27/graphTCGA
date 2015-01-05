var events = require('events'),
  util = require('util')

var PandaController = function(folderStructureEmitter, dbConnectionEmitter, dbParseModule, geneCheckEmitter){
    var self = this;
    events.EventEmitter.call(self);

    self.buffer = []

    self.on('getFile', function(params){

        dbConnectionEmitter.on('data', function(data){
            self.buffer.push(data)
        })

        dbConnectionEmitter.on('close', function(){

            var data = dbParseModule.parse(self.buffer, params)
            self.emit('data', data)
            self.emit('close')
        })

        dbConnectionEmitter.on('error', function(){
            self.emit('error', {msg: "PandaController Error: dbConnection emitted error"})
        })

        dbConnectionEmitter.emit('getFile', params)

    })

    self.on('getFolders', function(params, success, error){
        folderStructureEmitter.emit('getFolders', params, success, error)
    })

    self.on('geneCheck', function(params, success, error){
        geneCheckEmitter.on('data', function(data){
            self.emit('data', data)
        })

        geneCheckEmitter.on('close', function(){
            self.emit('close')
        })

        geneCheckEmitter.on('error', function(err){
            self.emit('error', err)
        })

        geneCheckEmitter.emit('geneCheck', params)
    })

}
util.inherits(PandaController, events.EventEmitter)

exports.construct = PandaController
exports.partial = function(){

    var folderStructureEmitter, dbConnectionEmitter, dbParseModule

    function exports(){
        //Here dbConnectionEmitter is partial and must be instantiated
        var dbConnection = dbConnectionEmitter()
        return new PandaController(folderStructureEmitter, dbConnection, dbParseModule);
    }

    exports.folderStruct = function(folderEmitter){
        if (arguments.length > 0){
            folderStructureEmitter = folderEmitter
            return this
        }

        return folderStructureEmitter
    }

    exports.dbConn = function(dbEmitter){
        if (arguments.length > 0){
            dbConnectionEmitter = dbEmitter
            return this
        }

        return dbConnectionEmitter
    }

    exports.dbParser = function(parser){
        if (arguments.length > 0){
            dbParseModule = parser
            return this
        }

        return dbParseModule
    }

    return exports
}
