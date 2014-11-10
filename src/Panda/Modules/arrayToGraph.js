//New Stuff

function bufferToLines(buffer, params){
    var data = buffer.toString()
    var lines = data.split('\n')
    var arrs = lines.map(function(line){ return line.split('\t')})
    var filtered = arrs.filter(function(arr){
        var interaction = (parseFloat(arr[2]) >= params.interactionThreshold)
        var zScore = (parseFloat(arr[3]) >= params.zScoreThreshold)

        return (interaction && zScore) ? true : false
    })
    return filtered
}

function arrayToTsv(arr){
    var response = []

    for (edge in arr){

        var line = arr[edge][0] + '\t' + arr[edge][1] + '\t' + arr[edge][2] + '\t' + arr[edge][3] + '\n'

        response.push(line)
    }

    return response
}

function arrayToGephi(arr){
    var head = "Source\tTarget\tInteraction\tzScore\n"

    var body = arrayToTsv(arr).join("")

    return head + body

}

function arrayToJson(arr){

    var prenodes = {}

    for (edge in arr){

        if(typeof prenodes[arr[edge][0]] == 'undefined'){
            var index = Object.keys(prenodes).length
            prenodes[arr[edge][0]] = index
        }

        if(typeof prenodes[arr[edge][1]] == 'undefined'){
            var index = Object.keys(prenodes).length
            prenodes[arr[edge][1]] = index
        }

    }

    var nodes = Object.keys(prenodes).map(function(nodeName){return {id:prenodes[nodeName], name:nodeName}})

    var edges = []

    for (edge in arr){

        var edge = {
            source:prenodes[arr[edge][0]],
            target:prenodes[arr[edge][1]],
            interaction:arr[edge][2],
            zScore:arr[edge][3],
        }

        edges.push(edge)

    }

    return {nodes: nodes, edges: edges}

}

function arrayToCytoscape(arr){
    var js = arrayToJson(arr)

    var response = {
        elements:{
            nodes:[],
            edges:[]
        }
    }

    var indexes = {}
    for (node in js.nodes){

        indexes[js.nodes[node].id] = js.nodes[node].name
        var transform = {data:{id:js.nodes[node].name}}

        response.elements.nodes.push(transform)
    }

    for (edge in js.edges){
        var transform = {data:{
            id:edge,
            source: indexes[js.edges[edge].source],
            target: indexes[js.edges[edge].target],
            zScore: js.edges[edge].zScore,
            interaction: js.edges[edge].interaction
        }}

        response.elements.edges.push(transform)
    }



    console.log(response)

    return response
}

function arrayToGraph(){
    var self = this

    self.bufferToLines = bufferToLines
    self.arrayToJson = arrayToJson
    self.arrayToTsv = arrayToTsv
    self.arrayToGephi = arrayToGephi
    self.arrayToCytoscape = arrayToCytoscape
}

exports.construct = arrayToGraph
exports.get = function(){
    return new arrayToGraph()
}
