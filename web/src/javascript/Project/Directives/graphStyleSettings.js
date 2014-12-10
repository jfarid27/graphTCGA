(function(){

    define([], function(){

        return [
            {
                selector: 'node',
                css: {
                    'background-color': '#001fa2',
                    'content': 'data(id)',
                    'color': 'black',
                    'width':45,
                    'height':45,
                    'font-size': 57
                }
            },
            {
                selector: 'edge',
                css: {
                    'target-arrow-shape': 'triangle',
                    'line-color': '#000000',
                    'target-arrow-fill':'filled',
                    'width':13,
                    'target-arrow-color': '#000',
                }
            },
            {
                selector: 'graph-background',
                css: {
                    'overlay-color': 'green'
                }
            }
        ]

    })

})()
