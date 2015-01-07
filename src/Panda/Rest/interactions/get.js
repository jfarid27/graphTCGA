function getInteractions(Controller){
    return function(request, response){

        var controller = Controller()

        if (!request.params) {
            response.status(501).send({error: "Error: No request params set!"})
            return
        }

        //unwrap request
        var params = {
            collection: request.param('collection'),
            gene: request.param('gene'),
            interactionThreshold: parseFloat(request.param('interactionThreshold')),
            format: request.param('format')
        }

        if ( !params.collection || !params.interactionThreshold || !params.format || !params.gene ){
          var message= "Error: Missing request params!"
          response.status(501).json({error: message})
          return
        }

        var resErrWrapper = function(msg) {
            response.status(501)
                .json({error:"Failed on file get", message: msg})

            response.end()
        }

        if (params.format =='json' ||params.format == 'cytoscape'){
            response.set('Content-Type', 'application/json')
        } else if (params.format == 'tsv') {
            response.set({
                'Content-Type': 'text/tab-separated-values',
            })

            response.attachment('file.tsv')

        }

        controller.on('error', function(error){
            resErrWrapper(error.msg)
        })

        controller.on('data', function(data){
            response.send(data)
            response.end()
        })

        controller.emit('getNearby', params)
    }
}

exports.construct = getInteractions
exports.get = function(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient){
    return new getInteractions(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient)
}
