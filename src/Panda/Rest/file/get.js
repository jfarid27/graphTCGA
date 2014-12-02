function getFile(controller){
    return function(request, response){

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
        response.type('json')
        response.send(data)
        response.end()
      }


      var resWrapperTsv = function(data){
        response.type('tsv')
        response.send(data)
        response.end()
      }

      var resErrWrapper = function(msg) {
        response.status(501)
        .json({error:"Failed on file get", message: msg})
      }

      if(params.format == 'json' || params.format == 'cytoscape'){
          controller.emit('getFile', params, resWrapperJson, resErrWrapper)
      } else if (params.format = 'tsv' || params.format == 'gephi') {
          controller.emit('getFile', params, resWrapperTsv, resErrWrapper)

      }



    }
}

exports.construct = getFile
exports.get = function(controller){
    return new getFile(controller)
}
