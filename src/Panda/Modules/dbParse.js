var dbParse = function(){

    var self = this

    self.parse = function(arr, params){

        if (params.format == 'json'){
            return self.parseJson(arr)
        } else if (params.format == 'cytoscape'){
            return self.parseCytoscape(arr)
        } else {
            return undefined
        }
    }

    self.parseJson = function(arr){

        var prenodes = {}

        for (edge in arr){

            if(typeof prenodes[arr[edge]['source']] == 'undefined'){
                var index = Object.keys(prenodes).length
                prenodes[arr[edge]['source']] = index
            }

            if(typeof prenodes[arr[edge]['target']] == 'undefined'){
                var index = Object.keys(prenodes).length
                prenodes[arr[edge]['target']] = index
            }

        }

        var nodes = Object.keys(prenodes)
        .map(function(nodeName){
            return {
                id:prenodes[nodeName],
                name:nodeName
            }
        })

        var edges = []
        for (edge in arr){

            var edge = {
                source:prenodes[arr[edge]['source']],
                target:prenodes[arr[edge]['target']],
                interaction:arr[edge]['interaction'],
                zScore:arr[edge]['zScore'],
            }

            edges.push(edge)

        }

        return {nodes: nodes, edges: edges}

    }

    self.parseCytoscape = function(arr){
        var js = self.parseJson(arr)

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
            var transform = {
                data:{
                    id:edge,
                    source: indexes[js.edges[edge].source],
                    target: indexes[js.edges[edge].target],
                    zScore: js.edges[edge].zScore,
                    interaction: js.edges[edge].interaction
                }
            }


            response.elements.edges.push(transform)
        }



        return response
    }

}

exports.construct = dbParse
exports.get = function(){ return new dbParse()}
