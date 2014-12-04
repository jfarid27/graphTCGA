function getFolder(Controller) {

    return function (request, response) {

        var controller = Controller()

        if (!request.params) {
            response.status(501).send({
                error: "No request params set!"
            })
            return
        }

        var resWrapper = function (data) {
            response.json(data)
        }
        var resErrWrapper = function (msg) {
            response.status(500).send({
                error: msg
            })
        }

        if (request.param('folder')) {
            //unwrap request
            var params = {
                folder: request.param('folder')
            }
            controller.emit('getListFiles', params, resWrapper, resErrWrapper)
            return
        } else if (!request.param('folder')) {
            controller.emit('getFolders', params, resWrapper, resErrWrapper)
            return
        } else {
            response.status(500).send({
                error: "Couldn't parse request"
            })
            return
        }

    }
}

exports.construct = getFolder
exports.get = function (controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient) {
    return new getFolder(controller, folderStructParseEmitter, dbConnectionEmitter, dbParser, dbUrl, mongoClient)
}
