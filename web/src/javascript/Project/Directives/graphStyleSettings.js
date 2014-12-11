(function(){

    define([], function(){

        return [
            {
                selector: 'node',
                css: {
                    'background-color': '#000aff',
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
                    'line-color': '#ffc400',
                    'target-arrow-fill':'filled',
                    'width':13,
                    'target-arrow-color': '#ffc400',
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
