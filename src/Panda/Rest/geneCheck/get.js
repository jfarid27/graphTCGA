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
            gene: request.param('gene'),
            zScoreThreshold: parseFloat(request.param('zScoreThreshold')),
            format: request.param('format')
        }

        if (!params.gene || !params.collection || params.zScoreThreshold == null || !params.format){
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
        }

        controller.on('error', function(error){
            resErrWrapper(error.msg)
        })

        controller.on('data', function(data){
            response.send(data)
            response.end()
        })

        controller.emit('geneCheck', params)
    }
}

exports.construct = getFile
exports.get = function(controller){
    return new getFile(controller)
}

