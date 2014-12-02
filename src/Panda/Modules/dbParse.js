var dbParse = function(){

    var self = this

    self.parse = function(arr, params){
        if (params.type == 'json'){
            return self.parseJson(arr)
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

        var nodes = Object.keys(prenodes).map(function(nodeName){return {id:prenodes[nodeName], name:nodeName}})

        return {nodes: nodes, edges: arr}

    }

}

exports.construct = dbParse
exports.get = function(){ return new dbParse()}
