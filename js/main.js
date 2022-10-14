// initialize variables for frame, setup
const FRAME_HEIGHT = 550;
const FRAME_WIDTH = 550;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };
const SCALE = 50;
const PADDING = 20;

// create first frame
const FRAME1 = d3.select("#column1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

// visualization size with margins in mind
VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

// access the data for the scatter plot
d3.csv("data/scatter-data.csv").then((data) => {

  // add circles for each coordinate in the data
  FRAME1.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => { return d.x * SCALE + PADDING; })
    .attr("cy", (d) => { return FRAME_HEIGHT - d.y * SCALE })
    .attr("r", 10)
    .attr("class", "point")
    .on("click", function(data) {
      const circle = d3.select(this)
      const display = document.getElementById('clickedPointInfo')
      const xPos = (parseInt(this.getAttribute('cx')) - PADDING) / SCALE; 
      const yPos = (FRAME_HEIGHT - parseInt(this.getAttribute('cy'))) / SCALE ;
      
      let clickedPointInfo = "Last point clicked: (" + xPos + ", " + yPos + ")";

      document.getElementById("clickedPointInfo").innerHTML = clickedPointInfo;

    })

  // find the max value in the dataset
  const MAX_X = d3.max(data, (d) => {
    return parseInt(d.x);
  });

  // create a scale to allow the program to accomodate
  // large numbers
  const X_SCALE = d3.scaleLinear()
    .domain([0, MAX_X])
    .range([0, VIS_WIDTH]);

  // create a scale to allow the program to accomodate
  // large numbers
  const Y_SCALE = d3.scaleLinear()
    .domain([MAX_X, 0])
    .range([0, VIS_WIDTH]);

  // add x axis to the graph
  FRAME1.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(X_SCALE).ticks(11))
    .attr("font-size", "10px");

  // add y axis to the graph
  FRAME1.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
    .call(d3.axisLeft(Y_SCALE).ticks(11))
    .attr("font-size", "10px");
})

// when clicked, add the border to a point and set the corresponding text
// box to state its coordinates
function pointClicked() {
  this.classList.toggle("border");

  let xPos = (this.getAttribute("cx") / SCALE);
  let yPos = 10 - (this.getAttribute("cy") / SCALE);

  let clickedPointInfo = "Last point clicked: (" + xPos + ", " + yPos + ")";

  document.getElementById("clickedPointInfo").innerHTML = clickedPointInfo;
}

// when the submit button is clicked, plot the new point
function submitClicked() {
  let x = Number(document.getElementById("xInput").value);
  let y = Number(document.getElementById("yInput").value);

  FRAME1.append("circle")
    .attr("cx", x * SCALE + PADDING)
    .attr("cy", FRAME_HEIGHT - MARGINS.bottom - y * SCALE)
    .attr("r", 10)
    .attr("class", "point")
    .on("click", function (data) {
      const circle = d3.select(this)
      const display = document.getElementById('clickedPointInfo')
      const xPos = (parseInt(this.getAttribute('cx')) - PADDING) / SCALE;
      const yPos = (FRAME_HEIGHT - parseInt(this.getAttribute('cy'))) / SCALE;

      let clickedPointInfo = "Last point clicked: (" + xPos + ", " + yPos + ")";

      document.getElementById("clickedPointInfo").innerHTML = clickedPointInfo;

    })
}

// assign an event handler to the form submit button
document.getElementById("button").addEventListener("click", submitClicked);



// create second frame
const FRAME2 = d3.select("#column1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

// access the data for the bar graph
d3.csv("data/bar-data.csv").then((data) => {

  // add bars for each data entry
  FRAME2.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", 25)
    .attr("height", (d) => { return FRAME_HEIGHT - MARGINS.bottom - d.amount; })
    .attr("x", MARGINS.left)
    .attr("class", "bar");

  // find the max value in the dataset
  const MAX_X = d3.max(data, (d) => {
    return parseInt(d.x);
  });

  // create a scale to allow the program to accomodate
  // large numbers
  const X_SCALE2 = d3.scaleLinear()
    .domain([0, MAX_X])
    .range([0, VIS_WIDTH]);

  // create a scale to allow the program to accomodate
  // large numbers
  const Y_SCALE2 = d3.scaleLinear()
    .domain([MAX_X, 0])
    .range([0, VIS_WIDTH]);

  // add x axis to the graph
  FRAME2.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(X_SCALE2).ticks(11))
    .attr("font-size", "10px");

  // add y axis to the graph
  FRAME2.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
    .call(d3.axisLeft(Y_SCALE2).ticks(11))
    .attr("font-size", "10px");
});