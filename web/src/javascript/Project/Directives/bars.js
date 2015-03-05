(function(){

    define(['d3'], function(d3){

        d3.custom = d3.custom ? d3.custom : {}

        d3.custom.bars = function module(){

            var params = {
                width: 300,
                height: 140,
                margin: {
                    top: 30,
                    bottom: 60,
                    left: 10,
                    right: 100
                }
            }

            var data = []

            var brush

            var dispatch = d3.dispatch('brushing')

            function exports(_selection){

                _selection

                var histogram = _selection.append('g')
                    .classed('histogram', true)

                var legend = _selection.append('g')
                    .classed('legend', true)

                var bars = histogram.append('g').classed('bar-group', true)

                var axisWidth = params.width - params.margin.right - params.margin.left
                var axisHeight = params.height - params.margin.top - params.margin.bottom - 30

                var xScale = d3.scale.linear()
                    .domain([5-.25, 6 + .25])
                    .range([params.margin.left, params.margin.left + axisWidth])

                var xAxis = d3.svg.axis().scale(xScale).tickValues([6, 5.75, 5.5, 5.25, 5])

                histogram.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (axisHeight + params.margin.top) + ")")
                    .call(xAxis);

                brush = d3.svg.brush()
                    .x(xScale)
                    .extent([5, 6])
                    .on("brush", function(){
                        dispatch.brushing(brush)
                    });

                var gBrush = histogram.append("g")
                    .classed("brush", true)
                    .call(brush);

                gBrush.selectAll("rect")
                    .attr("height", axisHeight -1)
                    .attr('y', params.margin.top -3)
                    .attr('fill', '#BF272D')
                    .attr('fill-opacity', '100%')


                legend.append('rect')
                    .attr('height', 15)
                    .attr('width', 15)
                    .attr('x', params.margin.left + 110)
                    .attr('y', 0)
                    .attr('fill', '#BF272D')
                    .attr('fill-opacity', '100%')

                legend.append('text')
                    .attr('x', params.margin.left)
                    .attr('y', 13)
                    .text( "Range (Included) - ")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                legend.append('text')
                    .classed('axis-label x-label', true)
                    .attr('x', params.margin.left + (axisWidth/2) )
                    .attr('y', params.margin.top + axisHeight + 34)
                    .text( "Z-Score")
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "14px")
                    .attr("fill", "black");

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
