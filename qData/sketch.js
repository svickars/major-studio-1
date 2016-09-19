// store extrema in global variables. Min and Max very likely not to be true, so big
var minVal = 10000;
var maxVal = 0;
var myDiv;

function setup() {
    noLoop();
    noFill();
    textSize(10);
    createCanvas(windowWidth, 4850);
    loadTable("dataSources/WBCorruptionControl.txt", "tsv", "header", showData);
}

function draw() {
        // timeline
        fill(200);
        stroke(200);
        strokeWeight(2);
        line(200,10,width-55,10);
        triangle(width-55,7.5,width-50,10,width-55,12.5);
        textAlign(RIGHT);
        noStroke();
        text('1996', 195, 15);
        textAlign(LEFT);
        text('2014',width-45,15);
        
        stroke(200);
        strokeWeight(2);
        line((width-250)/16+200,5,(width-250)/16+200,15);
        line(((width-250)/16)*2+200,5,((width-250)/16)*2+200,15);
        line(((width-250)/16)*3+200,5,((width-250)/16)*3+200,15);
        line(((width-250)/16)*4+200,5,((width-250)/16)*4+200,15);
        line(((width-250)/16)*5+200,5,((width-250)/16)*5+200,15);
        line(((width-250)/16)*6+200,5,((width-250)/16)*6+200,15);
        line(((width-250)/16)*7+200,5,((width-250)/16)*7+200,15);
        line(((width-250)/16)*8+200,5,((width-250)/16)*8+200,15);
        line(((width-250)/16)*9+200,5,((width-250)/16)*9+200,15);
        line(((width-250)/16)*10+200,5,((width-250)/16)*10+200,15);
        line(((width-250)/16)*11+200,5,((width-250)/16)*11+200,15);
        line(((width-250)/16)*12+200,5,((width-250)/16)*12+200,15);
        line(((width-250)/16)*13+200,5,((width-250)/16)*13+200,15);
        line(((width-250)/16)*14+200,5,((width-250)/16)*14+200,15);
        line(((width-250)/16)*15+200,5,((width-250)/16)*15+200,15);
}

function showData(data) {
    var count = data.getRowCount();
    var rowHeight = 100;

    for (var i=0; i<count; i++) {
        var country = data.getString(i, 2);
        for(var col=4; col<20; col++) {
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

    // beginShape();
//         // loop through all the columns
//         for (var col = 3; col < 20; col++) {
//             val = data.getString(row, col);
//             // display the text on the canvas
//             val = parseFloat(val);
//             // width and height refer to full width and full height of browser window
//             vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
//         }
//         endShape();


        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            stroke(0);
            vertex(map(col, 4, 19, 200, width-50), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
        
        // dividing line
        stroke(200);
        strokeWeight(2);
        line(50,rowHeight*(i+1),width-50,rowHeight*(i+1));
        
        // zero line
        stroke(255,0,0);
        strokeWeight(1);
        line(200,rowHeight*(i+1)-50,width-50,rowHeight*(i+1)-50);
        noStroke();
        fill(255,0,0);
        textSize(7);
        textAlign(RIGHT);
        text('0', 195, rowHeight*(i+1)-47.5);
        
        // country names
        noStroke();
        fill(0);
        textAlign(RIGHT);
        textStyle(BOLD);
        textSize(10);
        text(country, 180, rowHeight*(i+1)-47.5)
        stroke(0);
    }
    
    
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}




// function setup() {
// noLoop();
//     noFill();
//     textSize(10);
//     createCanvas(windowWidth, 4850);
//     loadTable("dataSources/WBCorruptionControl.txt", "tsv", "header", showData);
// }

// function draw() {
//         // timeline
//         fill(0);
//         strokeWeight(3);
//         line(200,10,width-55,10);
//         triangle(width-55,7.5,width-50,10,width-55,12.5);
//         textAlign(RIGHT);
//         text('1996', 195, 15);
//         textAlign(LEFT);
//         text('2014',width-45,15);
// }

// // call back function when table is loaded
// function showData(data) {
//     // count the rows in our table
//     var count = data.getRowCount();
//     // parse the data returned by loadStrings()
//     // rowHeight does nothing, but allows us to space out rows
//     var rowHeight = 100;
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

//     // graphs
//         noFill();
//         strokeWeight(.5);
    
//     for (row = 0; row < count; row++) {
//         beginShape();
//         // loop through all the columns
//         for (var col = 3; col < 20; col++) {
//             val = data.getString(row, col);
//             // display the text on the canvas
//             val = parseFloat(val);
//             // width and height refer to full width and full height of browser window
//             vertex(map(col, 4, 19, 200, width-50), map(val, minVal, maxVal, rowHeight*(row+1), rowHeight*(row+1)-100));
//         }
//         endShape();
    
//         // zero line
//         stroke(255,0,0);
//         line(200,rowHeight*(row+1)-50,width-55,rowHeight*(row+1)-50);
//         noStroke();
//         fill(255,0,0);
//         textSize(7);
//         textAlign(RIGHT);
//         text('0', 195, rowHeight*(row+1)-47.5);
//         noFill();
        
//         // country names
//         // noStroke();
//         // fill(0);
//         // textAlign(RIGHT);
//         // textStyle(BOLD);
//         // textSize(10);
//         // text(country, 180, rowHeight*(row+1)-47.5)
        
//     }
    
// }



        // var A = 200;
        // var B = width-55;
        // var C = lerp(A,B, .01);
        // var D = lerp(A,B, .02);
        // var E = lerp(A,B, .03);

        // var Y = rowHeight*(i+1)

        // strokeWeight(1);
        // strokeCap(ROUND);
        // stroke(0); // Draw the original points in black
        // line(A, Y, C, Y);
        // point(B, Y);
        // point(C, Y);
        // point(D, Y);
        // point(E, Y);