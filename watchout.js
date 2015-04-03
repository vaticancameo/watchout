var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var svg = d3.select('body').append('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("border", 100)
    .append('g')
 //   .attr("transform", "translate(32," + (svgHeight / 2) + ")");

var nodes = d3.range(100).map(function() { return {
    radius: 15,
    cx: Math.random() * svgWidth - 50 ,
    cy: Math.random() * svgHeight - 50 }
    });

for (var i = 0; i < nodes.length; i++) {
  svg.append("circle")
  .attr("cx", nodes[i].cx)
  .attr("cy", nodes[i].cy)
  .attr("r", nodes[i].radius)
  .attr("fill", "blue");
}

var update = function() {
  svg.selectAll("circle")
    .transition().duration(1000)
    .attr('cx',  function(){return Math.random() * svgWidth - 50 })
    .attr('cy',  function(){return Math.random() * svgWidth - 50 });
};

setInterval(update, 1000);
