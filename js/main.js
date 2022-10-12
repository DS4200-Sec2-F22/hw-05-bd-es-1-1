const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;

const MARGINS = {left: 25, right: 25, top: 25, bottom: 25};

const SCALE = d3.scaleLinear()
  .domain(0, 9)
  .range(0, 450)




const FRAME1 = d3.select("#column1")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");



d3.csv("data/scatter-data.csv").then( (data) => {
  FRAME1.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => {return SCALE(d.x);})
  .attr("cy", (d) => { return FRAME_HEIGHT - SCALE(d.y) })
  .attr("r", 10)
  .attr("class", "point")

})

VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
VIS_HEIGHT = FRAME_WIDTH - MARGINS.left - MARGINS.right




FRAME1.append("g")
.attr("transform", "translate(" + MARGINS.left + ","
+ (VIS_HEIGHT + MARGINS.top) + ")")
.call(d3.axisBottom(X_SCALE).ticks(9))
.attr("font-size", "20px")

FRAME1.append("g")
  .attr("transform", "translate(" + (VIS_WIDTH + MARGINS.left) + ","
    + MARGINS.top + ")")
  .call(d3.axisLeft(SCALE).ticks(9))
  .attr("font-size", "20px")





