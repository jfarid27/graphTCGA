function arrayToGraphEdge(arr){
  return (arr.length == 4) ? {
    'source':arr[0],
    'target': arr[1],
    'weight': arr[2],
    'strength': arr[3]
  } : undefined
};

function arraysToGraphEdges(arrs){

  return arrs.map(function(arr){
    return arrayToGraphEdge(arr)
  }).filter(function(obj) { return typeof(obj) != 'undefined' })

}

exports.arrayToGraphEdgeSync = arrayToGraphEdge
exports.arraysToGraphEdgesSync = arraysToGraphEdges 
