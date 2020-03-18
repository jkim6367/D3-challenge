// @TODO: YOUR CODE HERE!

// Set Chart Parameters
var svgWidth = 960;
var svgHeight = 500;

var margin = {top: 20, right: 40, bottom: 60, left: 50};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold chart
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// shift SVG group to fit within margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("data/data.csv").then(function(statesData) {
    console.log(statesData);

    // Format the data into appropriate data types
    statesData.forEach(function(data){

        // Convert data into numeric values
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(statesData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(statesData, d => d.healthcare)])
        .range([height, 0]);

    // Set x and y axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
        
    chartGroup.append("g")
        .call(leftAxis);
    
    // Create circles and use class already set up
    var circlesGroup = chartGroup.selectAll("circle")
        .data(statesData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "14")
        .attr("fill", "blue")
        .classed("stateCircle", true)

    // Create state abbreviation in circles
    chartGroup.append("text")
        .classed("stateText", true)
        .selectAll("tspan")
        .data(statesData)
        .enter()
        .append("tspan")
        .attr("x", function(data) {
            return xLinearScale(data.poverty);
            })
        .attr("y", function(data) {
            return yLinearScale(data.healthcare-0.3);
            })
        .text(function(data) {
            return data.abbr
        });

    // Create title for x-axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)");

    // Create title for y=axis 
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .classed("aText", true)
        .text("In Poverty (%)");
  
    });


