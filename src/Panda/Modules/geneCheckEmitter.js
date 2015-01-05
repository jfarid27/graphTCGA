var events = require('events'),
  util = require('util')

var geneCheckEmitter = function(dbconnection){

        var self = this;
        events.EventEmitter.call(self)

        self.on('geneCheck', function(params, callback, err){

        var dbParams

        //if proper params aren't met
        if (!params || !params.gene || !params.collection || params.zScoreThreshold == null){
            //emit error and close out
            self.emit('error', {msg: "DBConnectionEmitter Error: Missing getFile params"})
            return
        }

        dbconnection.on('data', function(response){

            //for each edge in response data
            for(edge in response) {

                var thisEdge = response[edge]

                var matchingGene = (params.gene == thisEdge.source || params.gene == thisEdge.target)
                //if gene is source or target
                if (matchingGene){

                    //if significant
                    var significant = (response[edge].zScore >= params.zScoreThreshold ||
                        response[edge].zScore <= -params.zScoreThreshold)

                    if (significant){
                        self.emit('data', {isSignificant: true})
                        return
                    }

                }

            }

            self.emit('data', {isSignificant: false})
        })

        dbconnection.on('error', function(err){
          //emit error
            self.emit('error', err)
        })

        dbconnection.on('close', function(){
          //emit close
            self.emit('close')
        })

        //build proper params for db
        dbParams = {
            collection: params.collection,
            zScoreThresholdMax: +params.zScoreThreshold,
            zScoreThresholdMin: -params.zScoreThreshold
        }

        //call db with proper params
        dbconnection.emit('getFile', dbParams)

  })



};
util.inherits(geneCheckEmitter, events.EventEmitter)

exports.construct = geneCheckEmitter

exports.get = function(dbconnection){
  return new geneCheckEmitter(dbconnection);
}
