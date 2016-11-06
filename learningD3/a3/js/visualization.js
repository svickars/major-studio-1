var margin = {
		top: 20,
		right: 10,
		bottom: 100,
		left: 60
	},
	maxIndex = 0,
	visible = true

width = document.getElementById("visualization").offsetWidth - margin.left - margin.right,
	height = document.getElementById("visualization").offsetHeight - margin.top - margin.bottom;



var svg = d3.select("#visualization").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");
var lbSvg = d3.select(".lbIn").append("svg")
	.attr("width", "100%")
	.attr("height", "100%")
	.append("h");
var color = d3.scaleOrdinal(d3.schemeCategory20);
// var lbColor = d3.scaleOrdinal(d3.schemeCategory20);
var tooltip = d3.select("#visualization").append("div").attr("class", "tooltip");
var lightbox = d3.select("#visualization").append("div").attr("class", "lightbox");
var lbIn = d3.select("#visualization").append("div").attr("class", "lbIn");
var bisectDate = d3.bisector(function(d) {
	return new Date(d.year, 0, 1);
}).left;
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


//************************************************************
// Draw Axis & line function
//************************************************************
// Parse the date / time
var parseDate = d3.timeParse("%y");
var lbParseDate = d3.timeParse("%Y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var lbX = d3.scaleTime().range([0, width]);
var lbY = d3.scaleLinear().range([height, 0]);


// Add the X Axis
var x_axis = svg.append("g")
	.attr("transform", "translate(0," + height + ")");
var lbXAxis = svg.append("h")
	.attr("transform", "translate(0," + height + ")");

// Add the Y Axis
var y_axis = svg.append("g");
var lbYAxis = svg.append("h");

// Define the line
var valueline = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y(d.value);
	});
var lbLine = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(e) {
		return lbX(e.year, 0, 1);
	})
	.y(function(e) {
		return lbY(e.value);
	});

//call fucntion to genrate visual
drawVisual(true);



//************************************************************
// generate visual
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
	var dataNest = d3.nest()
		.key(function(d) {
			return d.country;
		})
		.entries(data_subset);

	// Scale the range of the data
	x.domain(d3.extent(data_subset, function(d) {
		return new Date(d.year, 0, 1);
	}));
	y.domain([-3, 3]);



	// Loop through each symbol / key
	dataNest.forEach(function(dataPath, index) {
		maxIndex = index;
		// Add the valueline path.
		var path = svg.append("path")
			.datum(dataPath.values)
			.attr("class", "line line-" + index)
			.style("stroke", function(d, i) {
				return color(index)
			})
			.attr("d", valueline)
			// interaction
			.on("click", function(d, i) {

				d3.csv("governanceIndicators-r.csv", function(error, data2) {
					data2 = data2.filter(function(row) {
						return row["country"] == country;
					})
					console.log(data2);

					// color.domain(d3.keys(data2[0]).filter(function(key) {
					// 	return key == "indicator";
					// }));

					data2 = data2.map(function(e) {
						return {
							indicator: e.indicator,
							country: e.country,
							year: lbParseDate(e.year),
							value: +e.value,
							region: e.region
						};
					});

					// then we need to nest the data on country since we want to only draw one line per country
					data2 = d3.nest().key(function(e) {
						return e.indicator;
					}).entries(data2);

					lbX.domain([d3.min(data2, function(e) {
							return d3.min(e.values, function(e) {
								return e.year;
							});
						}),
						d3.max(data2, function(e) {
							return d3.max(e.values, function(e) {
								return e.year;
							});
						})
					]);
					lbY.domain([-3, 3]);

					// lbSvg.append("h")
					// 	.attr("class", "x axis")
					// 	.attr("transform", "translate(0,500)")
					// 	.call(lbXAxis)
					// lbSvg.append("h")
					// 	.attr("class", "y axis")
					// 	.call(lbYAxis);

					var indicators = svg.selectAll(".indicator")
						.data(data2, function(e) {
							return e.key;
						})
						.enter().append("h")
						.attr("class", "indicator");

					indicators.append("path")
						.attr("class", "lines")
						.attr("d", function(e) {
							return lbLine(e.values);
						})
						.attr('id', function(e) {
							return e.country;
						})
						.style("stroke", function(d, i) {
							return color(index);
						});
					// .on("mouseover", function(d) {
					// 	d3.select(this).style('stroke-width', '5px');
					// 	div.transition()
					// 		.duration(200)
					// 		.style("opacity", .9);
					// 	div.html([d.key])
					// 		.style("left", (d3.event.pageX) + "px")
					// 		.style("top", (d3.event.pageY - 28) + "px");
					// 	console.log([d]);
					// })
					// .on("mousemove", function(d) {
					// 	div.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
					// })
					// .on("mouseout", function(d) {
					// 	d3.select(this).style('stroke-width', '1.5px');
					// 	div.transition()
					// 		.duration(500)
					// 		.style("opacity", 0);
					// });

				})




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
				lightbox.style("display", "block")
					.on("click", function() {
						lightbox.style("display", "none");
						lbIn.style("display", "none");
						d3.selectAll(".line").style("opacity", "1.0");
					});
				lbIn.style("display", "block");
			})
			.on("mouseover", function(d) {
				path.style("stroke-width", "5px");
			})
			.on("mousemove", function(d) {
				//Display tooltip
				tooltip.style("display", "inline-block");
				tooltip.style("left", d3.event.pageX + margin.right + "px");
				tooltip.style("top", d3.event.pageY + "px");
				tooltip.style("background-color", function(d, i) {
					return color(index)
				});
				tooltip.style("opacity", .75);

				// tooltip contents
				var x0 = x.invert(d3.mouse(this)[0]),
					i = bisectDate(dataPath.values, x0, 1),
					d0 = dataPath.values[i - 1],
					d1 = dataPath.values[i];
				tooltip.html("<div class='tooltip-title'>  " + indicator + " (estimated) for <strong>" + d0.country + "</strong> in <strong>" + d0.year + "</strong>: " +
					Number(d0.value).toFixed(2) + "</div>");
			})
			.on("mouseout", function(d) {
				path.style("stroke-width", "1.5px");
				tooltip.style("display", "none");
				d3.selectAll(".line").style("stroke-opacity", 1);
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
				.duration(1000)
				.ease(d3.easeLinear)
				.attr("stroke-dashoffset", 0);
		}
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




// function draw2() {

// 	d3.csv("governanceIndicators-r.csv", function(error, data) {
// 		data = data.filter(function(row) {
// 			return row["country"] == country;
// 		})
// 		console.log(data);

// 		color.domain(d3.keys(data[0]).filter(function(key) {
// 			return key == 'country';
// 		}));

// 		data = data.map(function(d) {
// 			return {
// 				indicator: d.indicator,
// 				country: d.country,
// 				year: parseDate(d.year),
// 				value: +d.value,
// 				region: d.region
// 			};
// 		});

// 		// then we need to nest the data on country since we want to only draw one line per country
// 		data = d3.nest().key(function(d) {
// 			return d.indicator;
// 		}).entries(data);

// 		lbX.domain([d3.min(data, function(d) {
// 				return d3.min(d.values, function(d) {
// 					return d.year;
// 				});
// 			}),
// 			d3.max(data, function(d) {
// 				return d3.max(d.values, function(d) {
// 					return d.year;
// 				});
// 			})
// 		]);
// 		lbY.domain([-3, 3]);

// 		// lbSvg.append("h")
// 		// 	.attr("class", "x axis")
// 		// 	.attr("transform", "translate(0,500)")
// 		// 	.call(lbXAxis)
// 		// lbSvg.append("h")
// 		// 	.attr("class", "y axis")
// 		// 	.call(lbYAxis);

// 		var indicators = svg.selectAll(".indicator")
// 			.data(data, function(d) {
// 				return d.key;
// 			})
// 			.enter().append("h")
// 			.attr("class", "indicator");

// 		indicators.append("path")
// 			.attr("class", "lines")
// 			.attr("d", function(d) {
// 				return lbLine(d.values);
// 			})
// 			.attr('id', function(d) {
// 				return d.country;
// 			})
// 			.style("stroke", function(d) {
// 				return color(d.key);
// 			});
// 		// .on("mouseover", function(d) {
// 		// 	d3.select(this).style('stroke-width', '5px');
// 		// 	div.transition()
// 		// 		.duration(200)
// 		// 		.style("opacity", .9);
// 		// 	div.html([d.key])
// 		// 		.style("left", (d3.event.pageX) + "px")
// 		// 		.style("top", (d3.event.pageY - 28) + "px");
// 		// 	console.log([d]);
// 		// })
// 		// .on("mousemove", function(d) {
// 		// 	div.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
// 		// })
// 		// .on("mouseout", function(d) {
// 		// 	d3.select(this).style('stroke-width', '1.5px');
// 		// 	div.transition()
// 		// 		.duration(500)
// 		// 		.style("opacity", 0);
// 		// });

// 	})
// }