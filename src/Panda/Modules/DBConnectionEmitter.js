var events = require('events'),
    util = require('util')

function DBConnectionEmitter(dburl, dbClient){

    var self = this

    events.EventEmitter.call(self)


    self.on('getFile', function(params){

        if (!params || !params.collection || !params.zScoreThreshold){

            self.emit('error', {msg: "DBConnectionEmitter Error: Missing getFile params"})
            return
        }

        dbClient.connect(dburl, function(err, db){

            if (err){

                var message = "DBConnectionEmitter Error: dbClient connection failed!"
                self.emit('error', {msg:message})
                return
            }

            db.collection(params.collection, function(err, collection){

                if (err){
                    var message = "DBConnectionEmitter Error: db collection instance creation failed!"
                    self.emit('error', {msg:message})
                    return
                }

                var query = {zScore:{$gt:+params.zScoreThreshold}}

                var cursorStream = collection.find(query, {_id:0}).stream()

                cursorStream.on('data', function(data){
                    self.emit('data', data)
                })

                cursorStream.on('close', function(){

                    db.close()
                    self.emit('close')

                })
            })

        })

    })

}
util.inherits(DBConnectionEmitter, events.EventEmitter)

exports.get = function(dburl, dbClient){
    return new DBConnectionEmitter(dburl, dbClient)
}

exports.construct = DBConnectionEmitter
