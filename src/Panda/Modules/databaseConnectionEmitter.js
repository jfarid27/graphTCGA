var events = require('events'),
    util = require('util');

var databaseConnectionEmitter = function(pathString, readableStreamAccumulator, filesystemEmitter){

    var self = this
    events.EventEmitter.call(self)

    self.cache = undefined

    self.on('getFile', function(params, success, error){

        if (!params.file || !params.folder){
            error("Missing params for get file")
            self.emit('error')
            return
        }

        var filepath = pathString + "/" + params.folder + "/" + params.file;

        var stream = new readableStreamAccumulator(filesystemEmitter.createReadStream(filepath))

        stream.on('data', function(bufferData){

            self.cache = bufferData
        })

        stream.on('close', function(){
            if (self.cache){
                success(self.cache, params)
            } else {
                error("Accumulator closed with no cache data present")
                self.emit('error')
            }
        })

        stream.on('error', function(err){
            error('readableStreamAccumulator error!')
            self.emit('error', err)
        })

    })


}
util.inherits(databaseConnectionEmitter, events.EventEmitter)

exports.construct = databaseConnectionEmitter
exports.get = function(pathString, readableStreamAccumulator, filesystemEmitter){
    return new databaseConnectionEmitter(pathString, readableStreamAccumulator, filesystemEmitter)
}
