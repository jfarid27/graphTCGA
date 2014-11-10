var express = require("express"),
  app = express(),
  panda = require('./src/Panda/Panda-express.js');


//app.use(express.static(__dirname + '/web/src/javascript'))
app.use(express.static(__dirname + '/web/src/'))
app.use(express.static(__dirname + '/bower_components'))
app.use(express.static(__dirname + '/bower_components/jquery'))


function start() {

    panda.addRoutesTo(app, './src/Panda/Data')

    app.listen(3000, function(){
        console.log('Waiting for requests...')
    })    

}

exports.app = app
exports.start = start
