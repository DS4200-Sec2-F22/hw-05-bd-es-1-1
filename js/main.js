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
    .attr("cy", (d) => { return (FRAME_HEIGHT - (d.y) * SCALE) - 50 })
    .attr("r", 10)
    .attr("class", "point")
    .on("click", function (data) {
      const target = d3.select(this)
      const xPos = (parseInt(this.getAttribute('cx')) - PADDING) / SCALE;
      const yPos = ((FRAME_HEIGHT - parseInt(this.getAttribute('cy'))) / SCALE) - 1;

      let clickedPointInfo = "Last point clicked: (" + xPos + ", " + yPos + ")";

      document.getElementById("clickedPointInfo").innerHTML = clickedPointInfo;

      const stroke = target.attr("stroke");
      if (stroke === null || stroke === "none") {
        target.attr("stroke", "orange");
        target.attr("stroke-width", "5px");
      } else {
        target.attr("stroke", "none")
      }

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
      const target = d3.select(this)
      const xPos = (parseInt(this.getAttribute('cx')) - PADDING) / SCALE;
      const yPos = ((FRAME_HEIGHT - parseInt(this.getAttribute('cy'))) / SCALE) - 1;

      let clickedPointInfo = "Last point clicked: (" + xPos + ", " + yPos + ")";

      document.getElementById("clickedPointInfo").innerHTML = clickedPointInfo;

      const stroke = target.attr("stroke");

      if (stroke === null || stroke === "none") {
        target.attr("stroke", "orange");
        target.attr("stroke-width", "5px");
      } else {
        target.attr("stroke", "none")
      }


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

function build_interactive_plot() {
  // access the data for the bar graph
  d3.csv("data/bar-data.csv").then((data) => {

    // add bars for each data entry

    // categorical
    const X_SCALE = d3.scaleBand()
      .range([0, VIS_WIDTH])
      .domain(data.map(d => d.category))
      .padding(0.4);

    // integer
    const Y_SCALE = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return d.amount })])
      .range([VIS_HEIGHT, 0]);

    // add the x axis to the bar graph which will be the categorical (A,B,C ...) 
    FRAME2.append("g")
      .attr("transform", "translate(" + MARGINS.left +
        "," + (VIS_HEIGHT + MARGINS.top) + ")")
      .call(d3.axisBottom(X_SCALE));


    // add y axis to the bar graph which will be integers to 100
    FRAME2.append("g")
      .attr("transform", "translate(" + MARGINS.left +
        "," + MARGINS.top + ")")
      .call(d3.axisLeft(Y_SCALE));

    FRAME2.selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      // x position 
      .attr("x", (d) => {
        return (X_SCALE(d.category) + MARGINS.left);
      })
      // y position  
      .attr("y", (d) => {
        return (Y_SCALE(d.amount) + MARGINS.top);
      })
      // vis - height based off of class 
      .attr("height", (d) => {
        return (VIS_HEIGHT - Y_SCALE(d.amount));
      })
      // the width of the bar should be based on the X_SCALE 
      .attr("width", X_SCALE.bandwidth())

      .attr("id", (d) => {
        return (d.category);
      })
      .attr("class", "bar")
      
    // To add a tooltip, we will need a blank div that we 
    //  fill in with the appropriate text. Be use to note the
    //  styling we set here and in the .css
    const TOOLTIP = d3.select("#column1")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0); 


    FRAME2.selectAll(".bar")
      .on("mouseover", handleMouseover) //add event listeners
      .on("mousemove", handleMousemove)
      .on("mouseleave", handleMouseleave);   


    //  event listner for all three functions
    // Define event handler functions for tooltips
    function handleMouseover(event, d) {
      // on mouseover, make opaque 
      TOOLTIP.style("opacity", 1);

    }

    function handleMousemove(event, d) {
      // position the tooltip and fill in information 
      TOOLTIP.html("Category: " + d.category + "<br>" + "Value: " + d.amount )
        .style("left", (event.pageX + 10) + "px") //add offset
        // from mouse
        .style("top", (event.pageY - 50) + "px");
    }

    function handleMouseleave(event, d) {
      // on mouseleave, make transparant again 
      TOOLTIP.style("opacity", 0);
    }

    // Add event listeners
 
  });
}

build_interactive_plot();
