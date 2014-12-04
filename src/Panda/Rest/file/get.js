function getFile(Controller, folderStructParseEmitter, DBConnectionEmitter, dbParser, dbUrl, mongoClient){
    return function(request, response){

        var dbConnectionEmitter = DBConnectionEmitter.get(dbUrl, mongoClient)

        var controller = Controller.get(folderStructParseEmitter, dbConnectionEmitter, dbParser)

        if (!request.params) {
            response.status(501).send({error: "Error: No request params set!"})
            return
        }

        //unwrap request
        var params = {
          collection: request.param('collection'),
          zScoreThreshold: request.param('zScoreThreshold'),
          interactionThreshold: request.param('interactionThreshold'),
          format: request.param('format')
        }

        if ( !params.collection || !params.zScoreThreshold || !params.interactionThreshold || !params.format){
          var message= "Error: Missing request params!"
          response.status(501).json({error: message})
          return
        }

        var resWrapperJson = function(data) {
            response.send(data)
            response.end()
        }


        var resWrapperTsv = function(data){
            response.send(data)
            response.end()
        }

        var resErrWrapper = function(msg) {
            response.status(501)
                .json({error:"Failed on file get", message: msg})
        }

        controller.on('error', function(error){
            resErrWrapper(error.msg)
        })

        if(params.format == 'json' || params.format == 'cytoscape'){
            controller.on('data', resWrapperJson)
            controller.emit('getFile', params)
        } else if (params.format == 'tsv') {
            controller.on('data', resWrapperTsv)
            controller.emit('getFile', params)
        }
    }
}

exports.construct = getFile
exports.get = function(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient){
    return new getFile(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient)
}
