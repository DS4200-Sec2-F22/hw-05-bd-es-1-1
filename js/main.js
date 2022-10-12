const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;

const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };

const SCALE = 50;

const FRAME1 = d3.select("#column1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

d3.csv("data/scatter-data.csv").then((data) => {

  FRAME1.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => { return d.x * SCALE; })
    .attr("cy", (d) => { return FRAME_HEIGHT - d.y * SCALE})
    .attr("r", 10)
    .attr("class", "point")


  const MAX_X = d3.max(data, (d) => {
    return parseInt(d.x);
  });

  const X_SCALE = d3.scaleLinear()
    .domain([0, MAX_X])
    .range([0, VIS_WIDTH]);

  FRAME1.append("g")
    .attr("transform", "translate(" + MARGINS.left + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(X_SCALE).ticks(10))
    .attr("font-size", "10px")
})
