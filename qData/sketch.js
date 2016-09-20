// store extrema in global variables. Min and Max very likely not to be true, so big
var minVal = -3;
var maxVal = 3;
var alpha = .25;
var graphWeight = 1;
var cCC = 'rgba(0,255,0,'+ alpha +')';
var cGE = 'rgba(0,255,0,'+ alpha +')';
var cPS = 'rgba(0,255,0,'+ alpha +')';
var cRQ = 'rgba(0,255,0,'+ alpha +')';
var cRL = 'rgba(0,255,0,'+ alpha +')';
var cV = 'rgba(0,255,0,'+ alpha +')';


function setup() {
    noLoop();
    noFill();
    textSize(10);
    createCanvas(windowWidth, 4850);
    loadTable("dataSources/WBCorruptionControl.txt", "tsv", "header", showData);
    loadTable("dataSources/WBGovernmentEffectiveness.txt", "tsv", "header", showDataGE);
    loadTable("dataSources/WBPoliticalStability.txt", "tsv", "header", showDataPS);
    loadTable("dataSources/WBRegulatoryQuality.txt", "tsv", "header", showDataRQ);
    loadTable("dataSources/WBRuleOfLaw.txt", "tsv", "header", showDataRL);
    loadTable("dataSources/WBVoice.txt", "tsv", "header", showDataV);
}

// Corruption Control and Axes
function showData(data) {
    var count = data.getRowCount();
    var rowHeight = 100;

    for (var i=0; i<count; i++) {
        // dividing line
        stroke(200);
        strokeWeight(2);
        line(50,rowHeight*(i+1),width-100,rowHeight*(i+1));
        
        // x axes
        stroke(150);
        strokeWeight(1);
        line(150,rowHeight*(i+1)-50,width-100,rowHeight*(i+1)-50);
        stroke(220);
        strokeWeight(.5);
        line(150,rowHeight*(i+1)-100/6,width-100,rowHeight*(i+1)-100/6);
        line(150,rowHeight*(i+1)-100/6*2,width-100,rowHeight*(i+1)-100/6*2);
        line(150,rowHeight*(i+1)-100/6*4,width-100,rowHeight*(i+1)-100/6*4);
        line(150,rowHeight*(i+1)-100/6*5,width-100,rowHeight*(i+1)-100/6*5);
        noStroke();
        fill(150);
        textSize(7);
        textAlign(RIGHT);
        text('0', 145, rowHeight*(i+1)-47.5);
        textSize(5);
        fill(220);
        text('+2', 145, rowHeight*(i+1)-98/6*5);
        text('+1', 145, rowHeight*(i+1)-98/6*4);
        text('-1', 145, rowHeight*(i+1)-98/6*2);
        text('-2', 145, rowHeight*(i+1)-98/6);
    }

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
        strokeWeight(graphWeight);
        stroke(cCC);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
        
        // country names
        noStroke();
        fill(0);
        textAlign(RIGHT);
        textStyle(BOLD);
        textSize(10);
        text(country, 130, rowHeight*(i+1)-47.5)
    }
    
    
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}

// Government Effectiveness
function showDataGE(data) {
    var count = data.getRowCount();
    var rowHeight = 100;
    for (var i=0; i<count; i++) {
        // graphs
        noFill();
        strokeWeight(graphWeight);
        stroke(cGE);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}

// Politcal Stability
function showDataPS(data) {
    var count = data.getRowCount();
    var rowHeight = 100;
    for (var i=0; i<count; i++) {
        // graphs
        noFill();
        strokeWeight(graphWeight);
        stroke(cPS);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}

// Regulatory Quality
function showDataRQ(data) {
    var count = data.getRowCount();
    var rowHeight = 100;
    for (var i=0; i<count; i++) {
        // graphs
        noFill();
        strokeWeight(graphWeight);
        stroke(cRQ);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}

// Rule of Law
function showDataRL(data) {
    var count = data.getRowCount();
    var rowHeight = 100;
    for (var i=0; i<count; i++) {
        // graphs
        noFill();
        strokeWeight(graphWeight);
        stroke(cRL);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}

// Voice and Accountability
function showDataV(data) {
    var count = data.getRowCount();
    var rowHeight = 100;
    for (var i=0; i<count; i++) {
        // graphs
        noFill();
        strokeWeight(graphWeight);
        stroke(cV);
        beginShape();
        // loop through all the columns
        for (var col = 4; col < 20; col++) {
            val = data.getString(i, col);
            val = parseFloat(val);
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1), rowHeight*(i+1)-100));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}

function draw() {
        fill(200);
        stroke(200);
        strokeWeight(1);
        line(150,10,width-100,10);
        textAlign(RIGHT);
        noStroke();
        
        textSize(7);
        textAlign(CENTER);
        text('1996',150,20);
        text('2014',((width-250)/18)*18+150,20);
}