var getFile = require('./file/get.js').get,
    getFolder = require('./folder/get.js').get;

exports.rest = function(app, controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient) {

  app.route('/file')
    .get(getFile(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient))

  app.route('/folder')
    .get(getFolder(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient))

  app.route('/test')
    .get(function(req, res){
      res.send({"data":"Hello World"})
      res.end()
    })

}
