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

//Get selected region and indicator
var lRegion = getSelectedIndexValue("region");
var lIndicator = getSelectedIndexValue("indicator");

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
var xWidth = vWidth - margin.left - margin.right;

// Initiate the overlay SVG
var svgAxes = d3.select("#visualization")
                .append("svg")
                .attr("id", "svgAxes")
                // // .style("position", "absolute")
                // .style("left", "0px")
                .attr("width", vWidth - margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .style("transform", "translate(" + -(margin.left-10) + "px, 5px)")
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
var showComp = false;
var showLag = false;
var tooltipMove = 16;
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

// Create Option Buttons
var bOpt = d3.select("#subtitle").append("div").attr("class", "subtitle");
bOpt.html("<div title='This displays average democracy scores for the entire world and all of Sub-Saharan Africa for comparison (shown in black)' class='b bComp'>Show Averages</div><div title='' class='b bLag'>Show GINI</div>");

var bComp = d3.select(".bComp");
bComp.on("click", function(d) {
    if (showComp == false) {
        bComp.style("background-color", "black").style("color", "white");
        d3.selectAll("#pathA").style("visibility", "visible");
        d3.selectAll("#labelA").style("visibility", "visible");
        showComp = true;
    }else{
        bComp.style("background-color", "white").style("color", "black");
        d3.selectAll("#pathA").style("visibility", "hidden");
        d3.selectAll("#labelA").style("visibility", "hidden");
        showComp = false;
    }
})

var bLag = d3.select(".bLag");
bLag.on("click", function(d) {
    if (showLag == false) {
        bLag.style("background-color", "black").style("color", "white");
        tooltipMove = (xWidth/8) + 15;
        showLag = true;
    }else{
        bLag.style("background-color", "white").style("color", "black");
        tooltipMove = 16;
        showLag = false;
    }
})




//**********
// THE LABES
//**********
var yLabelD = d3.select("#visualization").append("div").attr("id", "yLabelD").attr("class", "yLabel");
var yLabelI = d3.select("#visualization").append("div").attr("id", "yLabelI").attr("class", "yLabel");
var hLabelI = d3.select("#visualization").append("div").attr("id", "hLabelI").attr("class", "hLabel");

yLabelD.style("top", 100 + "px")
       .html('Democratic Score <div class="popvert"><a href="#" data-toggle="popover" data-trigger="focus" data-html="true" title="Democracy Index Scores" data-content="The Democracy Index is compiled by the Economist Intelligence Unit, which measures the state of democracy in 167 countries. The index is based on 60 indicators from five categories and measures pluralism, civil liberties, and politcal cultures. Data is available for 2006, 2008, 2010, and each year since then. Countries are classified into one of four regime types: full democracy, flawed democracy, hybrid regime, or authoritarian regime. See the Economist Intelligence Unit&rsquo;s website for more details"><span class="glyphicon glyphicon-question-sign glyphVert" aria-hidden="true"></span></a></div>');
yLabelI.style("top", 475 + "px")
       .html('Estimated Score <div class="popvert"><a href="#" data-toggle="popover" data-trigger="focus" data-html="true" title="Estimated Governance Indicator Scores" data-content="Worldwide Governance Indicator scores are provided by the World Bank for six dimensions of governance. The data used are estimated scores on the aggregate indicator, in units of a standard normal distribution, ranging from approximately -3 to +3.</br></br> The WGI are composite indicators based on over 30 underlying data sources. These data sources are rescaled and combined to create the six aggregate indicators using a statistical methodology known as an unobserved components model."><span class="glyphicon glyphicon-question-sign glyphVert" aria-hidden="true"></span></a></div>');
hLabelI.style("top", 9 + "px")
       .style("left", vWidth/2 + "px")
       .html('Democracy Index, 2006-2014');
// hLabelD placed inside vizzy function to refresh





//**********
// THE VIZZY
//**********
drawVisual(true);

function drawVisual(refreshLine) {

    // Remove all previous
    d3.selectAll("path").remove();
    d3.selectAll("#circle").remove();
    d3.selectAll("#labelC").remove();
    d3.selectAll("#hLabelD").remove();
    d3.selectAll("#pop").remove();

    //Get selected region and indicator
    var region = getSelectedIndexValue("region");
    var indicator = getSelectedIndexValue("indicator");

     // draw hLabelD (refreshed)
    var hLabelD = d3.select("#visualization").append("div").attr("id", "hLabelD").attr("class", "hLabel");
    hLabelD.style("top", 270 + "px")
           .style("left", vWidth/2 + "px");
    
    var indicatorDesc = "This indicator captures perceptions of the extent to which public power is exercised for private gain, including both petty and grand forms of corruption, as well as capture of the state by elites and private interests.";
    if (getSelectedIndexValue("indicator") === "Control of Corruption") {
		indicatorDesc = "This indicator captures perceptions of the extent to which public power is exercised for private gain, including both petty and grand forms of corruption, as well as capture of the state by elites and private interests.";
		}else{
			if (getSelectedIndexValue("indicator") === "Government Effectiveness") {
			    indicatorDesc = "This indicator captures perceptions of the quality of public services, the quality of the civil service, and the degree of its independence from political pressures, the quality of policy formulation and impementation, and the credibility of the government&apos;s commutment to such policies.";
			}else {
				if (getSelectedIndexValue("indicator") === "Political Stability") {
					indicatorDesc = "This indicator measures perceptions of the likelihood of political instability and/or politcally-motivated violence, including terrorism.";
				}else {
					if (getSelectedIndexValue("indicator") === "Regulatory Quality") {
						indicatorDesc = "This indicator captures perceptions of the ability of the government to formulate and implement sound policies and regulations that permid and promote private sector development.";
					}else {
						if (getSelectedIndexValue("indicator") === "Rule of Law") {
						    indicatorDesc = "This indicator captures perceptions of the extent to which agents have confidence in and abide by the rules of society, and in particular the quality of contract enforcement, property rights, the police, and the courts, as well as the likelihood of crime and violence.";
						}else {
							if (getSelectedIndexValue("indicator") === "Voice and Accountability") {
								indicatorDesc = "This indicator captures perceptions of the extend to which a country&apos;s citizens are able to participate in selecting their government, as well as freedom of expression, freedom of association, and a free media.";
							}
						}
					}
				}
			}
		}
    hLabelD.html(indicator +', 2006-2014 <a href="#" data-toggle="popover" data-placement="bottom" data-trigger="focus" data-html="true" title="' + indicator + '" data-content="' + indicatorDesc + '<div class=footnote> Definition courtesy of World Bank: Governance Indicators Project. More details at <a href=http://info.worldbank.org/governance/wgi/index.aspx#doc>govindicators.org</a></div>"><span id="pop" class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></a>');


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
                                 .style("fill", color(i));
                                //  .on("mousemove", function(d) {
                                //      mousemove(dataPath.key, d3.mouse(this)[0], false, color(index));
                                //  })
                                //  .on("mouseout", function(d) {
                                //      mousedown();
                                //  });
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
                                    if (clicked == false) {
                                        click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                                    }
                                    else {
                                        clickclick();
                                    }
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
                                //  .on("mousemove", function(d) {
                                //      mousemove(dataPath.key, d3.mouse(this)[0], true, color(index));
                                //  })
                                //  .on("mouseout", function(d) {
                                //      mousedown();
                                //  });
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
                        //   path.style("stroke-width", "5px");
                      })
                      .on("mousemove", function(d) {
                          if (clicked == true) {
                          clickmove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index), dataPath)
                          }else{
                          mousemove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], true, color(index))
                          }
                      })
                      .on("mouseout", function (d) {
                        //   path.style("stroke-width", "1.5px")
                            mousedown();
                            d3.selectAll(".i-line").style("stroke-width", "2px");
                            d3.selectAll(".vertical-line3").remove();
                            d3.selectAll(".vertical-line4").remove();
                            d3.selectAll(".labelI").style("opacity", ".3");
                      })
                      .on("click", function(d) {
                                 if (clicked == false) {
                                 click(unCountry, dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, color(index))
                                 }else{
                                     clickclick();
                                 }
                      });
                        
        
    });
    
    // ----------------------------
    // ---AVERAGES + COMPARISONS---
    // ----------------------------

    d3.csv("democracy-a1.csv", function(error, aData) {
        
        aData = aData.filter( function(d) {
            return d.area == "World Average" || d.area == "Sub-Saharan Africa"
        })
        
        aData = d3.nest().key(function(d) {
            return d.area;
        }).entries(aData);
        
        for (var i = 0; i<2; i++) {
            var aLabels = svg.append("text")
                             .attr("id", "labelA")
                             .attr("class", "labelA")
                             .attr("x", vWidth - margin.right + 7)
                             .attr("y", y2(aData[i].values[6].value))
                             .attr("dy", ".35em")
                             .text(aData[i].key + " (" + aData[i].values[6].value + ")");
            var path = svg.append("path")
                          .attr("id", "pathA")
                          .attr("class", "pathA")
                          .datum(aData[i].values)
                          .attr("d", valueline2);
        }
        
        
    });
    
    // draw the x axes
    x_axis.attr("class", "xAxis axis").attr("id", "xAxis").call(d3.axisBottom(x)
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
    d3.selectAll(".line").style("opacity", ".05");
    d3.selectAll(".d-line").style("opacity", ".05");
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
    // generate data for information below and draw divs to hold it
    d3.csv("countryOverviews.csv", function(error, oData) {
        
        oData = oData.filter( function(d) {
            return d.country == unCountry
        })
        
        var iFR = oData[0].freedomRating;
        var iPL = oData[0].pL;
        var iCL = oData[0].cL;
        
        var iLeft = d3.select("#iLeft").append("div").attr("class", "iLeft");
        iLeft.html("<div class='iTitle'>"+oData[0].country+"</div><div class='iOverview'>"+oData[0].overview+"</div><div class='iMore'><a id='iMore' style='color: "+color+" !important;' href='"+oData[0].url+"'>Read more at Freedom House</a></div>");
        
        var iRight = d3.select("#iRight").append("div").attr("class", "iRight");
        iRight.html("<div class='iDeets'><span class='jayz'><span class='top'>Democratic?</span><span class='bottom'>"+oData[0].democraticStatus+"</span></span><span class='jayz'><span class='top'>Free?</span><span class='bottom'>"+oData[0].freedomStatus+"</span></span><span class='jayz'><span class='top'>Freedom <br>Rating</span><span class='bottom'>"+iFR+"</span></span><span class='jayz'><span class='top'>Political<br> Rights</span><span class='bottom'>"+iPL+"</span></span><span class='jayz'><span class='top'>Civil<br> Liberties</span><span class='bottom'>"+iCL+"</span></span></div>");
        
        d3.select(".iTitle").style("color", color);
        d3.selectAll(".top").style("color", color);
        d3.selectAll(".bottom").style("font-weight", "700");
        
        
        });


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
                d3.selectAll(".vertical-line3L").remove();
                d3.selectAll(".lag2").remove();
                d3.selectAll(".vertical-line4").remove();
                d3.selectAll(".labelI").style("opacity", ".3");
            })
            .on("click", function(d) {
                clickclick();
            });
        
        // draw circles at data points, none if no data
        for (var i = 0; i < data3Nest.length; i++) {
            for (var h = 0; h < data3Nest[i].values.length; h++) {
                var circle = svg.append("circle")
                                 .attr("id", "circle")
                                 .attr("class", "i-circle i-circle-" + dataPath.key)
                                 .attr("cx", function(d) {
                                     return x(new Date(data3Nest[i].values[h].year, 0, 1));
                                 })
                                 .attr("cy", function(d) {
                                         return y(data3Nest[i].values[h].value);
                                     })
                                 .attr("r", 3)
                                 .style("stroke-width", "2px")
                                 .style("stroke", iColour)
                                 .style("fill", "white")
                                 .on("mousemove", function(d) {
                                     clickmove(dataPath.key, d3.mouse(this)[0], d3.mouse(this)[1], false, iColour, dataPath)
                                 })
                                 //  .on("mouseout", function(d) {
                                 //      mousedown();
                                 //  });
                 if (data3Nest[i].values[h].value == 0)
                     circle.style("visibility", "hidden");
            }
        }    
        
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
                d3.selectAll(".vertical-line3L").remove();
                d3.selectAll(".lag2").remove();
                d3.selectAll(".vertical-line4").remove();
                d3.selectAll(".labelI").style("opacity", ".3");
            })
            .on("click", function(d) {
                clickclick();
            });
    });

}

function clickclick() {
    d3.selectAll(".i-line").remove();
    d3.selectAll(".labelI").remove();
    d3.selectAll(".i-circle").remove();
    d3.selectAll(".line").style("opacity", "1");
    d3.selectAll(".d-line").style("opacity", "1");
    d3.selectAll(".labelC").style("opacity", "1");
    d3.selectAll(".circle").style("opacity", "1");
    d3.selectAll(".d-circle").style("opacity", "1");
    tooltipC.style("display", "none");
    d3.selectAll(".vertical-line3").remove();
    d3.selectAll(".vertical-line4").remove();
    d3.select(".d-line-" + country).style("opacity", "1").style("stroke-width", "1.5px")
    if (clicked == true){
        d3.selectAll(".iLeft").remove();
        d3.selectAll(".iRight").remove();
    }else{};
    clicked = false;
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
        
    var dVal = 0;        
        
    if (d2.value == 0) {
        dVal = "unavailable";
    }else{
        dVal = Number(d2.value).toFixed(2);
    }
    
    tooltipC.html("<div id='tooltipClick'><strong>" + d0.country + "<br><div id='tooltipClickSub'>" + d0.indicator + "</strong> in " + d0.year + ": <strong>" + Number(d0.value).toFixed(2) + "<BR>Democratic Score</strong> in " + d0.year + ": <strong>" + dVal + "</strong></div></div>");
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
            .style("left", mousePositionX + tooltipMove + "px")
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
       
    d3.selectAll(".vertical-line3L").remove();
    svg.append("line")
       .attr("x1", x(x0) + xWidth/8)
       .attr("y1", 250)
       .attr("x2", x(x0) + xWidth/8)
       .attr("y2", height)
       .attr("class", "vertical-line3L")
       .style("stroke-width", 1)
       .style("stroke", color)
       .style("opacity", "0.2")
       .style("fill", "none")
       .style("visibility", "hidden");
    
    d3.selectAll(".lag2").remove();
    svg.append("rect")
       .attr("x", x(x0))
       .attr("y", 250)
       .attr("width", xWidth/8)
       .attr("height", height-250)
       .attr("class", "lag2")
       .style("stroke", "none")
       .style("fill", color)
       .style("opacity", "0.1")
       .style("visibility", "hidden");
    
    if (showLag == true) {
        d3.select(".lag2").style("visibility", "visible");
        d3.select(".vertical-line3L").style("visibility", "visible");
    }
    
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
    
    d3.selectAll(".vertical-lineL").remove();
    svg.append("line")
       .attr("x1", x(x0) + xWidth/8)
       .attr("y1", 250)
       .attr("x2", x(x0) + xWidth/8)
       .attr("y2", height)
       .attr("class", "vertical-lineL")
       .style("stroke-width", 1)
       .style("stroke", color)
       .style("opacity", "0.2")
       .style("fill", "none")
       .style("visibility", "hidden");
    
    d3.selectAll(".lag").remove();
    svg.append("rect")
       .attr("x", x(x0))
       .attr("y", 250)
       .attr("width", xWidth/8)
       .attr("height", height-250)
       .attr("class", "lag")
       .style("stroke", "none")
       .style("fill", hexToRgbA(color) + ", 0.1)")
       .style("visibility", "hidden");
       
    if (showLag == true) {
        d3.select(".lag").style("visibility", "visible");
        d3.select(".vertical-lineL").style("visibility", "visible");
    }
    
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
        d3.selectAll(".vertical-lineL").remove();
        d3.selectAll(".lag").remove();
        d3.selectAll(".vertical-line2").remove();
        d3.selectAll(".lag").remove();
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

$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
});
$(document).ready(function(){
    $('[data-toggle="popover2"]').popover(); 
});