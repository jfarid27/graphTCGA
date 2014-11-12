(function(){

    define([], function(){

        return [
            {
                selector: 'node',
                css: {
                    'background-color': 'red',
                    'content': 'data(id)',
                    'color': 'black'
                }
            },
            {
                selector: 'edge',
                css: {
                    'target-arrow-shape': 'triangle',
                    'line-color': 'grey'
                }
            },
            {
                selector: 'edge-arrow',
                css: {
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': 'grey',
                    'line-color': 'grey'
                }
            }
        ]

    })

})()
