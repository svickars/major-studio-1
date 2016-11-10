// store extrema in global variables. Min and Max very likely not to be true, so big
var minVal = 10000;
var maxVal = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    noFill();
    textSize(10);
    // load the "tsv" formatted data from the undp sourc
    // the data structure is "tsv" and we have a "header" in the file
    loadTable("LaborInNonAgricultSector.txt", "tsv", "header", showData);
    colorMode(HSB,360,1.0,1.0);
}

// call back function when table is loaded
function showData(data) {
    // count the rows in our table
    var count = data.getRowCount();
    // parse the data returned by loadStrings()
    // rowHeight does nothing, but allows us to space out rows
    var rowHeight = 30;
    // loop through all rows to determine global minimum and maximum
    for (var row = 0; row < count; row++) {
        // loop through all the columns
        for (col = 3; col < 26; col++) {
            var val = data.getString(row, col);
            // display the text on the canvas
            val = parseFloat(val);
            if (minVal > val)
                minVal = val;
            if (maxVal < val)
                maxVal = val;
        }
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
    // display
    for (row = 0; row < count; row++) {
        beginShape();
        // loop through all the columns
        for (var col = 3; col < 26; col++) {
            val = data.getString(row, col);
            // display the text on the canvas
            val = parseFloat(val);
            // width and height refer to full width and full height of browser window
            vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
}