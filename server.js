var express = require("express"),
  app = express(),
  pandaRest = require('./src/Panda/PandaRest.js').rest;

app.use(express.static(__dirname + '/web/lib'))
app.use(express.static(__dirname + '/web/js/lib'))
app.use(express.static(__dirname + '/bower_components'))

function start() {

    pandaRest(app)

    app.listen(3000, function(){
        console.log('Waiting for requests...')
    })    

}

exports.app = app
exports.start = start