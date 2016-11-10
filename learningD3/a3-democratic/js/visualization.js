//************************************************************
// initialize Global Variables and call methods to plot visual
//************************************************************


//margin variable is used to give margin to the svg element.USing this you can design relative position code
var margin = {
		top: 20,
		right: 20,
		bottom: 40,
		left: 60,
		pad: 30
	},
	maxIndex = 0,
	visible = true,
	maxIndex2 = 0,
	visible2 = true;

//This is to get width and height from parentdiv.So graph will be placed inside parent div
width = document.getElementById("visualization").offsetWidth - margin.left - margin.right,
	height = document.getElementById("visualization").offsetHeight;



var svg = d3.select("#visualization").append("svg")
	.attr("width", width + margin.left + margin.right)


var graph = svg
	.attr("height", (height))
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal(d3.schemeCategory20);
var tooltip = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-1");
var tooltip2 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-2");
var bisectDate = d3.bisector(function(d) {
	return new Date(d.year, 0, 1);
}).left;
var dataNest, data2Nest;

//************************************************************
// Add dropdown values
//************************************************************


var regions = new Set(),
	indicators = new Set();
data.forEach(function(record) {
	regions.add(record.region);
	indicators.add(record.indicator);
})


updateSelectOptions("region", Array.from(regions));
updateSelectOptions("indicator", Array.from(indicators));


//************************************************************
// Draw Axis & line function
//************************************************************
// Parse the date / time
var parseDate = d3.timeParse("%y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height / 2 - margin.bottom, 0]);
var y2 = d3.scaleLinear().range([height - margin.bottom, height / 2 - margin.bottom + margin.pad]);

// Add the X Axis for 1st graph
var x_axis = graph.append("g")
	.attr("transform", "translate(0," + (height / 2 - margin.bottom) + ")")


// Add the Y Axis for 1st graph
var y_axis = graph.append("g");

// Add the X Axis for 2nd graph
var x_axis2 = graph.append("g")
	.attr("transform", "translate(0," + (height - margin.bottom) + ")")


// Add the Y Axis for 2nd graph
var y_axis2 = graph.append("g");


// Define the line
var valueline = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y(d.value);
	});

// Define the line 2
var valueline2 = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y2(d.value);
	});

//call fucntion to genrate visual
drawVisual(true);



//************************************************************
// Function genrating visualization - it will called when dropdown value changed
//************************************************************

function drawVisual(refreshLine) {

	//remove path if exist
	d3.selectAll("path").remove();
	//Get selected region and indicator
	var region = getSelectedIndexValue("region");
	var indicator = getSelectedIndexValue("indicator");
	//generate data with selected filters
	var data_subset = data.filter(function(d) {
		return (d.region == region) && d.indicator == indicator;
	});
	//Update graph title
	d3.select(".graph-title").html(indicator + " for " + region + " Region")
		// Nest the entries by country
	dataNest = d3.nest()
		.key(function(d) {
			return d.country;
		})

	.entries(data_subset);

	// Scale the range of the data
	x.domain(d3.extent(data_subset, function(d) {
		return new Date(d.year, 0, 1);
	}));
	y.domain(d3.extent(data_subset, function(d) {
		return parseFloat(d.value);
	}));


	var countryColor = {};
	// Loop through each symbol / key
	dataNest.forEach(function(dataPath, index) {
		dataPath.key = formatConutry(dataPath.key);

		countryColor[dataPath.key] = color(index);
		maxIndex = index;
		// Add the valueline path.
		var path = graph.append("path")
			.datum(dataPath.values)
			.attr("class", "line line-" + dataPath.key + " line-" + index)
			.style("stroke", function(d, i) {
				return color(index)
			})
			.attr("d", valueline)
			
			.on("click", function(d, i) {

				visible = !visible;
				for (var n = 0; n <= maxIndex; n++) {
					if (n != index) {
						if (visible) {
							d3.selectAll(".line-" + n).style("display", "");
						}
						else {
							d3.selectAll(".line-" + n).style("display", "none");
						}
					}
				}
			})
			.on("mousemove", function(d) {
				mousemove(dataPath.key, d3.mouse(this)[0], false);

			})
			.on("mouseout", function(d) {
				mousedown();
			})

		//************************************************************
		// Animation for line
		//************************************************************
		if (refreshLine) {
			var totalLength = path.node().getTotalLength();
			path
				.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)
				.transition()
				.duration(2000)
				.ease(d3.easeLinear)
				.attr("stroke-dashoffset", 0);
		}
	});

	//generate democratic data with selected filters
	var democratic_data_subset = democratic_data.filter(function(d) {
		return (d.region == region) && d.indicator == "Democracy Index" && countryColor[d.country]
	});

	// Nest the entries by country
	data2Nest = d3.nest()
		.key(function(d) {
			return d.country;
		})
		.entries(democratic_data_subset);

	// Scale the range of the data
	x.domain(d3.extent(democratic_data_subset, function(d) {
		return new Date(d.year, 0, 1);
	}));
	y2.domain(d3.extent(democratic_data_subset, function(d) {
		return parseFloat(d.value);
	}));

	// Loop through each symbol / key
	data2Nest.forEach(function(dataPath, index) {
		dataPath.key = formatConutry(dataPath.key);

		maxIndex2 = index;
		// Add the valueline path.
		var path2 = graph.append("path")
			.datum(dataPath.values)
			.attr("class", "line democratic-line-" + dataPath.key + " democratic-line-" + index)
			.style("stroke", function(d, i) {
				return countryColor[dataPath.key]
			})
			.attr("d", valueline2)
			.on("click", function(d, i) {
				visible2 = !visible2;
				for (var n = 0; n <= maxIndex2; n++) {
					if (n != index) {
						if (visible2) {
							d3.selectAll(".democratic-line-" + n).style("display", "");
						}
						else {
							d3.selectAll(".democratic-line-" + n).style("display", "none");
						}
					}
				}
			})
			.on("mousemove", function(d) {
				mousemove(dataPath.key, d3.mouse(this)[0], true);

			})
			.on("mouseout", function(d) {
				mousedown();
			})

		//************************************************************
		// Animation for line
		//************************************************************
		if (refreshLine) {
			var totalLength = path2.node().getTotalLength();
			path2
				.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)
				.transition()
				.duration(2000)
				.ease(d3.easeLinear)
				.attr("stroke-dashoffset", 0);
		}
	});


	//Draw axis with updated value
	x_axis.call(d3.axisBottom(x));
	y_axis.call(d3.axisLeft(y));
	//Draw axis with updated value for 2nd graph
	x_axis2.call(d3.axisBottom(x));
	y_axis2.call(d3.axisLeft(y2));



}

//************************************************************
// Mouse events
//************************************************************

function mousemove(country, mousePosition, isdemocratic) {


	hoverLine(country, mousePosition);
	//Add tooltip 1
	tooltip.style("display", "inline-block");
	tooltip.style("left", d3.event.pageX + margin.right + "px");
	if (!isdemocratic) {
		tooltip.style("top", d3.event.pageY + "px");
	}
	else {
		tooltip.style("top", "250px");
	}

	var dataPath = getIndicatorValue(country);

	var x0 = x.invert(mousePosition),
		i = bisectDate(dataPath.values, x0, 1),
		d0 = dataPath.values[i - 1],
		d1 = dataPath.values[i];

	d = x0 - d0.year > d1.year - x0 ? d1 : d0;
	tooltip.html("<div class='tooltip-title'>  " + d0.country + " (" + getSelectedIndexValue("indicator") + ")</div>" +
		"<div class='tooltip-value'>" + d0.year + " : " + Number(d0.value).toFixed(2) + "</div>" +
		"<div class='tooltip-value'>" + d1.year + " : " + Number(d1.value).toFixed(2) + "</div>");



	var data2Path = getdemocraticValue(country);
	if (data2Path) {
		var x0 = x.invert(mousePosition),
			i = bisectDate(data2Path.values, x0, 1),
			d0 = data2Path.values[i - 1],
			d1 = data2Path.values[i];
		//Add tooltip 2
		tooltip2.style("display", "inline-block");
		tooltip2.style("left", d3.event.pageX + margin.right + "px");
		if (isdemocratic) {
			tooltip2.style("top", d3.event.pageY + "px");
		}
		else {
			tooltip2.style("top", "420px");
		}

		//d = x0 - d0.year > d1.year - x0 ? d1 : d0;
		tooltip2.html("<div class='tooltip-title'> " + d0.country + "(democratic  Value)</div>" +
			"<div class='tooltip-value'>" + d0.year + " : " + Number(d0.value).toFixed(2) + "</div>" +
			"<div class='tooltip-value'>" + d1.year + " : " + Number(d1.value).toFixed(2) + "</div>");
	}

}

function hoverLine(country, mousePosition) {
	d3.selectAll(".line").style("stroke-opacity", 0.1);
	d3.select(".line" + "-" + country).style("stroke-opacity", 0.8);
	d3.select(".democratic-line" + "-" + country).style("stroke-opacity", 0.8);

	var x0 = x.invert(mousePosition)

	d3.selectAll(".vertical-line").remove()
	svg.append("line")
		.attr("x1", x(x0) + margin.left + 10) //<<== change your code here
		.attr("y1", 0)
		.attr("x2", x(x0) + margin.left + 10) //<<== and here
		.attr("y2", height)
		.attr("class", "vertical-line")
		.style("stroke-width", 2)
		.style("stroke", "red")
		.style("fill", "none");
}

function mousedown() {
	tooltip.style("display", "none");
	tooltip2.style("display", "none");
	d3.selectAll(".line").style("stroke-opacity", 1);
	d3.selectAll(".vertical-line").remove();
}
//************************************************************
// Util Methods
//************************************************************
function formatConutry(country) {
	country = country.split(' ').join('-');
	country = country.split(',').join('');
	country = country.split('.').join('');
	return country;
}

function getIndicatorValue(country) {
	var countryValues;
	dataNest.forEach(function(dataPath, index) {
		if (dataPath.key == country) {
			countryValues = dataPath;
		}
	});
	return countryValues;
}

function getdemocraticValue(country) {
	var countryValues;
	data2Nest.forEach(function(dataPath, index) {
		if (dataPath.key == country) {
			countryValues = dataPath;
		}
	});
	return countryValues;
}
//Function will return selected options value for given ID
function getSelectedIndexValue(id) {
	var e = document.getElementById(id);
	var value = e.options[e.selectedIndex].value;
	return value;
}

//Function will add options to passed id selectbox
function updateSelectOptions(id, values) {
	var region_select = d3.select("#" + id);
	region_select.selectAll("option")
		.data(values)
		.enter()
		.append("option")
		.attr("value", function(d) {
			return d;
		})
		.text(function(d) {
			return d;
		});
}
