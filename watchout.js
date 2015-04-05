var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var svg = d3.select('body').append('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("border", 100)
    .append('g')
 //   .attr("transform", "translate(32," + (svgHeight / 2) + ")");

var nodes = d3.range(20).map(function() { return {
    cx: Math.random() * svgWidth - 50 ,
    cy: Math.random() * svgHeight - 50 }
    });

  svg.selectAll("circle").data(nodes).enter().append("circle")
  .attr("cx", function(d){ return d.cx;})
  .attr("cy",  function(d){ return d.cy;})
  .attr("r",  10)
  .attr("fill", "#1E90FF");


var highScore = parseInt(d3.select('.high').select('span').text());
var currentScore = parseInt(d3.select('.current').select('span').text());
var collisionScore = parseInt(d3.select('.collisions').select('span').text());

var updateScoreboard = function() {
    d3.select('.scoreboard .current span').text(++currentScore);
 };

var update = function() {
 //   updateScoreboard();
  svg.selectAll("circle")
    .transition().duration(1000)
    .attr('cx',  function(){return Math.random() * svgWidth - 50 })
    .attr('cy',  function(){return Math.random() * svgWidth - 50 })
//    .transition().duration(1000).tween('attr', checkCollision());
};

var updateAndCheck = function(){
  updateScoreboard();
  checkCollision();
}

setInterval(update, 1500);

d3.timer(updateAndCheck);
//d3.timer(checkCollision,1000);

var drag = d3.behavior.drag().on("drag", function() {
        d3.select(this)
            .attr("x", d3.event.x)
            .attr("y", d3.event.y);
});

var player =
   svg.append('rect')
      .attr('id', 'draggablePlayer')
      .attr('x', svgWidth/2)
      .attr('y', svgHeight/2)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', 'black')
      .call(drag)


var checkCollision = function(){
    var x = d3.select('#draggablePlayer').attr('x');
    var y = d3.select('#draggablePlayer').attr('y');
    svg.selectAll('circle').each(function(){
        var xDiff = d3.select(this).attr('cx')-x;
        var yDiff = d3.select(this).attr('cy')-y;
        var separation = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2));
        if(separation<20){
            updateScore();
        }
    })
}


 var updateScore = function(){
     if(highScore<currentScore){
         d3.select('.scoreboard .high span').text(currentScore);
         highScore = currentScore;
         currentScore = 0;
     }
     d3.select('.scoreboard .collisions span').text(++collisionScore);
 }
