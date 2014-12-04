function getFile(Controller){
    return function(request, response){

        var controller = Controller()

        if (!request.params) {
            response.status(501).send({error: "Error: No request params set!"})
            return
        }

        //unwrap request
        var params = {
            collection: request.param('collection'),
            zScoreThreshold: request.param('zScoreThreshold'),
            interactionThreshold: request.param('interactionThreshold'),
            format: request.param('format'),
            file: request.param('file')
        }

        if ( !params.collection || !params.zScoreThreshold || !params.interactionThreshold || !params.format){
          var message= "Error: Missing request params!"
          response.status(501).json({error: message})
          return
        }

        var resErrWrapper = function(msg) {
            response.status(501)
                .json({error:"Failed on file get", message: msg})

            response.end()
        }

        if (params.file){
            response.set({
                'Content-Disposition': 'attachment; filename=download.txt'
            })
        }
        if (params.format =='json' ||params.format == 'cytoscape'){
            response.set('Content-Type', 'application/json')
        } else {
            response.set({
                'Content-Type': 'text/tab-separated-values',
            })

        }

        controller.on('error', function(error){
            resErrWrapper(error.msg)
        })

        controller.on('data', function(data){
            response.send(data)
            response.end()
        })

        controller.emit('getFile', params)
    }
}

exports.construct = getFile
exports.get = function(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient){
    return new getFile(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient)
}
