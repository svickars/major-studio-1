//***********
// THE FILTER
//***********
var regions = new Set(),
    indicators = new Set();
data.forEach(function(record) {
    regions.add(record.region);
    indicators.add(record.indicator);
})

updateSelectOptions("region", Array.from(regions));
updateSelectOptions("indicator", Array.from(indicators));

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

function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};





//***********
// THE SET UP
//***********
// Global Sizes
var margin = {
    top: 20,
    right: 100,
    bottom: 100,
    left: 60
};

var width = "100%";
var height = 700;
var vWidth = document.getElementById("visualization").offsetWidth;

// Initiate the overlay SVG
var svgAxes = d3.select("#visualization")
                .append("svg")
                .attr("id", "svgAxes")
                .attr("width", vWidth)
                .attr("height", height + margin.bottom + margin.top)
                .style("transform", "translate(0px, 5px)")
                .append("g");
                
// Initiate the main SVG
var svg = d3.select("#visualization")
            .append("svg")
            .attr("id", "svg")
            .attr("width", vWidth)
            .attr("height", height + margin.top + margin.bottom)
            .style("transform", "translate(0px," + (-height-120) +"px)")
            .append("g");



// Global Variables
var color = d3.scaleOrdinal()
	.range(['#e5243b', '#dda63a', '#26bde2', '#c5192d', '#ff3a21', '#4c9f38', '#fcc30b', '#a21942', '#fd6925', '#dd1367', '#fd9d24', '#bf8b2e', '#3f7e44', '#0a97d9', '#56c02b', '#00689d', '#19486a', '#9c4b94', '#3fc1c5']);
var bisectDate = d3.bisector(function(d) {
	return new Date(d.year, 0, 1);
}).left;
var maxIndex = 0;
var visible = true;
var clicked = false;
var dataNest;
var data2Nest;
var data3Nest;
var country;

// Parse the Date
var parseDate = d3.timeParse("%y");

// Set the Ranges/Scales/All That Fun Stuff
var x = d3.scaleTime().range([margin.left, vWidth - margin.right]);
var y = d3.scaleLinear().range([height, 250]);
var y2 = d3.scaleLinear().range([200, 0]);

// Set up the Axes
var x_axis = svg.append("g")
	            .attr("transform", "translate(0," + (height) + ")")
	            .attr("id", "xAxis");
var y_axis = svgAxes.append("g")
                .style("transform", "translate(" + margin.left +"px ,0)")
                .style("width", vWidth - margin.left - margin.right)
                .attr("id", "yAxis");
var x_axis2 = svg.append("g")
	            .attr("transform", "translate(0," + 200 + ")")
	            .attr("id", "xAxis2");
var y_axis2 = svgAxes.append("g")
                .style("transform", "translate(" + margin.left +"px ,0)")
                .attr("id", "yAxis2");

// Draw Data Lines
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

// Create Tooltips
var tooltipI = d3.select("#visualization").append("div").attr("class", "tooltip tooltipMain");
var tooltipY = d3.select("#visualization").append("div").attr("class", "tooltip tooltipY");
var tooltipD = d3.select("#visualization").append("div").attr("class", "tooltip tooltipMain");
var tooltipC = d3.select("#visualization").append("div").attr("class", "tooltip tooltipClick");



//**********
// THE VIZZY
//**********
drawVisual(true);

function drawVisual(refreshLine) {

    // Remove all previous
    d3.selectAll("path").remove();
    d3.selectAll("#circle").remove();
    d3.selectAll("#labelC").remove();

    //Get selected region and indicator
    var region = getSelectedIndexValue("region");
    var indicator = getSelectedIndexValue("indicator");

    // Get width of selected redion and indicator to change headline width	
    var iSelectWidth = getTextWidth(indicator, "22px arial");
    d3.select("#indicator").style("width", iSelectWidth + 20 + "px");
    var rSelectWidth = getTextWidth(region, "22px arial");
    d3.select("#region").style("width", rSelectWidth + 20 + "px");

    // Generate data set based on selected indicators
    var data_subset = data.filter(function(d) {
        return (d.region == region) && d.indicator == indicator;
    });

    // Nest the data by country
    dataNest = d3.nest()
        .key(function(d) {
            return d.country;
        })
        .entries(data_subset);
        
    // Scale the data ranges
    x.domain(d3.extent(data_subset, function(d) {
        return new Date(d.year, 0, 1);
    }));
    y.domain([-3, 3]);
	
    // Create object to store colour
    var countryColor = {};
    
    // Now we play the drawing game!
    // Loop through each symbol/key
    dataNest.forEach(function(dataPath, index) {
       var unCountry = dataPath.key;
       dataPath.key = formatCountry(dataPath.key);
	    
	   // assign each country a colour
	   countryColor[dataPath.key] = color(index);
	   maxIndex = index;
	   
	   // draw country labels at end of path
	   var countryLabelsI = svg.append("text")
	                         .attr("id", "labelC")
	                         .attr("class", "labelC labelC-" + dataPath.key + " labelC-" + index)
	                         .attr("x", vWidth - margin.right + 7)
	                         .attr("y", y(dataPath.values[8].value))
	                         .attr("dy", ".35em")
                             .style("fill", function(d, i) {
                                 return color(index)
                             })
                             .text(dataPath.key)
                             .on("mousemove", function(d) {
                                 mousemove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                             })
                             .on("mouseout", function(d) {
                                 mousedown();
                             })
                             .on("click", function(d) {
                                 click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                             });
        // draw circles at data points, none if no data
        for (var i = 0; i < dataNest.length; i++) {
            for (var h = 0; h < dataNest[i].values.length; h++) {
                var circle = svg.append("circle")
                                 .attr("id", "circle")
                                 .attr("class", "circle circle-" + dataPath.key + " circle-" + index)
                                 .attr("cx", function(d) {
                                     return x(new Date(dataNest[i].values[h].year, 0, 1));
                                 })
                                 .attr("cy", function(d) {
                                     return y(dataNest[i].values[h].value);
                                 })
                                 .attr("r", 3)
                                 .style("fill", color(i))
                                 .on("mousemove", function(d) {
                                     mousemove(dataPath.key, d3.mouse(this)[0], false, color(index));
                                 })
                                 .on("mouseout", function(d) {
                                     mousedown();
                                 });
                 if (dataNest[i].values[h].value == 0) {
                     circle.style("visibility", "hidden");
                 }
            }
        }
        
        // draw the valueline paths
        var path = svg.append("path")
                      .datum(dataPath.values)
                      .attr("class", "line line-" + dataPath.key + " line-" + index)
                      .style("stroke", function (d, i) {
                          return color(index)
                      })
                      .attr("d", valueline)
                      // add interation
                      .on("mousemove", function(d) {
                          mousemove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                      })
                      .on("mouseout", function(d) {
                              mousedown();
                          })
                      .on("click", function(d) {
                          click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                      });
                      
    });
    
    // ------------------
    // ---SECOND GRAPH---
    // ------------------
    
    // Generate second data set (democracy scores)
    var democratic_data_subset = d_data.filter( function(d) {
        return d.region == region && d.indicator == "Democracy Index"
    });
    
    // Now, nest this data by country
    data2Nest = d3.nest()
                  .key(function (d) {
                      return d.country;
                  })
                  .entries(democratic_data_subset);
    
    // Scale the range of the data
    x.domain(d3.extent(democratic_data_subset, function (d) {
        return new Date(d.year, 0, 1);
    }));
    y2.domain([0, 10]);
    
    // Now we play the drawing game!
    // Loop through each symbol/key
    data2Nest.forEach(function(dataPath, index) {
        var unCountry = dataPath.key;
        dataPath.key = formatCountry(dataPath.key);
        maxIndex = index;
        
        // draw country labels at end of path
	    var countryLabelsD = svg.append("text")
	                            .attr("id", "labelC")
	                            .attr("class", "labelC labelC-" + dataPath.key + " labelD-" + dataPath.key + " labelC-" + index)
	                            .attr("x", vWidth - margin.right + 7)
	                            .attr("y", y2(dataPath.values[5].value))
	                            .attr("dy", ".35em")
	                            .style("fill", function(d, i) {
	                               return color(index)
	                            })
	                            .text(dataPath.key)
                                .on("mousemove", function(d) {
                                    mousemove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], true, color(index))
                                })
                                .on("mouseout", function(d) {
                                    mousedown();
                                })
                                .on("click", function(d) {
                                 click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                                });
                            if (dataPath.values[5].value == 0)
                                countryLabelsD.text("unavailable");
        
        // draw circles at data points, none if no data
        for (var i = 0; i < data2Nest.length; i++) {
            for (var h = 0; h < data2Nest[i].values.length; h++) {
                var circle = svg.append("circle")
                                 .attr("id", "circle")
                                 .attr("class", "d-circle d-circle-" + dataPath.key + " d-circle-" + index)
                                 .attr("cx", function(d) {
                                     return x(new Date(data2Nest[i].values[h].year, 0, 1));
                                 })
                                 .attr("cy", function(d) {
                                     return y2(data2Nest[i].values[h].value);
                                 })
                                 .attr("r", 3)
                                 .style("fill", color(i))
                                 .on("mousemove", function(d) {
                                     mousemove(dataPath.key, d3.mouse(this)[0], true, color(index));
                                 })
                                 .on("mouseout", function(d) {
                                     mousedown();
                                 });
                 if (data2Nest[i].values[h].value == 0)
                     circle.style("visibility", "hidden");
            }
        }
        
        // draw valueline paths
        var path = svg.append("path")
                      .datum(dataPath.values)
                      .attr("class", "d-line d-line-" + dataPath.key + " d-line-" + index)
                      .style("stroke", function(d, i) {
                          return countryColor[dataPath.key]
                      })
                      .attr("d", valueline2)
                      .on("mouseover", function (d) {
                          path.style("stroke-width", "5px");
                      })
                      .on("mousemove", function(d) {
                          mousemove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], true, color(index))
                      })
                      .on("mouseout", function (d) {
                          path.style("stroke-width", "1.5px")
                          mousedown();
                      })
                      .on("click", function(d) {
                                 click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                      });
                        
        
    });
    
    // draw the x axes
    
    x_axis.attr("class", "xAxis axis").call(d3.axisBottom(x)
          .tickSizeInner(-450)
          .tickSizeOuter(0));
    y_axis.attr("class", "yAxis axis").call(d3.axisLeft(y)
          .tickSizeInner(-vWidth - margin.left - margin.right)
          .tickSizeOuter(0));
    x_axis2.attr("class", "xAxis2 axis").call(d3.axisBottom(x)
          .tickSizeInner(-200)
          .tickSizeOuter(0));
    y_axis2.attr("class", "yAxis axis").call(d3.axisLeft(y2)
          .tickSizeInner(-vWidth)
          .tickSizeOuter(0));
	
}





//**********
// THE MOUSE
//**********
function click(unCountry, country, mousePositionX, mousePositionY, isdemocratic, color) {
    clicked = true;
    d3.selectAll(".line").style("opacity", ".1");
    d3.selectAll(".d-line").style("opacity", ".1");
    d3.selectAll(".labelC").style("opacity", ".05");
    d3.selectAll(".labelD-" + country).style("opacity", "1");
    d3.selectAll(".circle").style("opacity", ".01");
    d3.selectAll(".d-circle").style("opacity", ".01");
    tooltipI.style("display", "none");
    tooltipY.style("display", "none");
    tooltipD.style("display", "none");
    d3.selectAll(".vertical-line").remove();
    d3.selectAll(".vertical-line2").remove();
    d3.select(".d-line-" + country).style("opacity", "1").style("stroke-width", "5px")

    // Generate data set based on selected indicators
    var country_subset = data.filter(function(d) {
        return (d.country == unCountry);
    });

    var hex = color;
    var rgb = hexToRgbA(hex)

    // Nest the data by country
    data3Nest = d3.nest()
        .key(function(d) {
            return d.indicator;
        })
        .entries(country_subset);

    // Scale the data ranges
    x.domain(d3.extent(country_subset, function(d) {
        return new Date(d.year, 0, 1);
    }));
    y.domain([-3, 3]);

    // Now we play the drawing game!
    // Loop through each symbol/key
    data3Nest.forEach(function(dataPath, index) {
        dataPath.key = formatCountry(dataPath.key);
        maxIndex = index;

        var colourIndex = 0;
        if (dataPath.key == "Control-of-Corruption") {
            colourIndex = 1;
        }
        else {
            if (dataPath.key == "Government-Effectiveness") {
                colourIndex = 2;
            }
            else {
                if (dataPath.key == "Political-Stability") {
                    colourIndex = 3;
                }
                else {
                    if (dataPath.key == "Regulatory-Quality") {
                        colourIndex = 4;
                    }
                    else {
                        if (dataPath.key == "Rule-of-Law") {
                            colourIndex = 5;
                        }
                        else {
                            if (dataPath.key == "Voice-and-Accountability") {
                                colourIndex = 6;
                            }
                        }
                    }
                }
            }
        }
        
        var iColour = rgb + "," + (1 - colourIndex / 10) + ")";

        // draw country labels at end of path
        var countryLabelsI = svg.append("text")
            .attr("id", "labelI")
            .attr("class", "labelI labelI-" + dataPath.key)
            .attr("x", vWidth - margin.right + 7)
            .attr("y", y(dataPath.values[8].value))
            .attr("dy", ".35em")
            .style("fill", iColour)
            .text(dataPath.key)
            .on("mousemove", function(d) {
                clickmove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, iColour, dataPath)
             })
            .on("mouseout", function(d) {
                d3.selectAll(".i-line").style("stroke-width", "2px");
                d3.selectAll(".vertical-line3").remove();
                d3.selectAll(".vertical-line4").remove();
                d3.selectAll(".labelI").style("opacity", ".3");
            })
            .on("click", function(d) {
                d3.selectAll(".i-line").remove();
                d3.selectAll(".labelI").remove();
                d3.selectAll(".line").style("opacity", "1");
                d3.selectAll(".d-line").style("opacity", "1");
                d3.selectAll(".labelC").style("opacity", "1");
                d3.selectAll(".circle").style("opacity", "1");
                d3.selectAll(".d-circle").style("opacity", "1");
                tooltipC.style("display", "none");
                tooltipY.style("display", "none");
                tooltipD.style("display", "none");
                d3.selectAll(".vertical-line").remove();
                d3.selectAll(".vertical-line2").remove();
                d3.select(".d-line-" + country).style("opacity", "1").style("stroke-width", "1.5px")
                clicked = false;
            });
            
        
        // draw the valueline paths
        var path = svg.append("path")
            .datum(dataPath.values)
            .attr("class", "i-line i-line-" + dataPath.key)
            .style("stroke", rgb + "," + (1 - colourIndex / 10) + ")")
            .style("stroke-width", "2px")
            .attr("d", valueline)
            // add interation
            .on("mousemove", function(d) {
                clickmove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, iColour, dataPath)
             })
            .on("mouseout", function(d) {
                d3.selectAll(".i-line").style("stroke-width", "2px");
                d3.selectAll(".vertical-line3").remove();
                d3.selectAll(".vertical-line4").remove();
                d3.selectAll(".labelI").style("opacity", ".3");
            })
            .on("click", function(d) {
                d3.selectAll(".i-line").remove();
                d3.selectAll(".labelI").remove();
                d3.selectAll(".line").style("opacity", "1");
                d3.selectAll(".d-line").style("opacity", "1");
                d3.selectAll(".labelC").style("opacity", "1");
                d3.selectAll(".circle").style("opacity", "1");
                d3.selectAll(".d-circle").style("opacity", "1");
                tooltipC.style("display", "none");
                d3.selectAll(".vertical-line3").remove();
                d3.selectAll(".vertical-line4").remove();
                d3.select(".d-line-" + country).style("opacity", "1").style("stroke-width", "1.5px")
                clicked = false;
            });
    });

}

function clickmove(indicator, mousePositionX, mousePositionY, isdemocratic, color, dataPath) {
    clickHoverLine(indicator, mousePositionX, color);
    tooltipC.style("display", "inline-block")
            .style("left", vWidth/2 - 5 + "px")
            .style("background-color", color)
            .style("opacity", .85)
            .style("top", 300 + "px");
    
    var x0 = x.invert(mousePositionX),
            i = bisectDate(dataPath.values, x0, 1),
            d0 = dataPath.values[i - 1];
    var iCountry = formatCountry(d0.country);
    var data2Path = getDemocraticValue(iCountry);
    var h = bisectDate(data2Path.values, x0, 1),
        d2 = data2Path.values[h - 1];
    
    tooltipC.html("<strong>" + d0.indicator + "</strong> in " + d0.year + ": <strong>" + Number(d0.value).toFixed(2) + "<BR>Democratic Score</strong> in " + d0.year + ": <strong>" + Number(d2.value).toFixed(2) + "</strong>");
}

function mousemove(country, mousePositionX, mousePositionY, isdemocratic, color) {
    if (clicked == false) {
        hoverLine(country, mousePositionX, color);

        var dataPath = getIndicatorValue(country);
        var data2Path = getDemocraticValue(country);

        var x0 = x.invert(mousePositionX),
            i = bisectDate(dataPath.values, x0, 1),
            d0 = dataPath.values[i - 1],
            h = bisectDate(data2Path.values, x0, 1),
            d2 = data2Path.values[h - 1];

        tooltipI.style("display", "inline-block")
            .style("left", mousePositionX + 16 + "px")
            .style("background-color", color)
            .style("opacity", .85)
            .style("top", y(d0.value) + "px")
            .on("click", function(d) {
                                 click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                      });;

        tooltipY.style("display", "inline-block")
            .style("left", mousePositionX + 16 + "px")
            .style("border", "1px solid " + color)
            .style("color", color)
            .style("opacity", 1);

        tooltipD.style("display", "inline-block")
            .style("left", mousePositionX + 16 + "px")
            .style("background-color", color)
            .style("opacity", .85)
            .style("top", y2(d2.value) + "px");


        tooltipI.html(getSelectedIndexValue("indicator") + " (estimated) for <strong>" + d0.country + "</strong>: " +
            Number(d0.value).toFixed(2));
        tooltipD.html("Democracy Index score for <strong>" + d0.country + "</strong>: " +
            Number(d2.value).toFixed(2));
        tooltipY.html(d0.year);
    }
}

function clickHoverLine(indicator, mousePosition, color) {
    var x0 = x.invert(mousePosition);
    
    d3.select(".i-line-" + indicator).style("stroke-width", "5px");
    d3.select(".labelI-" + indicator).style("opacity", "1");
    
    d3.selectAll(".vertical-line3").remove();
    svg.append("line")
       .attr("x1", x(x0) + 1)
       .attr("y1", 250)
       .attr("x2", x(x0) + 1)
       .attr("y2", height)
       .attr("class", "vertical-line3")
       .style("stroke-width", 1)
       .style("stroke", color)
       .style("fill", "none");
    
    d3.selectAll(".vertical-line4").remove();
    svg.append("line")
       .attr("x1", x(x0) + 1)
       .attr("y1", 30)
       .attr("x2", x(x0) + 1)
       .attr("y2", 200)
       .attr("class", "vertical-line4")
       .style("stroke-width", 1)
       .style("stroke", color)
       .style("fill", "none");
}

function hoverLine(country, mousePosition, color) {
    var x0 = x.invert(mousePosition);
    
    d3.select(".line-" + country).style("stroke-width", "5px");
    d3.select(".d-line-" + country).style("stroke-width", "5px");
    d3.selectAll(".labelC-" + country).style("opacity", "1");
    // d3.selectAll(".circle-" + country).attr("r", 5);
    
    d3.selectAll(".vertical-line").remove();
    svg.append("line")
       .attr("x1", x(x0) + 1)
       .attr("y1", 250)
       .attr("x2", x(x0) + 1)
       .attr("y2", height)
       .attr("class", "vertical-line")
       .style("stroke-width", 1)
       .style("stroke", color)
       .style("fill", "none");
    
    d3.selectAll(".vertical-line2").remove();
    svg.append("line")
       .attr("x1", x(x0) + 1)
       .attr("y1", 30)
       .attr("x2", x(x0) + 1)
       .attr("y2", 200)
       .attr("class", "vertical-line2")
       .style("stroke-width", 1)
       .style("stroke", color)
       .style("fill", "none");
}

function mousedown() {
    if (clicked == false) {
        tooltipI.style("display", "none");
        tooltipY.style("display", "none");
        tooltipD.style("display", "none");
        d3.selectAll("path").style("stroke-width", "1.5px");
        d3.selectAll(".labelC").style("opacity", ".3");
        d3.selectAll(".vertical-line").remove();
        d3.selectAll(".vertical-line2").remove();
        d3.selectAll(".circle").attr("r", 3);
    }
}




//**************
// THE UTILITIES
//**************
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

function getDemocraticValue(country) {
    var countryValues;
    data2Nest.forEach(function(dataPath, index) {
        if (dataPath.key == country) {
            countryValues = dataPath;
        }
    });
    return countryValues;
}

function getSelectedIndexValue(id) {
    var e = document.getElementById(id);
    var value = e.options[e.selectedIndex].value;
    return value;
}

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