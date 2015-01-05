var getFile = require('./file/get.js').get,
    getFolder = require('./folder/get.js').get,
    getGeneCheck = require('./geneCheck/get.js').get;

exports.rest = function(app, controller) {

  app.route('/file')
    .get(getFile(controller))

  app.route('/folder')
    .get(getFolder(controller))

  app.route('/geneCheck')
    .get(getGeneCheck(controller))

}
