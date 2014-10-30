var pandaController = require('./PandaController')

function getFile(request, response){

  console.log("Received get file request.\n")


  if (!request.params) {
    console.log("Received bad request!")
    response.status(501).send({error: "No request params set!"})
    return
  }
  
  //unwrap request
  var params = {folder: request.param('folder'), file: request.param('file')} 
  console.log("Request params: \n")
  console.log(params)
 
  var inst = pandaController.connectToEmitter()

  var resWrapper = function(data) {
    response.json(data)
  }

  var resErrWrapper = function(msg) {
    response.status(500).send({error:msg})
  }

  inst.emit('fileRequestJsonEvent', params, resWrapper, resErrWrapper)

}

function getTypes(request, response){

  console.log("Received get types request.\n")


  if (!request.params) {
    console.log("Received bad request!")
    response.status(501).send({error: "No request params set!"})
    return
  }

  var inst = pandaController.connectToEmitter()
  var resWrapper = function(data) {
    response.json(data)
  }
  var resErrWrapper = function(msg) {
    response.status(500).send({error:msg})
  }
  
  if (request.param('folder') ) {

    console.log('Available datasets request made')
    //unwrap request
    var params = {folder: request.param('folder')}
    inst.emit('listAvailableFilesEvent', params, resWrapper, resErrWrapper)
    return
  } else if (!request.param('folder')) {
    inst.emit('availableFoldersEvent', params, resWrapper, resErrWrapper)
    return
  } else {
    response.status(500).send({error:"Couldn't parse request"})
    return
  }


}


exports.rest = function(app) {

  app.route('/graph')
    .get(getFile)

  app.route('/types')
    .get(getTypes)

}
