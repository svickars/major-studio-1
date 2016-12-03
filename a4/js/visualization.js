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
// var width = 1048 - margin.left - margin.right;
var width = "100%";
// var height = 700 - margin.top - margin.bottom;
var height = 700;

// Initiate the main SVG
var svg = d3.select("#visualization")
            .append("svg")
            .attr("id", "svg")
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom)
            .append("g");

// Initiate the overlay SVG
var svgAxes = d3.select("#overlay")
                .append("svg")
                .attr("id", "svgAxes")
                .attr("width", width)
                .attr("height", height + margin.bottom + margin.top)
                .append("g");

// Global Variables
var color = d3.scaleOrdinal()
	.range(['#e5243b', '#dda63a', '#26bde2', '#c5192d', '#ff3a21', '#4c9f38', '#fcc30b', '#a21942', '#fd6925', '#dd1367', '#fd9d24', '#bf8b2e', '#3f7e44', '#0a97d9', '#56c02b', '#00689d', '#19486a', '#9c4b94', '#3fc1c5']);
var bisectDate = d3.bisector(function(d) {
	return new Date(d.year, 0, 1);
}).left;
var maxIndex = 0;
var visible = true;
var dataNest;
var country;

// Parse the Date
var parseDate = d3.timeParse("%y");

// Set the Ranges/Scales/All That Fun Stuff
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 250]);

// Set up the Axes
var x_axis = svg.append("g")
	            .attr("transform", "translate(0," + (height) + ")")
	            .attr("id", "xAxis");
var y_axis = svg.append("g")
                .attr("id", "yAxis");

// Draw Data Lines
var valueline = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) {
		return x(new Date(d.year, 0, 1));
	})
	.y(function(d) {
		return y(+d.value);
	});





//**********
// THE VIZZY
//**********
drawVisual(true);

function drawVisual(refreshLine) {

    // Remove all previous
    d3.selectAll("path").remove();
    d3.selectAll("#circles").remove();
    d3.selectAll(".labe").remove();

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
       dataPath.key = formatCountry(dataPath.key);
	    
	   // assign each country a colour
	   countryColor[dataPath.key] = color(index);
	   maxIndex = index;
	   
	   // draw country labels at end of path
	   var countryLabelsI = svg.append("text")
	                         .attr("id", "countryLabels")
	                         .attr("class", "labelC labelC-" + dataPath.key + " labelC-" + index)
	                         .attr("x", 300)
	                         .attr("y", y(dataPath.values[8].value))
	                         .attr("dy", ".35em")
	                         .style("fill", function(d, i) {
	                             return color(index)
	                         })
	                         .text(dataPath.key);
        
        // draw circles at data points, none if no data
        for (var i = 0; i < dataNest.length; i++) {
            for (var h = 0; h < dataNest[i].values.length; h++) {
                var circles = svg.append("circle")
                                 .attr("id", "circles")
                                 .attr("class", "circle circle-" + dataPath.key + " circle" + index)
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
        
        // draw the valueline paths
        var path = svg.append("path")
                      .datum(dataPath.values)
                      .attr("class", "line line-" + dataPath.key + " line-" + index)
                      .style("stroke", function (d, i) {
                          return color(index)
                      })
                    //   .attr("d", valueline);
	   
	
	
	console.log(dataPath.values);
    });
	
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

function getdemocraticValue(country) {
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