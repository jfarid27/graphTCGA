function getFile(controller){
    return function(request, response){

      if (!request.params) {
        response.status(501).send({error: "No request params set!"})
        return
      }

      //unwrap request
      var params = {folder: request.param('folder'), file: request.param('file')}

      var resWrapper = function(data) {
        response.json(data)
      }

      var resErrWrapper = function(msg) {
        response.status(500).send({error:"Failed on file get"})
      }

      controller.emit('getFile', params, resWrapper, resErrWrapper)

    }
}

exports.construct = getFile
exports.get = function(controller){
    return new getFile(controller)
}
