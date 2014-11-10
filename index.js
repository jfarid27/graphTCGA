var argvs = require('minimist')(process.argv.slice(2))

if (!argvs) {
    console.error("Error: No input args")
    return
}

if (argvs['p'] && !argvs['t'] && !argvs['i'] && !argvs['output']) {
    var server = require('./server.js')
    server.start(argvs['p'])
}

if (argvs['z'] && argvs['i'] && argvs['_'].length == 1 && argvs['output'] && argvs['f']){
    //print out to output file

    var fs = require('fs'),
        filepath = argvs['_'][0],
        outputpath = argvs['output'],
        bufferConverter = require('./src/Panda/Modules/arrayToGraph.js').get(),
        params = {
            zScoreThreshold: argvs['z'],
            interactionThreshold: argvs['i'],
            format: argvs['f']
        }

    if ( !(params.format == 'tsv') && !(params.format == 'json') && !(params.format == 'gephi') && !(params.format == 'cytoscape')){
        console.error('Error: Bad input parameter for output type')
        console.error('Expected: Valid output type')
        console.error('Received: ' + params.format)
        return
    }

    var readStream = fs.createReadStream(filepath)

    var readableStreamAccumulator = require('./src/Panda/Modules/readableStreamAccumulator.js')
        .get(readStream)

    readableStreamAccumulator.on('data', function(buffer){

        var arrs = bufferConverter.bufferToLines(buffer, params)

        if (params.format == 'tsv' ){
            fs.writeFileSync(outputpath,bufferConverter.arrayToTsv(arrs))
        }
        if (params.format == 'json'){
            fs.writeFileSync(outputpath,bufferConverter.arrayToJson(arrs))
        }
        if (params.format == 'gephi'){
            fs.writeFileSync(outputpath,bufferConverter.arrayToGephi(arrs))
        }
        if (params.format == 'cytoscape'){
            fs.writeFileSync(outputpath,bufferConverter.arrayToCytoscape(arrs))
        }

    })

    return

}

if (argvs['z'] && argvs['i'] && argvs['_'].length == 1 && argvs['f']){
    //Dump to stdout

    var fs = require('fs'),
        filepath = argvs['_'][0],
        bufferConverter = require('./src/Panda/Modules/arrayToGraph.js').get(),
        params = {
            zScoreThreshold: argvs['z'],
            interactionThreshold: argvs['i'],
            format: argvs['f']
        }

    if ( !(params.format == 'tsv') && !(params.format == 'json') && !(params.format == 'gephi') && !(params.format == 'cytoscape')){
        console.error('Error: Bad input parameter for output type')
        console.error('Expected: Valid output type')
        console.error('Received: ' + params.format)
        return
    }

    var readStream = fs.createReadStream(filepath)

    var readableStreamAccumulator = require('./src/Panda/Modules/readableStreamAccumulator.js')
        .get(readStream)

    readableStreamAccumulator.on('data', function(buffer){

        var arrs = bufferConverter.bufferToLines(buffer, params)

        if (params.format == 'tsv' ){
            console.log(bufferConverter.arrayToTsv(arrs))
        }
        if (params.format == 'json'){
            console.log(bufferConverter.arrayToJson(arrs))
        }
        if (params.format == 'gephi'){
            console.log(bufferConverter.arrayToGephi(arrs))
        }
        if (params.format == 'cytoscape'){
            console.log(bufferConverter.arrayToCytoscape(arrs))
        }

    })

    return

}

