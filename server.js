var express = require("express"),
  app = express(),
  panda = require('./src/Panda/Panda-express.js');

/*
app.use(express.static(__dirname + '/web/lib'))
app.use(express.static(__dirname + '/web/js/lib'))
app.use(express.static(__dirname + '/bower_components'))
*/

function start() {

    panda.addRoutesTo(app, './src/Panda/Data')

    app.listen(3000, function(){
        console.log('Waiting for requests...')
    })    

}

exports.app = app
exports.start = start
