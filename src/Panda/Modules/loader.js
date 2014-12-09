var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    fs = require('fs'),
    file = process.argv[2],
    collection = process.argv[3]

var url = 'mongodb://localhost:27017/panda'

MongoClient.connect(url, function(err, db){

  assert.equal(null, err)
  var stream = fs.createReadStream(file)
  
  var acc = '',
  lines,
  col = db.collection(collection)

  stream.on('data', function(chunk){

    acc = acc.concat(chunk.toString())

    var lines = acc.split('\n')
    acc = lines.pop()

    if (lines.length > 1){

      for (var j = 0; j < lines.length; j++){
        pushLine(lines[j])

      }


    }

    

  })

  stream.on('error', function(){
    console.log('Stream Error')
    db.close()
  })

  stream.on('close', function(){

    var lines = acc.split('\n')

    for(var j = 0; j < lines.length; j++){
      pushLine(lines[j])
    }

    db.close()

  })
 
  function pushLine(line){
     var d = line.split('\t')
     if (d.length != 4){

       console.log("Parse error on:\n")
       console.log(d)

     }
     var edge = {
          source: d[0],
          target: d[1],
          interaction: parseFloat(d[2]),
          zScore: parseFloat(d[3])
     }

    col.insert(edge, {w:1}, function(err, result){
      if (err){
        console.log("Insertion Error\n")
        console.log(err)
      }
    })

  }


})
