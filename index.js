var argvs = require('minimist')(process.argv.slice(2))

if (!argvs) {
    console.error("Error: No input args")
}

if (argvs['p'] && !argvs['t'] && !argvs['i'] && !argvs['output']) {
    var server = require('./server.js')
    server.start(argvs['p'])
}

if (argvs['z'] && argvs['i'] && argvs['_'].length == 1 && argvs['output']){
    //print out to output file


}

if (argvs['z'] && argvs['i'] && argvs['_'].length == 1){
    //Dump to stdout

}

