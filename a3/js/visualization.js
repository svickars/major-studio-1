var margin = {
		top: 20,
		right: 100,
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
	.attr("id", "svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", 1200)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal(d3.schemeCategory20);
// var lbColor = d3.scaleOrdinal(d3.schemeCategory20);
var tooltip = d3.select("#visualization").append("div").attr("class", "tooltip");
var tooltip2 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-2");
var tooltip3 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-3");
var aTooltip = d3.select("#visualization").append("div").attr("class", "tooltip aTooltip");
var lightbox = d3.select("#visualization").append("div").attr("class", "lightbox");
var lbIn = d3.select("#visualization").append("div").attr("class", "lbIn").attr("id", "lbIn");
var bisectDate = d3.bisector(function(d) {
	return new Date(d.year, 0, 1);
}).left;
var dataNest, data2Nest;
var country;

var subtitle = d3.select("#visualization").append("div").attr("id", "subtitle");
subtitle.html("<span id='stI'>Governance Indicator Scores</span> vs <span id='stD'>Democracy Levels</span> in Sub-Saharan Africa");
var visualizationWidth = document.getElementById("visualization").offsetWidth;

var instructions = d3.select("#visualization").append("div").attr("id", "instructions");
instructions.html("Use the menus above to view one of six governance idicators across a region in Africa<br>Hover over a country's line to see their score and click on a line to see <strong>all six indicators</strong> for that reason");

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
var y2 = d3.scaleLinear().range([height+250, height+50]);


// Add axes
var x_axis = svg.append("g")
	.attr("transform", "translate(0," + (height) + ")")
	.attr("id", "xaxis");
var x_axis2 = svg.append("g")
	.attr("transform", "translate(0," + (height+250) + ")");
var x_axis3 = svg.append("g")
	.attr("transform", "translate(0," + (height) + ")");
var y_axis = svg.append("g");
var y_axis2 = svg.append("g")
var y_axis3 = svg.append("g")

var xaxiswidth = document.getElementById("xaxis").offsetWidth;

var yLabel1 = d3.select("#visualization").append("div").attr("id", "yLabel1");
yLabel1.html("Estimated Score <span class='info-icon' id='icon1'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");
yLabel1.style("left", (visualizationWidth/2)-(1048/2)-40+"px");

var infopop1 = d3.select("#visualization").append("div").attr("class", "infopop");
infopop1.html("<h2>Estimated Governance Indicator Scores</h2><h6>Worldwide Governance Indicator scores are provided by the World Bank for six dimensions of governance. The data used above are estimated scores on the aggregate indicator, in units of a standard normal distribution, ranging from approximately -3 to +3.</br></br> The WGI are composite indicators based on over 30 underlying <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc-sources'>data sources</a>. These data sources are rescaled and combined to create the six aggregate indicators using a statistical methodology known as an unobserved components model. </h6>");
infopop1.style("left", (visualizationWidth/2)-(1048/2)+40+"px");
infopop1.style("top", "216px");

d3.select("#icon1").on("mouseover", function(d) {
	infopop1.style("display", "inline-block");
});

d3.select("#icon1").on("mouseout", function(d) {
	infopop1.style("display", "none");
});
var yLabel2 = d3.select("#visualization").append("div").attr("id", "yLabel2");
yLabel2.html("Democratic Score <span class='info-icon' id='icon2'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");
yLabel2.style("left", (visualizationWidth/2)-(1048/2)-45+"px");

var infopop2 = d3.select("#visualization").append("div").attr("class", "infopop");
infopop2.html("<h2>Democratic Index Scores</h2><h6>The Democracy Index is compiled by the Economist Intelligence Unit, which measures the state of democracy in 167 countries. The index is based on 60 indicators from five categories and measures pluralism, civil liberties, and politcal cultures. Data is available for 2006, 2008, 2010, and each year since then. Countries are classified into one of four regime types: full democracy, flawed democracy, hybrid regime, or authoritarian regime. See the <a href='http://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2015'> Economist Intelligence Unit's website</a> for more details.</a></h6>");
infopop2.style("left", (visualizationWidth/2)-(1048/2)+40+"px");
infopop2.style("top", "545px");

d3.select("#icon2").on("mouseover", function(d) {
	infopop2.style("display", "inline-block");
});

d3.select("#icon2").on("mouseout", function(d) {
	infopop2.style("display", "none");
});

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
	.attr("y1", height+250)
	.attr("x2", width + 5)
	.attr("y2", height+250);

svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", height+50-5)
	.attr("x2", 0)
	.attr("y2", height+250 + 5);

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

var line3 = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y2(d.value);
	});


drawVisual(true);

function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};



// -----------------
// draw chart 

function drawVisual(refreshLine) {

	d3.selectAll("#circles").remove();
	d3.selectAll(".label").remove();
	//remove path if exist
	d3.selectAll("path").remove();
	d3.selectAll("#chart1labels").remove();
	d3.selectAll("#chart4labels").remove();
	
	//Get selected region and indicator
	var region = getSelectedIndexValue("region");
	var indicator = getSelectedIndexValue("indicator");
	//generate data with selected filters
	var data_subset = data.filter(function(d) {
		return (d.region == region) && d.indicator == indicator;
	});
	var iSelectWidth = getTextWidth(indicator, "22px arial");
	d3.select("#indicator").style("width", iSelectWidth+16+"px");
	var rSelectWidth = getTextWidth(region, "22px arial");
	d3.select("#region").style("width", rSelectWidth+16+"px");
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
		var chart1Labels = svg.append("text")
							.attr("id", "chart1labels")
							.attr("class", "labelc labelc-" + dataPath.key + " labelc-" + index)
							.attr("x", 895)
							.attr("y", y(parseFloat(dataPath.values[8].value)))
							.attr("dy", ".35em")
							.style("fill", function(d, i) {
									return color(index)
							})
							.style("font-size", 8)
							.style("font-family", "'Roboto', sans-serif")
							.style("opacity", ".3")
							.style("letter-spacing", "0")
							.style("text-transform", "uppercase")
							.text(dataPath.key);
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
				lbIn.style("display", "block")
					.html("");

				
				var vertical = d3.select(".lbIn").append("div").attr("class", "verticalLine");
				var lbTooltip = d3.select(".lbIn").append("div").attr("class", "lbTooltip").attr("id", "legend");
				lbTooltip.style("top", 86+"px");

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
					.text("Governance Indicator Scores for " + country + " 2006-2014")
					.style("opacity", ".6");
				
				chart2.append("text")
					.attr("id", "lbSubtitle")
					.attr("text-anchor", "middle")
					.attr("x", width/2)
					.attr("y", -19)
					.text("Click outside this box to close")
					.style("opacity", ".5")
					.style("font-size", "10px")
					.style("font-weight", "400")
					.style("font-style", "italic");

				// Add the X Axis
				var x_axis3 = chart2.append("g")
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

					x.domain(d3.extent(data_subset, function(d) {
						return new Date(d.year, 0, 1);
					}));
					y.domain([-3, 3]);

					var strokeHex = color(index);
					var strokeRGB = hexToRgbA(strokeHex);
					
					// Add the valueline path.
					for (var i = 0; i < data.length; i++) {
						var chart2Labels = chart2.append("text")
							.attr("x", 895)
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
								lbTooltip.attr("id", "lbTooltip");
								lbTooltip.style("display", "inline-block");
								lbTooltip.style("background-color", color(index));

								// tooltip contents
								var x0 = x.invert(d3.mouse(this)[0]),
									j = bisectDate(dataPath.values, x0, 1),
									d0 = dataPath.values[j - 1];
								// d1 = dataPath.values[j];
								
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
								var lbTooltipWidth = document.getElementById('lbTooltip').offsetWidth;
								lbTooltip.style("left", (width/2)-(.5*lbTooltipWidth)+85+"px");
							})
							.on("mouseout", function(d) {
								d3.select(this).style("stroke-width", "1.5px");
								lbTooltip.style("display", "none");
								d3.select(".legend").remove();
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
				// .transition()
				// .duration(2000)
				// .ease(d3.easeLinear)
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
		var chart2Labels = svg.append("text")
							.attr("id", "chart1labels")
							.attr("class", "labelc democratic-labelc-" + dataPath.key + " democratic-labelc-" + index)
							.attr("x", 895)
							.attr("y", y2(parseFloat(dataPath.values[6].value)))
							.attr("dy", ".35em")
							.style("fill", function(d, i) {
									return color(index)
							})
							.style("font-size", 8)
							.style("font-family", "'Roboto', sans-serif")
							.style("opacity", ".3")
							.style("text-transform", "uppercase")
							.text(dataPath.key);
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
				// .transition()
				// .duration(2000)
				// .ease(d3.easeLinear)
				.attr("stroke-dashoffset", 0);
		}
	});

	d3.csv("democracy-a1.csv", function(error, aData) {
					// aData = aData.filter(function(row) {
					// 	return row['country'] == country;
					// })

					// data.forEach(function(d) {
					// 	d.measure = d.measure;
					// });
					aData = d3.nest().key(function(d) {
						return d.area;
					}).entries(aData);
					
					// Add the valueline path.
					for (var i = 0; i < aData.length; i++) {
						var chart4Labels = svg.append("text")
							.attr("id", "chart4labels")
							.attr("class", "labela democratic-labela-" + aData.key)
							.attr("x", 895)
							.attr("y", y2(parseFloat(aData[i].values[6].value)))
							.attr("dy", ".35em")
							.style("fill", "black")
							.style("font-size", 8)
							.style("font-family", "'Roboto', sans-serif")
							.style("opacity", ".3")
							.style("text-transform", "uppercase")
							.style("visibility", "hidden")
							.text(aData[i].key);
						var path3 = svg.append("path")
							.datum(aData[i].values)
							.attr("id", "path3")
							.attr("class", "aline aline-" + i)
							.style("stroke", "black")
							.style("opacity", ".3")
							.style("visibility", "hidden")
							.attr("d", line3)
					}
				})


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
		.attr("transform", "translate(0,20)")
		.style("opacity", .6)
		.style("font-size", "10px");
	d3.selectAll(".yaxis text")
		.attr("transform", "translate(-5,0)");
	d3.selectAll(".xaxis2 text")
		.attr("display", "none");
	d3.selectAll(".yaxis2 text")
		.attr("transform", "translate(-5,0)");
	
	
	var hLabel1 = d3.select("#visualization").append("div").attr("class", "label").attr("id", "hLabel1");
		hLabel1.html(indicator+", 2006-2014 <span class='info-icon' id='icon3'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");

		// var infopop3 = d3.select("#visualization").append("div").attr("class", "infopop-top").attr("id", "infopop-top");
		// infopop3.html("<div class='close'><i class='fa fa-times' aria-hidden='true'></i></div><h2>Estimated Governance Indicator Scores</h2><h6>Worldwide Governance Indicator scores are provided by the World Bank for six dimensions of governance. The data used above are estimated scores on the aggregate indicator, in units of a standard normal distribution, ranging from approximately -3 to +3.</br></br> The WGI are composite indicators based on over 30 underlying <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc-sources'>data sources</a>. These data sources are rescaled and combined to create the six aggregate indicators using a statistical methodology known as an unobserved components model. </h6>");




	var infopop3 = d3.select("#icon3").append("div")
		.attr("class", "infopop-top")
		.style("width", "300px")
		.style("top", "19px")
		.style("right", "-164px");

		if (getSelectedIndexValue("indicator") === "Control of Corruption") {
			infopop3.html("<h2>Control of Corruption</h2> <p>This indicator captures perceptions of the extent to which public power is exercised for private gain, including both petty and gran forms of corruption, as well as 'capture' of the state by eleites and private interests.</p><div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
		}else{
			if (getSelectedIndexValue("indicator") === "Government Effectiveness") {
				infopop3.html("<h2>Government Effectiveness</h2> <p>This indicator captures perceptions of the quality of public services, the quality of the civil service, and the degree of its independence from political pressures, the quality of policy formulation and impementation, and the credibility of the government's commutment to such policies.</p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
			}else {
				if (getSelectedIndexValue("indicator") === "Political Stability") {
					infopop3.html("<h2>Political Stability and Absence of Violence/Terrorism</h2> <p>This indicator measures perceptions of the likelihood of political instability and/or politcally-motivated violence, including terrorism.</p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
				}else {
					if (getSelectedIndexValue("indicator") === "Regulatory Quality") {
						infopop3.html("<h2>Regulatory Quality</h2> <p>This indicator captures perceptions of the ability of the government to formulate and implement sound policies and regulations that permid and promote private sector development. </p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
					}else {
						if (getSelectedIndexValue("indicator") === "Rule of Law") {
							infopop3.html("<h2>Rule of law</h2> <p>This indicator captures perceptions of the extent to which agents have confidence in and abide by the rules of society, and in particular the quality of contract enforcement, property rights, the police, and the courts, as well as the likelihood of crime and violence. </p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
						}else {
							if (getSelectedIndexValue("indicator") === "Voice and Accountability") {
								infopop3.html("<h2>Voice and Accountability</h2> <p>This indicator captures perceptions of the extend to which a country's citizens are able to participate in selecting their government, as well as freedom of expression, freedom of association, and a free media. </p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
							}
						}
					}
				}
			}
		}



	d3.select("#icon3").on("mouseover", function(d) {
		infopop3.style("display", "inline-block");
	});
	d3.select("#icon3").on("mouseout", function(d) {
		infopop3.style("display", "none");
	});
	
	
	
	
	
		
	var hLabel2 = d3.select("#visualization").append("div").attr("class", "label").attr("id", "hLabel2");
		hLabel2.html("Democracy Index, 2006-2014 <span id='compoff'>Show Comparisons</span><span id='compon'>Hide Comparisons</span> <span class='info-icon' id='icon4'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");

	var infopop4 = d3.select("#icon4").append("div")
		.attr("class", "infopop-top")
		.style("width", "300px")
		.style("top", "19px")
		.style("right", "-164px")
		.html("<p>Clicking the Show Comparisons button displays the average democracy score for the entire world from 2006 to 2014 (5.62-5.55), as well as averages for each of seven regions: Asia & Australasia (5.44-5.74), Eastern Europe (5.76-5.55), Latin America (6.37-6.37), Middle East & North Africa (3.53-3.58), North America (8.64-8.56), Western Europe (8.60-8.42), and Sub-Saharan Africa (4.24-4.38)");
	d3.select("#icon4").on("mouseover", function(d) {
		infopop4.style("display", "inline-block");
	})
	d3.select("#icon4").on("mouseout", function(d) {
		infopop4.style("display", "none");
	})
	d3.select("#compoff").on("click", function (d) {
		d3.select("#compoff").style("display", "none");
		d3.select("#compon").style("display", "inline-block");
		d3.selectAll("#path3").style("visibility", "visible");
		d3.selectAll("#chart4labels").style("visibility", "visible");
	});
	d3.select("#compon").on("click", function (d) {
		d3.select("#compon").style("display", "none");
		d3.select("#compoff").style("display", "inline-block");
		d3.selectAll("#path3").style("visibility", "hidden");
		d3.selectAll("#chart4labels").style("visibility", "hidden");
	});

}

//************************************************************
// Mouse events
//************************************************************

function mousemove(country, mousePosition, isdemocratic, color) {

	hoverLine(country, mousePosition);
	//Add tooltip 1
	tooltip.style("display", "inline-block");
	tooltip.style("left", d3.event.pageX + 10 + "px");
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
		
		tooltip2.style("display", "inline-block");
		tooltip2.style("left", d3.event.pageX + 10 + "px");
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
	d3.select(".line" + "-" + country).style("z-index", "999");
	d3.select(".labelc" + "-" + country).style("opacity", "1");
	d3.select(".democratic-line" + "-" + country).style("stroke-width", "5px");
	d3.select(".democratic-line" + "-" + country).style("opacity", 1);
	d3.select(".democratic-labelc" + "-" + country).style("opacity", 1);
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
		.attr("y1", height+50)
		.attr("x2", x(x0)+1)
		.attr("y2", height+250)
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
	d3.selectAll(".labelc").style("opacity", ".3");
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