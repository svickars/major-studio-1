// store extrema in global variables. Min and Max very likely not to be true, so big
var minVal = 10000;
var maxVal = 0;

function setup() {
    noLoop();
    noFill();
    textSize(10);
    createCanvas(windowWidth, 4850);
    loadTable("dataSources/WBCorruptionControl.txt", "tsv", "header", showData);
    
}

function draw() {
        // timeline
        fill(0);
        strokeWeight(3);
        line(200,10,width-55,10);
        triangle(width-55,7.5,width-50,10,width-55,12.5);
        textAlign(RIGHT);
        text('1996', 195, 15);
        textAlign(LEFT);
        text('2014',width-45,15);
}

function showData(data) {
    var count = data.getRowCount();
    var rowHeight = 100;
    
    for (var i=0; i<count; i++) {
        var country = data.getString(i, 2);
        var year = [];
        for(var col=4; col<20; col++) {
            // year.push(data.getString(i, col));
            var val = data.getString(i, col);
            val = parseFloat(val);
            if (minVal > val)
                minVal = val;
            if (maxVal < val)
                maxVal = val;
        }
        
        // graphs
        noFill();
        strokeWeight(.5);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 200, width-50), map(val, minVal, maxVal, rowHeight, rowHeight-100));
        }
        endShape();
        
        // country names
        fill(0);
        textAlign(RIGHT);
        text(country, 195, rowHeight*(i+1))
    }
}




// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     noLoop();
//     noFill();
//     textSize(10);
//     // load the "tsv" formatted data from the undp sourc
//     // the data structure is "tsv" and we have a "header" in the file
//     loadTable("dataSources/WBCorruptionControl.txt", "tsv", "header", showData);
//     colorMode(HSB,360,1.0,1.0);
//     stroke(0,1.0,1.0);
// }

// // call back function when table is loaded
// function showData(data) {
//     // count the rows in our table
//     var count = data.getRowCount();
//     // parse the data returned by loadStrings()
//     // rowHeight does nothing, but allows us to space out rows
//     var rowHeight = 10;
//     // loop through all rows to determine global minimum and maximum
//     for (var row = 0; row < count; row++) {
//         // loop through all the columns
//         for (col = 3; col < 20; col++) {
//             var val = data.getString(row, col);
//             // display the text on the canvas
//             val = parseFloat(val);
//             if (minVal > val)
//                 minVal = val;
//             if (maxVal < val)
//                 maxVal = val;
//         }
//     }
//     console.log("minimum: " + minVal + " | maximum: " + maxVal);
//     // display
//     for (row = 0; row < count; row++) {
//         beginShape();
//         // loop through all the columns
//         for (var col = 3; col < 20; col++) {
//             val = data.getString(row, col);
//             // display the text on the canvas
//             val = parseFloat(val);
//             // width and height refer to full width and full height of browser window
//             vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
//         }
//         endShape();
//     }
// }