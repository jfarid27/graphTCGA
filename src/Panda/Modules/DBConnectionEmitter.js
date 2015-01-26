var events = require('events'),
    util = require('util')

function DBConnectionEmitter(dburl, dbClient){

    var self = this

    events.EventEmitter.call(self)


    self.on('getNearby', function(params){
        if (!params || !params.collection || !params.gene || params.zScoreThresholdMax == null || params.zScoreThresholdMin == null){

            self.emit('error', {msg: "DBConnectionEmitter Error: Missing getNearby params"})
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

                var query = {
                    $or:[
                        {
                            "source":params.gene,
                            $or:[{
                                "zScore": {
                                    $gt:+params.zScoreThresholdMin,
                                    $lt:+params.zScoreThresholdMax
                                }
                            }]
                        },
                        {
                            "target":params.gene,
                            $or:[{
                                "zScore": {
                                    $gt:+params.zScoreThresholdMin,
                                    $lt:+params.zScoreThresholdMax
                                }
                            }]
                        }
                    ]
                }

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

    self.on('getFile', function(params){

        if (!params || !params.collection || params.zScoreThresholdMax == null || params.zScoreThresholdMin == null){

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

                var query = {
                    "interaction":{$gte:params.interactionThreshold},
                    "zScore": {
                        $gt:+params.zScoreThresholdMin,
                        $lt:+params.zScoreThresholdMax
                    }
                }

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

exports.partial = function(){

    var dburl, dbClient

    function exports(){
        return new DBConnectionEmitter(dburl, dbClient)
    }

    exports.url = function(connectionUrl){
        if(arguments.length > 0){
            dburl = connectionUrl
            return this
        }

        return dburl
    }

    exports.dbClient = function(client){
        if(arguments.length > 0){
            dbClient = client
            return this
        }

        return dbClient
    }

    return exports
}

exports.construct = DBConnectionEmitter
