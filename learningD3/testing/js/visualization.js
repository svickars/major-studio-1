//************************************************************
// initialize Global Variables and call methods to plot visual
//************************************************************


	//margin variable is used to give margin to the svg element.USing this you can design relative position code
	var margin = {top: 20, right: 10, bottom: 100, left: 60},maxIndex=0,visible=true

	//This is to get width and height from parentdiv.So graph will be placed inside parent div
    width = document.getElementById("visualization").offsetWidth - margin.left - margin.right,
    height = document.getElementById("visualization").offsetHeight - margin.top - margin.bottom;



	var svg = d3.select("#visualization").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");
	var color = d3.scaleOrdinal(d3.schemeCategory20);
	var tooltip = d3.select("#visualization").append("div").attr("class", "tooltip"); 


//************************************************************
// Add dropdown values
//************************************************************


	var regions = new Set(),indicators = new Set();
	data.forEach(function(record){
		regions.add(record.region);
		indicators.add(record.indicator);
		})
		
	updateSelectOptions("region",Array. from(regions));
	updateSelectOptions("indicator",Array. from(indicators));


//************************************************************
// Draw Axis & line function
//************************************************************
	// Parse the date / time
	var parseDate = d3.timeParse("%y");

	// Set the ranges
	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);


	// Add the X Axis
	var x_axis=svg.append("g")
      .attr("transform", "translate(0," + height + ")")
     

	// Add the Y Axis
	var y_axis= svg.append("g");
      
	// Define the line
	var valueline = d3.line()
		.curve(d3.curveMonotoneX)
		.x(function(d) { return x(new Date(d.year,0,1)); })
		.y(function(d) { return y(d.value); });
    
	//call fucntion to genrate visual
	drawVisual();



//************************************************************
// Function genrating visualization - it will called when dropdown value changed
//************************************************************

	function drawVisual(){
	
	//remove path if exist
	d3.selectAll("path").remove();
	//Get selected region and indicator
	var region = getSelectedIndexValue("region");
	var indicator = getSelectedIndexValue("indicator");
	//generate data with selected filters
	var data_subset = data.filter(function(d) {return (d.region == region) && d.indicator ==indicator; });
	//Update graph title
	d3.select(".graph-title").html(indicator+" for " +region+" Region")
	// Nest the entries by country
    var dataNest = d3.nest()
        .key(function(d) { return d.country;})
        .entries(data_subset);

	// Scale the range of the data
	x.domain(d3.extent(data_subset, function(d) { return new Date(d.year,0,1); }));
	y.domain(d3.extent(data_subset, function(d) { return parseFloat(d.value); }));
	
	// Loop through each symbol / key
    dataNest.forEach(function(dataPath,index) {
	maxIndex = index;
	// Add the valueline path.
		var path = svg.append("path")
           .datum(dataPath.values)
		   .attr("class", "line line-"+index)
           .style("stroke",function(d,i){ return color(index)})
		   .attr("d", valueline)
		   .on("click", function(d,i){
				visible=!visible
				for(var n=0;n<=maxIndex;n++){
					if(n!=index){
						if(visible){
							d3.selectAll(".line-"+n).style("opacity", "1.0");
						} else {
							d3.selectAll(".line-"+n).style("opacity", "0.1");
						}
					}
				}
                })
           .on("mouseover", function(d){
           		path.style("stroke-width", "5px");
           })
		   .on("mousemove", function(d){
				//Add tooltip
				tooltip.style("display", "inline-block");
                tooltip.style("left", d3.event.pageX+margin.right+"px");
				tooltip.style("top", d3.event.pageY-margin.pad+"px");
				var tooltipHTML = "<div class='tooltip-title'>  "+d[0].country+ "</div>"+
				"<table><tr><th>Year </th><th> Value</th></tr>";
				d.forEach(function(yearRecord) {
					tooltipHTML+="<tr><td>"+yearRecord.year+"</td><td>"+Number(yearRecord.value).toFixed(2)+"</td></tr>"
				});
				tooltipHTML+="</tr><table></div>";
				tooltip.html(tooltipHTML);
                })
			.on("mouseout", function(d) {
				path.style("stroke-width", "1.5px");
				tooltip.style("display", "none")
			})
	
	
//************************************************************
// Animation for line
//************************************************************
	var totalLength = path.node().getTotalLength();
	path
		.attr("stroke-dasharray", totalLength + " " + totalLength)
		.attr("stroke-dashoffset", totalLength)
		.transition()
			.duration(2000)
			.ease(d3.easeLinear)
			.attr("stroke-dashoffset", 0);
	});
	
	//Draw axis with updated value
	x_axis.call(d3.axisBottom(x));
	y_axis.call(d3.axisLeft(y));

}
//************************************************************
// Util Methods
//************************************************************

	//Function will return selected options value for given ID
	function getSelectedIndexValue(id) {
		var e = document.getElementById(id);
		var value = e.options[e.selectedIndex].value;
		return value;
	}

	//Function will add options to passed id selectbox
	function updateSelectOptions(id,values){
		var region_select = d3.select("#"+id);
		region_select.selectAll("option")
			.data(values)
			.enter()
			.append("option")
			.attr("value", function (d) { return d; })
			.text(function (d) { return d; });
	}
