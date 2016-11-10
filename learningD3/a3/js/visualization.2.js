var margin = {
		top: 20,
		right: 10,
		bottom: 100,
		left: 60
	},
	maxIndex = 0,
	visible = true,
	maxIndex2 = 0,
	visible2 = true;

width = 1048 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;
width2 = 1048 - margin.left - margin.right,
	height2 = 500 - margin.top - margin.bottom;

var svg = d3.select("#visualization").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal(d3.schemeCategory20);
// var lbColor = d3.scaleOrdinal(d3.schemeCategory20);
var tooltip = d3.select("#visualization").append("div").attr("class", "tooltip");
var tooltip2 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-2");
var tooltip3 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-3");
var lightbox = d3.select("#visualization").append("div").attr("class", "lightbox");
var lbIn = d3.select("#visualization").append("div").attr("class", "lbIn").attr("id", "lbIn");
var bisectDate = d3.bisector(function(d) {
	return new Date(d.year, 0, 1);
}).left;
var dataNest, data2Nest;
var country;


// Add dropdown values

var regions = new Set(),
	indicators = new Set();
data.forEach(function(record) {
	regions.add(record.region);
	indicators.add(record.indicator);
})


updateSelectOptions("region", Array.from(regions));
updateSelectOptions("indicator", Array.from(indicators));


// -------------------
// Parse the date
var parseDate = d3.timeParse("%y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var y2 = d3.scaleLinear().range([height+300, height+100]);


// Add axes
var x_axis = svg.append("g")
	.attr("transform", "translate(0," + (height) + ")");
var x_axis2 = svg.append("g")
	.attr("transform", "translate(0," + (height+300) + ")");
var x_axis3 = svg.append("g")
	.attr("transform", "translate(0," + (height) + ")");
var y_axis = svg.append("g");
var y_axis2 = svg.append("g")
var y_axis3 = svg.append("g")


svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", height / 2)
	.attr("x2", width + 5)
	.attr("y2", height / 2);

svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", -5)
	.attr("x2", 0)
	.attr("y2", height + 5);
	
svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", height+300)
	.attr("x2", width + 5)
	.attr("y2", height+300);

svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", height+100-5)
	.attr("x2", 0)
	.attr("y2", height+300 + 5);
	


// draw line
var valueline = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y(d.value);
	});
var valueline2 = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y2(d.value);
	});

var line = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y(d.value);
	});

drawVisual(true);



// -----------------
// draw chart 

function drawVisual(refreshLine) {

	d3.selectAll("#circles").remove();
	d3.selectAll(".label").remove();
	//remove path if exist
	d3.selectAll("path").remove();
	//Get selected region and indicator
	var region = getSelectedIndexValue("region");
	var indicator = getSelectedIndexValue("indicator");
	//generate data with selected filters
	var data_subset = data.filter(function(d) {
		return (d.region == region) && d.indicator == indicator;
	});
	//Update title
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
	y.domain([-3, 3]);

	var countryColor = {};

	// Loop through each symbol / key
	dataNest.forEach(function(dataPath, index) {
		dataPath.key = formatCountry(dataPath.key);

		countryColor[dataPath.key] = color(index);
		maxIndex = index;
		// add the valueline path
		var path = svg.append("path")
			.datum(dataPath.values)
			.attr("class", "line line-" + dataPath.key + " line-" + index)
			.style("stroke", function(d, i) {
				return color(index)
			})
			.attr("d", valueline)
			// interaction
			.on("click", function(d, i) {
				var x0 = x.invert(d3.mouse(this)[0]),
					i = bisectDate(dataPath.values, x0, 1),
					d0 = dataPath.values[i - 1],
					country = d0.country;
				console.log(country);
				visible = !visible
				for (var n = 0; n <= maxIndex; n++) {
					if (n != index) {
						if (visible) {
							d3.selectAll(".line-" + n).style("opacity", "1.0");
						}
						else {
							d3.selectAll(".line-" + n).style("opacity", "0.1");
						}
					}
				}
				// show lightbox on click
				lightbox.style("display", "block")
					// hide lightbox on background click
					.on("click", function() {
						lightbox.style("display", "none");
						lbIn.style("display", "none");
						d3.selectAll(".line").style("opacity", "1.0");
					});
				lbIn.style("display", "block");

				var vertical = d3.select(".lbIn").append("div").attr("class", "verticalLine");
				var lbTooltip = d3.select(".lbIn").append("div").attr("class", "lbTooltip");

				var chart2 = d3.select(".lbIn")
					.append("svg")
					.attr("width", 1200)
					.attr("height", 500)
					.append("g")
					.attr("transform", "translate(85,40)");

				chart2.append("line")
					.attr("class", "baseLine")
					.attr("x1", 0)
					.attr("y1", height / 2)
					.attr("x2", width + 5)
					.attr("y2", height / 2);

				chart2.append("line")
					.attr("class", "baseLine")
					.attr("x1", 0)
					.attr("y1", -5)
					.attr("x2", 0)
					.attr("y2", height + 5);
				
				chart2.append("text")
					.attr("class", "lbtitle")
					.attr("text-anchor", "middle")
					.attr("x", width / 2)
					.attr("y", 19)
					.text(indicator + " Scores for " + country + " 2006-2014")
					.style("opacity", ".6");

				// Add the X Axis
				var x_axis = chart2.append("g")
					.attr("transform", "translate(0," + height + ")")
					.style("stroke-linecap", "round")
					.style("stroke-dasharray", ".1,20");

				// Add the Y Axis
				var y_axis3 = chart2.append("g")
					.style("stroke-linecap", "round")
					.style("stroke-dasharray", ".1,20");

				// Get the data
				d3.csv("governanceIndicators-r.csv", function(error, data) {
					data = data.filter(function(row) {
						return row['country'] == country;
					})

					data.forEach(function(d) {
						d.measure = d.measure;
					});

					data = d3.nest().key(function(d) {
						return d.measure;
					}).entries(data);

					console.log(data);

					x.domain(d3.extent(data_subset, function(d) {
						return new Date(d.year, 0, 1);
					}));
					y.domain([-3, 3]);

					var strokeHex = color(index);
					var strokeRGB = hexToRgbA(strokeHex);
					// console.log(strokeRGB);

					// Add the valueline path.
					for (var i = 0; i < data.length; i++) {
						var chart2Labels = chart2.append("text")
							.attr("x", 985)
							.attr("y", y(parseFloat(data[i].values[8].value)))
							.attr("dy", ".35em")
							.style("fill", strokeRGB + "," + (1 - i / 10) + ")")
							.style("font-size", 8)
							.style("text-transform", "uppercase")
							.text(data[i].key);
						var path2 = chart2.append("path")
							.datum(data[i].values)
							.attr("class", "line line-" + i)
							.style("stroke", strokeRGB + "," + (1 - i / 10) + ")")
							.attr("d", line)
							.on("mouseover", function(d) {
								d3.select(this).style("stroke-width", "5px");
							})
							.on("mousemove", function(d) {
								//Display tooltip
								lbTooltip.style("display", "inline-block");
								lbTooltip.style("background-color", color(index));

								// tooltip contents
								var x0 = x.invert(d3.mouse(this)[0]),
									j = bisectDate(dataPath.values, x0, 1),
									d0 = dataPath.values[j - 1];
								// d1 = dataPath.values[j];
								// console.log(d[j].value);

								if (d[i].measure == "Corruption Control") {
									lbTooltip.style("background-color", hexToRgbA(color(index)) + ",1.0")
								}
								else {
									if (d[i].measure == "Government Effectiveness") {
										lbTooltip.style("background-color", hexToRgbA(color(index)) + ",0.9")
									}
									else {
										if (d[i].measure == "Political Stability") {
											lbTooltip.style("background-color", hexToRgbA(color(index)) + ",0.8")
										}
										else {
											if (d[i].measure == "Regulatory Quality") {
												lbTooltip.style("background-color", hexToRgbA(color(index)) + ",0.7")
											}
											else {
												if (d[i].measure == "Rule of Law") {
													lbTooltip.style("background-color", hexToRgbA(color(index)) + ",0.6")
												}
												else {
													if (d[i].measure == "Voice and Accountability") {
														lbTooltip.style("background-color", hexToRgbA(color(index)) + ",0.5")
													}
												}
											}
										}
									}
								}


								lbTooltip.html("<div class='tooltip-title'> <strong> " + d[i].measure + "</strong> (estimated) for " + d0.year + ":<strong> " +
									Number(d[j - 1].value).toFixed(2) + "</strong></div>");
							})
							.on("mouseout", function(d) {
								d3.select(this).style("stroke-width", "1.5px");
								lbTooltip.style("display", "none");
							});
						x_axis3.attr("class", "x_axis axis").call(d3.axisBottom(x)
							.tickSizeInner(-height));
						y_axis3.attr("class", "y_axis axis").call(d3.axisLeft(y)
							.tickSizeInner(-width));
						
						d3.selectAll(".x_axis text")
							.attr("transform", "translate(0,10)");
						d3.selectAll(".y_axis text")
							.attr("transform", "translate(-5,0)");
						
						chart2.append("text")
							.attr("class", "y-label")
							.attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
							.attr("transform", "translate(" + -40 + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
							.text("Estimated Score")
							.style("opacity", .6);
						for (var h = 0; h < data[i].values.length; h++) {
							var chart2Circles = chart2.append("circle")
								.attr("cx", function(d) {
									return x(new Date(data[i].values[h].year, 0, 1));
								})
								.attr("cy", function(d) {
									return y(data[i].values[h].value);
								})
								.attr("r", 3)
								.style("z-index", "999")
								.style("fill", "white")
								.style("stroke", strokeRGB + "," + (1 - i / 10) + ")")
								.style("stroke-width", "1.5px");
							if (data[i].values[h].value == 0) {
								chart2Circles.style("visibility", "hidden");
							}
						}
					}
				})

				// // display vertical line
				// lbIn.on("mousemove", function(d) {
				// 		vertical.style("display", "inline-block");
				// 		vertical.style("height", 500);
				// 		vertical.style("left", d3.event.pageX + "px");
				// 	})
				// 	.on("mouseout", function(d) {
				// 		vertical.style("display", "none");
				// 	})



			})
			.on("mouseover", function(d) {
				path.style("stroke-width", "5px");
			})
			.on("mousemove", function(d) {
				mousemove(dataPath.key, d3.mouse(this)[0], false, color(index));
			})
			.on("mouseout", function(d) {
				path.style("stroke-width", "1.5px");
				// tooltip.style("display", "none");
				d3.selectAll(".line").style("stroke-opacity", 1);
				mousedown();
			})

		for (var i = 0; i < dataNest.length; i++) {
			for (var h = 0; h < dataNest[i].values.length; h++) {
				var circles = svg.append("circle")
					.attr("id", "circles")
					.attr("cx", function(d) {
						return x(new Date(dataNest[i].values[h].year, 0, 1));
					})
					.attr("cy", function(d) {
						return y(dataNest[i].values[h].value);
					})
					.attr("r", 3)
					.style("fill", "white")
					.style("stroke", color(i))
					.style("stroke-width", "1.5px")
				if (dataNest[i].values[h].value == 0) {
					circles.style("visibility", "hidden");
				}
			}
		}

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
	y2.domain([0,10]);

	// Loop through each symbol / key
	data2Nest.forEach(function(dataPath, index) {
		dataPath.key = formatCountry(dataPath.key);

		maxIndex2 = index;
		// Add the valueline path.
		var path2 = svg.append("path")
			.datum(dataPath.values)
			.attr("class", "line democratic-line-" + dataPath.key + " democratic-line-" + index)
			.style("stroke", function(d, i) {
				return countryColor[dataPath.key]
			})
			.style("opacity", .65)
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
			.on("mouseover", function(d) {
				path2.style("stroke-width", "5px");
				path2.style("opacity", 1);
			})
			.on("mousemove", function(d) {
				mousemove(dataPath.key, d3.mouse(this)[0], true, color(index));

			})
			.on("mouseout", function(d) {
				path2.style("stroke-width", "1.5px");
				path2.style("opacity", .65);
				mousedown();
			})


		for (var i = 0; i < data2Nest.length; i++) {
			for (var h = 0; h < data2Nest[i].values.length; h++) {
				var circles = svg.append("circle")
					.attr("id", "circles-" + data2Nest[i].key)
					.attr("class", "circles2")
					.attr("cx", function(d) {
						return x(new Date(data2Nest[i].values[h].year, 0, 1));
					})
					.attr("cy", function(d) {
						return y2(data2Nest[i].values[h].value);
					})
					.attr("r", 3)
					.style("fill", "white")
					.style("stroke", color(i))
					.style("stroke-width", "1.5px")
					.style("opacity", .75)
					.style("visibility", "hidden");
				if (data2Nest[i].values[h].value == 0) {
					circles.style("visibility", "hidden");
				}
			}
		}


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



	x_axis.attr("class", "xaxis axis").call(d3.axisBottom(x)
		.tickSizeInner(-height)
		.tickSizeOuter(0));
	y_axis.attr("class", "yaxis axis").call(d3.axisLeft(y)
		.tickSizeInner(-width)
		.tickSizeOuter(0));
	x_axis2.attr("class", "xaxis2 axis").call(d3.axisBottom(x)
		.tickSizeInner(-200)
		.tickSizeOuter(0));
	y_axis2.attr("class", "yaxis2 axis").call(d3.axisLeft(y2)
		.tickSizeInner(-width)
		.tickSizeOuter(0));
	
	d3.selectAll(".xaxis text")
		.attr("transform", "translate(0,45)")
		.style("opacity", .6)
		.style("font-size", "10px");
	d3.selectAll(".yaxis text")
		.attr("transform", "translate(-5,0)");
	d3.selectAll(".xaxis2 text")
		.attr("display", "none");
	d3.selectAll(".yaxis2 text")
		.attr("transform", "translate(-5,0)");
	
	// now add titles to the axes
    svg.append("text")
    	.attr("class", "y-label")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ -40 +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Estimated Score")
        .style("opacity", .6);
    svg.append("text")
    	.attr("class", "y-label")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ -40 +","+(height+200)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Democratic Score")
        .style("opacity", .6);
    svg.append("text")
    	.attr("class", "label")
    	.attr("text-anchor", "middle")
    	.attr("x", width/2)
    	.attr("y", 19)
    	.style("opacity", .6)
    	.text(indicator+", 2006-2014");
    svg.append("text")
    	.attr("class", "label")
    	.attr("text-anchor", "middle")
    	.attr("x", width/2)
    	.attr("y", height+114)
    	.style("opacity", .6)
    	.text("Democracy Index, 2006-2014");

}

//************************************************************
// Mouse events
//************************************************************

function mousemove(country, mousePosition, isdemocratic, color) {

	hoverLine(country, mousePosition);
	//Add tooltip 1
	tooltip.style("display", "inline-block");
	tooltip.style("left", d3.event.pageX + margin.right + "px");
	tooltip.style("background-color", color);
	tooltip.style("opacity", .85);
	tooltip3.style("display", "inline-block");
	tooltip3.style("left", d3.event.pageX + "px");
	tooltip3.style("top", "110px");
	tooltip3.style("background-color", "white");
	tooltip3.style("border", "1px solid grey");
	tooltip3.style("border-top-left-radius", "0");
	tooltip3.style("border-bottom-left-radius", "0");
	tooltip3.style("opacity", 0.85);
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

	// d = x0 - d0.year > d1.year - x0 ? d1 : d0;
	tooltip.html("<div class='tooltip-title'>  " + getSelectedIndexValue("indicator") + " (estimated) for <strong>" + d0.country + "</strong>: " +
		Number(d0.value).toFixed(2) + "</div>")
	tooltip3.html("<div class='tooltip-year'> " + d0.year + "</div>");
		
	


	var data2Path = getdemocraticValue(country);
	if (data2Path) {
		var x0 = x.invert(mousePosition),
			i = bisectDate(data2Path.values, x0, 1),
			d0 = data2Path.values[i - 1],
			d1 = data2Path.values[i];
		//Add tooltip 2
		d3.selectAll("#circles-" + d0.country)
			.style("visibility", "visible");
		console.log(d0.country);
		
		tooltip2.style("display", "inline-block");
		tooltip2.style("left", d3.event.pageX + margin.right + "px");
		tooltip2.style("background-color", color);
		tooltip2.style("opacity", .85);
		if (isdemocratic) {
			tooltip2.style("top", d3.event.pageY + "px");
		}
		else {
			tooltip2.style("top", 300+height+"px");
		}

		//d = x0 - d0.year > d1.year - x0 ? d1 : d0;
		tooltip2.html("<div class='tooltip-title'>Democratic Score for <strong>" + d0.country + "</strong>: " +
		Number(d0.value).toFixed(2) + "</div>");
	}

}

function hoverLine(country, mousePosition) {
	// d3.selectAll(".line").style("stroke-opacity", 0.1);
	d3.select(".line").style("stroke-width", ".25px");
	// d3.select(".line" + "-" + country).style("stroke-opacity", 0.8);
	d3.select(".line" + "-" + country).style("stroke-width", "5px");
	d3.select(".democratic-line" + "-" + country).style("stroke-width", "5px");
	d3.select(".democratic-line" + "-" + country).style("opacity", 1);
	d3.selectAll(".circles2")
			.style("visibility", "hidden");

	var x0 = x.invert(mousePosition)

	d3.selectAll(".vertical-line").remove()
	svg.append("line")
		.attr("x1", x(x0)+1)
		.attr("y1", 0)
		.attr("x2", x(x0)+1)
		.attr("y2", height)
		.attr("class", "vertical-line")
		.style("stroke-width", 1)
		.style("stroke", "grey")
		.style("fill", "none");
	d3.selectAll(".vertical-line2").remove()
	svg.append("line")
		.attr("x1", x(x0)+1)
		.attr("y1", height+100)
		.attr("x2", x(x0)+1)
		.attr("y2", height+300)
		.attr("class", "vertical-line2")
		.style("stroke-width", 1)
		.style("stroke", "grey")
		.style("fill", "none");
}

function mousedown() {
	tooltip.style("display", "none");
	tooltip2.style("display", "none");
	tooltip3.style("display", "none");
	d3.selectAll(".line").style("stroke-width", "1.5px");
	d3.selectAll(".democratic-line").style("stroke-width", "1.5px");
	d3.selectAll(".democratic-line").style("opacity", .65);
	d3.selectAll(".vertical-line").remove();
	d3.selectAll(".vertical-line2").remove();
	d3.selectAll(".circles2")
			.style("visibility", "hidden");
}
//************************************************************
// Util Methods
//************************************************************
function formatCountry(country) {
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



// convert hex colour to RGB
function hexToRgbA(hex) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
	}
	throw new Error('Bad Hex');
}