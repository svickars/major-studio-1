var minVal = -3;
var maxVal = 3;
var alpha = .50;
var graphWeight = 2;
var cCC = 'rgba(253,126,73,'+ alpha +')';
var cGE = 'rgba(57,132,140,'+ alpha +')';
var cPS = 'rgba(177,182,131,'+ alpha +')';
var cRQ = 'rgba(231,121,51,'+ alpha +')';
var cRL = 'rgba(23,20,38,'+ alpha +')';
var cV = 'rgba(180,90,204,'+ alpha +')';
var hHeight = 120;


function setup() {
    noLoop();
    noFill();
    textSize(10);
    textFont("PT Sans");
    createCanvas(windowWidth, 4850+hHeight);
    loadTable("dataSources/WBCorruptionControl.txt", "tsv", "header", showData);
    loadTable("dataSources/WBGovernmentEffectiveness.txt", "tsv", "header", showDataGE);
    loadTable("dataSources/WBPoliticalStability.txt", "tsv", "header", showDataPS);
    loadTable("dataSources/WBRegulatoryQuality.txt", "tsv", "header", showDataRQ);
    loadTable("dataSources/WBRuleOfLaw.txt", "tsv", "header", showDataRL);
    loadTable("dataSources/WBVoice.txt", "tsv", "header", showDataV);
}

function draw() {
    // legend
    strokeWeight(graphWeight);
    stroke(cCC);
    line(width-150,20,width-100,20);
    stroke(cGE);
    line(width-150,35,width-100,35);
    stroke(cPS);
    line(width-150,50,width-100,50);
    stroke(cRQ);
    line(width-150,65,width-100,65);
    stroke(cRL);
    line(width-150,80,width-100,80);
    stroke(cV);
    line(width-150,95,width-100,95);
    noStroke();
    
    textSize(10);
    textAlign(RIGHT);
    fill(cCC);
    text('Corruption Control', width-155,23);
    fill(cGE);
    text('Government Effectiveness', width-155,38);
    fill(cPS);
    text('Political Stability', width-155,53);
    fill(cRQ);
    text('Regulatory Quality', width-155,68);
    fill(cRL);
    text('Rule of Law', width-155,83);
    fill(cV);
    text('Voice & Accountability', width-155,98);
    
    
    // timeline
    fill(200);
    stroke(200);
    strokeWeight(1.5);
    line(150,115,width-100,115);
    noStroke();
        
    textSize(7);
    textAlign(CENTER);
    text('1996',150,130);
    text('2014',((width-250)/9)*9+150,130);
    text('1998',((width-250)/9)+150,130);
    text('2000',((width-250)/9)*2+150,130);
    text('2002',((width-250)/9)*3+150,130);
    text('2004',((width-250)/9)*4+150,130);
    text('2006',((width-250)/9)*5+150,130);
    text('2008',((width-250)/9)*6+150,130);
    text('2010',((width-250)/9)*7+150,130);
    text('2012',((width-250)/9)*8+150,130);
    
    stroke(200);
    strokeWeight(1.5);
    line(150,115,150,120);
    line(width-100,115,width-100,120);
    strokeWeight(1);
    line((width-250)/9+150,115,(width-250)/9+150,120);
    line(((width-250)/9)*2+150,115,((width-250)/9)*2+150,120);
    line(((width-250)/9)*3+150,115,((width-250)/9)*3+150,120);
    line(((width-250)/9)*4+150,115,((width-250)/9)*4+150,120);
    line(((width-250)/9)*5+150,115,((width-250)/9)*5+150,120);
    line(((width-250)/9)*6+150,115,((width-250)/9)*6+150,120);
    line(((width-250)/9)*7+150,115,((width-250)/9)*7+150,120);
    line(((width-250)/9)*8+150,115,((width-250)/9)*8+150,120);
}

// Corruption Control and Axes
function showData(data) {
    var count = data.getRowCount();
    var rowHeight = 100;

    for (var i=0; i<count; i++) {
        // dividing line
        stroke(200);
        strokeWeight(2);
        line(50,rowHeight*(i+1)+hHeight,width-100,rowHeight*(i+1)+hHeight);
        
        // x axes
        stroke(150);
        strokeWeight(1);
        line(150,rowHeight*(i+1)-50+hHeight,width-100,rowHeight*(i+1)-50+hHeight);
        stroke(220);
        strokeWeight(.5);
        line(150,rowHeight*(i+1)-100/6+hHeight,width-100,rowHeight*(i+1)-100/6+hHeight);
        line(150,rowHeight*(i+1)-100/6*2+hHeight,width-100,rowHeight*(i+1)-100/6*2+hHeight);
        line(150,rowHeight*(i+1)-100/6*4+hHeight,width-100,rowHeight*(i+1)-100/6*4+hHeight);
        line(150,rowHeight*(i+1)-100/6*5+hHeight,width-100,rowHeight*(i+1)-100/6*5+hHeight);
        noStroke();
        fill(150);
        textSize(7);
        textAlign(RIGHT);
        text('0', 145, rowHeight*(i+1)-47.5+hHeight);
        textSize(5);
        fill(220);
        text('+2', 145, rowHeight*(i+1)-98/6*5+hHeight);
        text('+1', 145, rowHeight*(i+1)-98/6*4+hHeight);
        text('-1', 145, rowHeight*(i+1)-98/6*2+hHeight);
        text('-2', 145, rowHeight*(i+1)-98/6+hHeight);
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
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1)+hHeight, rowHeight*(i+1)-100+hHeight));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
        
        // country names
        noStroke();
        fill(0);
        textAlign(RIGHT);
        textStyle(BOLD);
        textSize(10);
        text(country, 130, rowHeight*(i+1)-47.5+hHeight)
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
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1)+hHeight, rowHeight*(i+1)-100+hHeight));
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
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1)+hHeight, rowHeight*(i+1)-100+hHeight));
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
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1)+hHeight, rowHeight*(i+1)-100+hHeight));
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
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1)+hHeight, rowHeight*(i+1)-100+hHeight));
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
            vertex(map(col, 4, 19, 150, width-100), map(val, minVal, maxVal, rowHeight*(i+1)+hHeight, rowHeight*(i+1)-100+hHeight));
            // vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
        }
        endShape();
    }
    console.log("minimum: " + minVal + " | maximum: " + maxVal);
}