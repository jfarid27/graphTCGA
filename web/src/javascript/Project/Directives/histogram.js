(function(){

    define(['d3'], function(d3){

        d3.custom = {}
        d3.custom.histogram = function module(){

            var params = {
                width: 220,
                height: 100,
                margin: {
                    top: 10,
                    bottom: 40,
                    left: 10,
                    right: 60
                }
            }

            var data = []

            var brush

            var dispatch = d3.dispatch('brushing')

            function exports(_selection){

                var histogram = _selection.append('g')
                    .classed('histogram', true)

                var bars = histogram.append('g').classed('bar-group', true)

                var axisWidth = params.width - params.margin.right - params.margin.left
                var axisHeight = params.width - params.margin.right - params.margin.left

                var xScale = d3.scale.linear()
                    .domain([d3.min(data, function(d){ return d.x }), d3.max(data, function(d){ return d.x })+1])
                    .range([params.margin.left, params.margin.left + params.width])

                var yScale = d3.scale.linear()
                    .domain([d3.min(data, function(d){ return d.y }), d3.max(data, function(d){ return d.y })])
                    .range([params.margin.top + params.height, params.margin.top])

                var xAxis = d3.svg.axis().scale(xScale),
                    yAxis = d3.svg.axis().scale(yScale).ticks(4).orient("right")

                bars.selectAll('rect').data(data).enter().append('rect')
                    .attr('width', xScale(1) - xScale(0) - 2)
                    .attr('height', function(d){return params.margin.top + params.height - yScale(d.y)})
                    .attr('x', function(d, i){return xScale(d.x)})
                    .attr('y',  function(d,i){return yScale(d.y)})
                    .attr('fill', 'red')

                histogram.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (params.height + params.margin.top) + ")")
                    .call(xAxis);

                histogram.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + (params.margin.left + params.width) + ",0)")
                    .call(yAxis);

                brush = d3.svg.brush()
                    .x(xScale)
                    .extent([-4, 4])
                    .on("brush", function(){
                        dispatch.brushing(brush)
                    });

                var gBrush = histogram.append("g")
                    .classed("brush", true)
                    .call(brush);

                gBrush.selectAll("rect")
                    .attr("height", params.height + params.margin.top);


            }

            exports.width = function(value){
                if (!arguments.length){
                    return params.width
                }
                params.width = value
                return exports
            }

            exports.height = function(value){
                if (!arguments.length){
                    return params.height
                }
                params.height = value
                return exports
            }

            exports.data = function(value){
                if(!arguments.length){
                    return data
                }
                data = value
                return exports
            }

            exports.margin = function(dimension, value){
                if(!arguments.length){
                    return params.margin
                }
                params.margin[dimension] = value
                return exports
            }

            exports.brush = function(){
                if(!arguments.length){
                    return brush
                }

            }

            d3.rebind(exports, dispatch, "on");
            return exports
        }

    })

})()
