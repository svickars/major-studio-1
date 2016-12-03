
// var lbColor = d3.scaleOrdinal(d3.schemeCategory20);
var tooltip = d3.select("#visualization").append("div").attr("class", "tooltip");
var tooltip2 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-2");
var tooltip3 = d3.select("#visualization").append("div").attr("class", "tooltip tooltip-3");
var aTooltip = d3.select("#visualization").append("div").attr("class", "tooltip aTooltip");
var lightbox = d3.select("#visualization").append("div").attr("class", "lightbox");
var lbIn = d3.select("#visualization").append("div").attr("class", "lbIn").attr("id", "lbIn");


var visualizationWidth = document.getElementById("visualization").offsetWidth;




// -------------------


// Set the ranges

// var y2 = d3.scaleLinear().range([height+250, height+50]);
var y2 = d3.scaleLinear().range([200, 0]);

// Add axes
// var x_axis = svg.append("g")
// 	.attr("transform", "translate(0," + (height) + ")")
// 	.attr("id", "xaxis");

// var x_axis2 = svg.append("g")
// 	.attr("transform", "translate(0," + (height+250) + ")");
var x_axis2 = svg.append("g")
	.attr("transform", "translate(0," + (height + 250) + ")");
// var x_axis3 = svg.append("g")
// 	.attr("transform", "translate(0," + (height) + ")");
var x_axis3 = svg.append("g")
	.attr("transform", "translate(0," + (200) + ")");
var y_axis2 = svg.append("g")
var y_axis3 = svg.append("g")

var xaxiswidth = document.getElementById("xaxis").offsetWidth;

var ylabe1 = d3.select("#visualization").append("div").attr("id", "ylabe1").attr("class", "widey");
ylabe1.html("Estimated Score <span class='info-icon' id='icon11'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");
ylabe1.style("left", (visualizationWidth / 2) - (1048 / 2) - 40 + "px");

var infopop11 = d3.select("#icon11").append("div").attr("class", "infopop").attr("id", "infopopY");
infopop11.html("<h2>Estimated Governance Indicator Scores</h2><p style='font-weight: 400; text-align: left; font-size: 9px; line-spacing: 11px; text-transform: none; letter-spacing: 0'>Worldwide Governance Indicator scores are provided by the World Bank for six dimensions of governance. The data used are estimated scores on the aggregate indicator, in units of a standard normal distribution, ranging from approximately -3 to +3.</br></br> The WGI are composite indicators based on over 30 underlying data sources. These data sources are rescaled and combined to create the six aggregate indicators using a statistical methodology known as an unobserved components model. </p>");
infopop11.style("left", "-94px");
infopop11.style("top", "121px");

d3.select("#icon11").on("mouseover", function(d) {
	infopop11.style("display", "inline-block");
});

d3.select("#icon11").on("mouseout", function(d) {
	infopop11.style("display", "none");
});
var ylabe2 = d3.select("#visualization").append("div").attr("id", "ylabe2").attr("class", "widey");
ylabe2.html("Democratic Score <span class='info-icon' id='icon12'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");
ylabe2.style("left", (visualizationWidth / 2) - (1048 / 2) - 45 + "px");

var infopop12 = d3.select("#icon12").append("div").attr("class", "infopop").attr("id", "infopopY");
infopop12.html("<h2>Democratic Index Scores</h2><p style='font-weight: 400; text-align: left; font-size: 9px; line-spacing: 11px; text-transform: none; letter-spacing: 0'>The Democracy Index is compiled by the Economist Intelligence Unit, which measures the state of democracy in 167 countries. The index is based on 60 indicators from five categories and measures pluralism, civil liberties, and politcal cultures. Data is available for 2006, 2008, 2010, and each year since then. Countries are classified into one of four regime types: full democracy, flawed democracy, hybrid regime, or authoritarian regime. See the Economist Intelligence Unit's website for more details.</p>");
infopop12.style("left", "-72px");
infopop12.style("top", "133px");

d3.select("#icon12").on("mouseover", function(d) {
	infopop12.style("display", "inline-block");
});

d3.select("#icon12").on("mouseout", function(d) {
	infopop12.style("display", "none");
});

svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", 200)
	.attr("x2", width + 5)
	.attr("y2", 200);

svgAxes.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", 250 - 5)
	.attr("x2", 0)
	.attr("y2", 250 + height + 5);

svg.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", (height / 2) + 250)
	.attr("x2", width + 5)
	.attr("y2", (height / 2) + 250);

svgAxes.append("line")
	.attr("class", "baseLine")
	.attr("x1", 0)
	.attr("y1", -5)
	.attr("x2", 0)
	.attr("y2", 200 + 5);

for (var i = 0; i < 11; i++) {
	svgAxes.append("text")
		.attr("class", "newaxis")
		.attr("text-anchor", "right")
		.attr("x", -15)
		.attr("y", ((200 / 10) * (-i)) + 3.25 + 200)
		.text(i)
}

for (var i = -3; i < 4; i++) {
	svgAxes.append("text")
		.attr("class", "newaxis")
		.attr("text-anchor", "right")
		.attr("x", -15)
		.attr("y", ((height / 6) * (-i)) + 3.25 + height/2 + 250)
		.text(i)
}

// draw line
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
		return y(parseFloat(d.value));
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



// -----------------
// draw chart 

function drawVisual(refreshLine) {

	
	
	//remove path if exist
	d3.selectAll("#chart1labes").remove();
	d3.selectAll("#chart4labes").remove();


	var countryColor = {};

	// Loop through each symbol / key
	dataNest.forEach(function(dataPath, index) {
		dataPath.key = formatCountry(dataPath.key);

		countryColor[dataPath.key] = color(index);
		maxIndex = index;
		
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
					.style("fill", color(i));
				if (dataNest[i].values[h].value == 0) {
					circles.style("visibility", "hidden");
				}
			}
		}
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
				lbTooltip.style("top", 86 + "px");

				var chart2 = d3.select(".lbIn")
					.append("svg")
					.attr("width", 1200)
					.attr("height", 1000)
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
					.attr("class", "lbtitle")
					.attr("text-anchor", "middle")
					.attr("x", 671)
					.attr("y", 469)
					.text("Democracy Index, 2006-2014")
					.style("opacity", ".6");

				chart2.append("text")
					.attr("id", "lbSubtitle")
					.attr("text-anchor", "middle")
					.attr("x", width / 2)
					.attr("y", -19)
					.text("Click outside this box to close")
					.style("opacity", ".5")
					.style("font-size", "10px")
					.style("font-weight", "400")
					.style("font-style", "italic");

				var x4 = d3.scaleTime().range([460, 888]);
				var y4 = d3.scaleLinear().range([650, 455]);

				// Add the X Axis
				var x_axis3 = chart2.append("g")
					.attr("transform", "translate(0," + height + ")")
					.style("stroke-linecap", "round")
					.style("stroke-dasharray", ".1,20");

				var x_axis4 = chart2.append("g")
					.attr("transform", "translate(0, 650)");

				// Add the Y Axis
				var y_axis3 = chart2.append("g")
					.style("stroke-linecap", "round")
					.style("stroke-dasharray", ".1,20");

				var y_axis4 = chart2.append("g")
					.attr("transform", "translate(460, 0)")
					.style("stroke-linecap", "round")
					.style("stroke-dasharray", ".1,20");

				var lbLine = d3.line()
					.curve(d3.curveMonotoneX)
					.x(function(d) {
						return x4(new Date(d.year, 0, 1));
					})
					.y(function(d) {
						return y4(d.value);
					});
				var lbLineSSA = d3.line()
					.curve(d3.curveMonotoneX)
					.x(function(d) {
						return x4(new Date(d.year, 0, 1));
					})
					.y(function(d) {
						return y4(d.ssa);
					});
				var lbLineW = d3.line()
					.curve(d3.curveMonotoneX)
					.x(function(d) {
						return x4(new Date(d.year, 0, 1));
					})
					.y(function(d) {
						return y4(d.world);
					});

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

					x4.domain(d3.extent(data_subset, function(d) {
						return new Date(d.year, 0, 1);
					}));
					y4.domain([0, 10]);

					var strokeHex = color(index);
					var strokeRGB = hexToRgbA(strokeHex);

					// var sData = data.filter(function(row) {
					// 	return row['country'] == country;
					// }).entries(sData);

					// sData.forEach(function(d) {
					// 	d.measure = d.measure;
					// });

					// sData = d3.nest().key(function(d) {
					// 	return d.measure;
					// }).entries(sData);

					var sCountry = data[6].values[6].country;
					var sYear = data[6].values[6].year;
					var sOverview = data[6].values[6].overview;
					var sdStatus = data[6].values[6].democraticStatus;
					var sfStatus = data[6].values[6].freedomStatus;
					var sCL = data[6].values[6].cL;
					var sPL = data[6].values[6].pL;
					var sF = data[6].values[6].freedomRating;
					var sURL = data[6].values[6].url;

					var storytime = lbIn.append("div").attr("class", "storytime");
					storytime.html("<div class='s1'><div class='sCountry'><span id='sCountry'>" + sCountry + "</span><div id='sYear'>" + sYear + "<span class='info-icon' id='icon5'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span></div></div><div class='sStats'>Democratic? <strong>" + sdStatus + "</strong>&nbsp&nbsp Free? <strong>" + sfStatus + " </strong>&nbsp&nbspFreedom Rating: <strong>" + sF + " </strong>&nbsp&nbspCivil Liberties: <strong>" + sCL + "</strong>&nbsp&nbsp Politcal Rights: <strong>" + sPL + "</strong>&nbsp&nbsp</div><div class='sOverview'>" + sOverview + "</div><div class='sRead'><a href=" + sURL + ">Read More at Freedom House</a></div></div><div class='s2'><div class='sCharts'></div></div>");
					d3.select(".sCountry").style("color", color(index));
					d3.select(".sStats").style("color", color(index));
					d3.select(".sRead").style("color", color(index));
					d3.select(".sRead").style("border-color", color(index));
					d3.select("#sCountry").style("border-color", color(index));

					var infopop5 = d3.select("#icon5").append("div")
						.attr("class", "infopop-top")
						.attr("id", "infopop5")
						.style("width", "300px")
						.style("top", "35px");
					infopop5.html("<h6><p>This data is based on Freedom House's Freedom in World Report, a yearly report that measures the degrees of civil liberties and politcal rights in every nation in the world. The data shown here are based on the 2015 report which gives scores for 2014.</p><p>The democratic question is based on the Economist's Democratic Index, as is the chart to the right, which maps " + sCountry + "'s democratic score across 2006-2014. The world average as well as the Sub-Saharan Africa average are shown in black.</p><p><strong>Civil Liberties and Political Rights:</strong> Each country is assigned a score on a series of 25 indicators, for an aggregate score of up to 100. These scores are used to determine two numerical ratings with a rating of 1 representing the most free conditions and 7 the least free.</p></h6><div class='footnote'>More details at <a href='https://freedomhouse.org/sites/default/files/FH_FITW_Report_2016.pdf'>freedomhouse.org</a></div>");

					d3.select("#icon5").on("mouseover", function(d) {
						infopop5.style("display", "inline-block");
					});
					d3.select("#icon5").on("mouseout", function(d) {
						infopop5.style("display", "none");
					});
					d3.select(".sOverview").on("mouseover", function(d) {
						d3.select(".sOverview").style("height", "auto");
						d3.select(".sOverview").style("min-height", "124px");
					});
					d3.select(".sOverview").on("mouseout", function(d) {
						d3.select(".sOverview").style("height", "124px");
					});

					var lblabes = chart2.append("text")
						.attr("x", "895")
						.attr("y", y4(parseFloat(data[6].values[6].value)) + 2)
						.text("Democracy Score: " + data[6].values[6].value)
						.attr("class", "rightlabes")
						.style("fill", color(index))
						.style("font-size", 8)
						.style("text-transform", "uppercase");
					if (data[6].values[6].value == "0") {
						lblabes.text("unavailable");
					}
					var lblabesWA = chart2.append("text")
						.attr("x", "895")
						.attr("y", y4(parseFloat(data[6].values[6].world)) + 2)
						.text("World Average: " + data[6].values[6].world)
						.attr("class", "rightlabes")
						.style("fill", "black")
						.style("font-size", 8)
						.style("text-transform", "uppercase");
					var lblabesSSA = chart2.append("text")
						.attr("x", "895")
						.attr("y", y4(parseFloat(data[6].values[6].ssa)) + 2)
						.text("SSA Average: " + data[6].values[6].ssa)
						.attr("class", "rightlabes")
						.style("fill", "grey")
						.style("font-size", 8)
						.style("text-transform", "uppercase");
					var lbPath = chart2.append("path")
						.datum(data[6].values)
						.attr("class", "lbLine")
						.style("stroke", color(index))
						.style("fill", "none")
						.attr("d", lbLine);
					var lbPathssa = chart2.append("path")
						.datum(data[6].values)
						.attr("class", "lbLine")
						.style("stroke", "grey")
						.style("fill", "none")
						.attr("d", lbLineSSA);
					var lbPathW = chart2.append("path")
						.datum(data[6].values)
						.attr("class", "lbLine")
						.style("stroke", "black")
						.style("fill", "none")
						.attr("d", lbLineW);

					if (data[6].values[0] == 0) {
						lbPath.style("display", "none");
					}

					x_axis4.attr("class", "x_axis axis").call(d3.axisBottom(x4)
						.tickSizeInner(-195));
					y_axis4.attr("class", "y_axis axis").call(d3.axisLeft(y4)
						.tickSizeInner(-428));

					// Add the valueline path.
					for (var i = 0; i < 6; i++) {
						for (var h = 0; h < data[i].values.length; h++) {
							var chart2Circles = chart2.append("circle")
								.attr("cx", function(d) {
									return x(new Date(data[i].values[h].year, 0, 1));
								})
								.attr("cy", function(d) {
									return y(parseFloat((data[i].values[h].value)));
								})
								.attr("r", 3)
								.style("z-index", "999")
								.style("fill", strokeRGB + "," + (1 - i / 10) + ")")
								// .style("stroke", strokeRGB + "," + (1 - i / 10) + ")")
								// .style("stroke-width", "1.5px")
								.attr("transform", "translate(0,-250)");
							if (data[i].values[h].value == 0) {
								chart2Circles.style("visibility", "hidden");
							}
						}
						var chart2labes = chart2.append("text")
							.attr("x", 895)
							.attr("y", y(parseFloat(data[i].values[8].value)))
							.attr("dy", ".35em")
							.attr("class", "rightlabes")
							.attr("transform", "translate(0,-250)")
							.style("fill", strokeRGB + "," + (1 - i / 10) + ")")
							.style("font-size", 8)
							.style("text-transform", "uppercase")
							.text(data[i].key);
						var path2 = chart2.append("path")
							.datum(data[i].values)
							.attr("class", "line line-" + i)
							.style("stroke", strokeRGB + "," + (1 - i / 10) + ")")
							.attr("d", line)
							.attr("transform", "translate(0,-250)")
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
								lbTooltip.style("left", (width / 2) - (.5 * lbTooltipWidth) + 85 + "px");
							})
							.on("mouseout", function(d) {
								d3.select(this).style("stroke-width", "1.5px");
								lbTooltip.style("display", "none");
								d3.select(".legend").remove();
							});
						x_axis3.attr("class", "x_axis axis").call(d3.axisBottom(x)
							.tickSizeInner(-height));
						y_axis3.attr("class", "y_axis axis").call(d3.axisLeft(y)
								.tickSizeInner(-width))
							.attr("transform", "translate(0,-250)");
						d3.selectAll(".x_axis text")
							.attr("transform", "translate(0,10)");
						d3.selectAll(".y_axis text")
							.attr("transform", "translate(-5,0)");

						chart2.append("text")
							.attr("class", "y-labe")
							.attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
							.attr("transform", "translate(" + -40 + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
							.text("Estimated Score")
							.style("opacity", .6);
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
	y2.domain([0, 10]);

	// Loop through each symbol / key
	data2Nest.forEach(function(dataPath, index) {
		dataPath.key = formatCountry(dataPath.key);
		maxIndex2 = index;
		var chart2labes = svg.append("text")
			.attr("id", "chart1labes")
			.attr("class", "labec democratic-labec-" + dataPath.key + " democratic-labec-" + index)
			.attr("x", 895)
			.attr("y", y2(parseFloat(dataPath.values[6].value)))
			.attr("dy", ".35em")
			.style("fill", function(d, i) {
				return countryColor[dataPath.key]
			})
			.style("font-size", 8)
			.style("font-family", "Arial, sans-serif")
			.style("opacity", ".3")
			.style("text-transform", "uppercase")
			.text(dataPath.key);
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
					.style("fill", countryColor[data2Nest[i].key])
					.style("visibility", "hidden");
				if (data2Nest[i].values[h].value == 0) {
					circles.style("visibility", "hidden");
				}
			}
		}
		// Add the valueline path.
		var path2 = svg.append("path")
			.datum(dataPath.values)
			.attr("class", "line democratic-line-" + dataPath.key + " democratic-line-" + index)
			.style("stroke", function(d, i) {
				return countryColor[dataPath.key]
			})
			// .style("opacity", .65)
			.attr("d", valueline2)
			// .on("click", function(d, i) {
			// 	visible2 = !visible2;
			// 	for (var n = 0; n <= maxIndex2; n++) {
			// 		if (n != index) {
			// 			if (visible2) {
			// 				d3.selectAll(".democratic-line-" + n).style("display", "");
			// 			}
			// 			else {
			// 				d3.selectAll(".democratic-line-" + n).style("display", "none");
			// 			}
			// 		}
			// 	}
			// })
			.on("mouseover", function(d) {
				path2.style("stroke-width", "5px");
				path2.style("opacity", 1);
			})
			.on("mousemove", function(d) {
				mousemove(dataPath.key, d3.mouse(this)[0], true, function(d, i) {return countryColor[dataPath.key]});

			})
			.on("mouseout", function(d) {
				path2.style("stroke-width", "1.5px");
				path2.style("opacity", .65);
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
		for (var i = 6; i < 8; i++) {
			var chart4labes = svg.append("text")
				.attr("id", "chart4labes")
				.attr("class", "labea democratic-labea-" + aData.key)
				.attr("x", 895)
				.attr("y", y2(parseFloat(aData[i].values[6].value)))
				.attr("dy", ".35em")
				.style("fill", "black")
				.style("font-size", 8)
				.style("font-family", "Arial, sans-serif")
				.style("opacity", ".3")
				.style("text-transform", "uppercase")
				.style("visibility", "hidden")
				.text(aData[i].key);
			var path3 = svg.append("path")
				.datum(aData[i].values)
				.attr("id", "path3")
				.attr("class", "aline aline-" + i)
				.style("stroke", "black")
				.style("opacity", ".6")
				.style("visibility", "hidden")
				.attr("d", line3);
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
		.attr("transform", "translate(0,-410)")
		.style("opacity", .6)
		.style("font-size", "10px");
	d3.selectAll(".yaxis text")
		.attr("transform", "translate(-5,0)")
		.attr("display", "none");
	d3.selectAll(".xaxis2 text")
		.attr("display", "none");
	d3.selectAll(".yaxis2 text")
		.attr("transform", "translate(-5,0)")
		.attr("display", "none");;

	var popti;
	var popcon;
	
	if (getSelectedIndexValue("indicator") === "Control of Corruption") {
		popti = "Control of Corruption";
		popcon = "This indicator captures perceptions of the extent to which public power is exercised for private gain, including both petty and gran forms of corruption, as well as 'capture' of the state by eleites and private interests.<span class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></span>";
	}
	else {
		// if (getSelectedIndexValue("indicator") === "Government Effectiveness") {
			popti = "Other";
			popcon = "Other";
		}
	// 	else {
	// 		if (getSelectedIndexValue("indicator") === "Political Stability") {
	// 			infopop3.html("<h2>Political Stability and Absence of Violence/Terrorism</h2> <p>This indicator measures perceptions of the likelihood of political instability and/or politcally-motivated violence, including terrorism.</p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
	// 		}
	// 		else {
	// 			if (getSelectedIndexValue("indicator") === "Regulatory Quality") {
	// 				infopop3.html("<h2>Regulatory Quality</h2> <p>This indicator captures perceptions of the ability of the government to formulate and implement sound policies and regulations that permid and promote private sector development. </p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
	// 			}
	// 			else {
	// 				if (getSelectedIndexValue("indicator") === "Rule of Law") {
	// 					infopop3.html("<h2>Rule of law</h2> <p>This indicator captures perceptions of the extent to which agents have confidence in and abide by the rules of society, and in particular the quality of contract enforcement, property rights, the police, and the courts, as well as the likelihood of crime and violence. </p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
	// 				}
	// 				else {
	// 					if (getSelectedIndexValue("indicator") === "Voice and Accountability") {
	// 						infopop3.html("<h2>Voice and Accountability</h2> <p>This indicator captures perceptions of the extend to which a country's citizens are able to participate in selecting their government, as well as freedom of expression, freedom of association, and a free media. </p> <div class='footnote'>Definition courtesy of World Bank: Governance Indicators Project. More details at <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc'>govindicators.org</a></div>");
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	
	
	

	var hlabe1 = d3.select("#visualization").append("div").attr("class", "labe").attr("id", "hlabe1");
	// hlabe1.html(indicator + ", 2006-2014 <span class='info-icon' id='icon3'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");
	hlabe1.html(indicator + ", 2006-2014 <span class='info-icon'><a href='#' data-toggle='popover' data-trigger='hover' data-html='true' title='"+popti+"' data-placement='bottom' data-content='"+popti+"'><span class='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></span>");

	// var infopop3 = d3.select("#visualization").append("div").attr("class", "infopop-top").attr("id", "infopop-top");
	// infopop3.html("<div class='close'><i class='fa fa-times' aria-hidden='true'></i></div><h2>Estimated Governance Indicator Scores</h2><h6>Worldwide Governance Indicator scores are provided by the World Bank for six dimensions of governance. The data used above are estimated scores on the aggregate indicator, in units of a standard normal distribution, ranging from approximately -3 to +3.</br></br> The WGI are composite indicators based on over 30 underlying <a href='http://info.worldbank.org/governance/wgi/index.aspx#doc-sources'>data sources</a>. These data sources are rescaled and combined to create the six aggregate indicators using a statistical methodology known as an unobserved components model. </h6>");




	var infopop3 = d3.select("#icon3").append("div")
		.attr("class", "infopop-top")
		.style("width", "300px")
		.style("top", "19px")
		.style("right", "-164px");



	d3.select("#icon3").on("mouseover", function(d) {
		infopop3.style("display", "inline-block");
	});
	d3.select("#icon3").on("mouseout", function(d) {
		infopop3.style("display", "none");
	});






	var hlabe2 = d3.select("#visualization").append("div").attr("class", "labe").attr("id", "hlabe2");
	hlabe2.html("Democracy Index, 2006-2014 <span id='compoff'>Show Comparisons</span><span id='compon'>Hide Comparisons</span> <span class='info-icon' id='icon4'><a><i class='fa fa-info-circle' aria-hidden='true'></i></a></span>");

	var infopop4 = d3.select("#icon4").append("div")
		.attr("class", "infopop-top")
		.style("width", "300px")
		.style("top", "19px")
		.style("right", "-164px")
		.html("<p style='margin-top: 0px;'>Clicking the Show Comparisons button displays the average democracy score for the entire world from 2006 to 2014 (5.62-5.55), as well as averages for Sub-Saharan Africa (4.24-4.38)");
	d3.select("#icon4").on("mouseover", function(d) {
		infopop4.style("display", "inline-block");
	})
	d3.select("#icon4").on("mouseout", function(d) {
		infopop4.style("display", "none");
	})
	d3.select("#compoff").on("click", function(d) {
		d3.select("#compoff").style("display", "none");
		d3.select("#compon").style("display", "inline-block");
		d3.selectAll("#path3").style("visibility", "visible");
		d3.selectAll("#chart4labes").style("visibility", "visible");
	});
	d3.select("#compon").on("click", function(d) {
		d3.select("#compon").style("display", "none");
		d3.select("#compoff").style("display", "inline-block");
		d3.selectAll("#path3").style("visibility", "hidden");
		d3.selectAll("#chart4labes").style("visibility", "hidden");
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
		tooltip.style("top", (height / 2) + 450 + "px");
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
			tooltip2.style("top", 250 + "px");
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
	d3.select(".labec" + "-" + country).style("opacity", "1");
	d3.select(".democratic-line" + "-" + country).style("stroke-width", "5px");
	d3.select(".democratic-line" + "-" + country).style("opacity", 1);
	d3.select(".democratic-labec" + "-" + country).style("opacity", 1);
	d3.selectAll(".circles2")
		.style("visibility", "hidden");

	var x0 = x.invert(mousePosition)

	d3.selectAll(".vertical-line").remove()
	svg.append("line")
		.attr("x1", x(x0) + 1)
		.attr("y1", 0)
		.attr("x2", x(x0) + 1)
		.attr("y2", 200)
		.attr("class", "vertical-line")
		.style("stroke-width", 1)
		.style("stroke", "grey")
		.style("fill", "none");
	d3.selectAll(".vertical-line2").remove()
	svg.append("line")
		.attr("x1", x(x0) + 1)
		.attr("y1", height + 250)
		.attr("x2", x(x0) + 1)
		.attr("y2", 250)
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
	d3.selectAll(".labec").style("opacity", ".3");
	d3.selectAll(".democratic-line").style("stroke-width", "1.5px");
	d3.selectAll(".democratic-line").style("opacity", .65);
	d3.selectAll(".vertical-line").remove();
	d3.selectAll(".vertical-line2").remove();
	d3.selectAll(".circles2")
		.style("visibility", "hidden");
}






var leftOffset = parseInt($("#ylabe1").css('left')); //Grab the left position left first
$(window).scroll(function(){
    $('#ylabe1').css({
        'left': $(this).scrollLeft() + leftOffset //Use it later
    });
});


$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
});