var cAlpha = .7;
var cF = 'rgba(66,173,73,' + cAlpha + ')';
var cNF = 'rgba(255,0,0,' + cAlpha + ')';
var cPF = 'rgba(19,116,147,' + cAlpha + ')';

var latLngM;
var cSizeM;
var cSizeD;
var cSizeA;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    textAlign(CENTER, CENTER);
    loadTable('dataSources/freedom2016.tsv', 'tsv', 'header', showData2016);
    rectMode(CENTER);
    

    // y2016 = createDiv('2016');
    // y2016.position(200,100);
    // y2016.style("font-family","Noto Sans");
    // y2016.style("cursor","default");
    // y2016.mousePressed(showData2016);
    // y2015 = createDiv('2015');
    // y2015.position(100,100);
    // y2015.style("font-family","Noto Sans");
    // y2015.style("cursor","default");
    // y2015.mousePressed(showData2015);
    
    latLngM = 2;
    cSizeM = 4;
    cSizeD = 500000;
    cSizeA = 5;

    zoomIn = createButton("+");
    zoomIn.position(100,19);
    zoomIn.style("cursor","pointer");
    zoomIn.mousePressed(zoomInskies);
    
    zoomOut = createButton("-");
    zoomOut.position(75,19);
    zoomOut.style("cursor","pointer");
    zoomOut.mousePressed(zoomOutskies);
    
    // zoomOut = createButton("-");
    // zoomOut.position(36,19);
    // zoomOut.mousePressed(zO);
    
}

function zoomInskies() {
        latLngM = latLngM * 2;
        cSizeM = cSizeM * 2;
        cSizeD = cSizeD * 2;
        cSizeA = cSizeA * 2;
}

function zoomOutskies() {
        latLngM = latLngM / 2;
        cSizeM = cSizeM / 2;
        cSizeD = cSizeD / 2;
        cSizeA = cSizeA / 2;
}

function draw() {
    // header
    // push();
    // fill(76,76,76);
    // noStroke();
    // rect(0,0,width,150);
    // fill(255);
    // textFont('Noto Serif');
    // textSize(42);
    // text('Freedom in the World', width/2, 50);
    // pop();
}

function showData2016(data) {
    var count = data.getRowCount();
    console.log(count);

    for (var i = 0; i < count; i++) {
        var cName = data.getString(i, 0);
        var cStatus = data.getString(i, 4);
        var cLat = data.getNum(i, 5);
        var cLng = data.getNum(i, 6);
        var cSize = data.getNum(i, 7);
        var cPop = data.getNum(i, 8);
        var cStatusColour = cF;
        console.log(cName + ' (' + cStatus + ') ' + cLat + ',' + cLng + '  ' + cSize);

        if (cStatus == 'Free') {
            var cColour = cF;
        }
        else {
            if (cStatus == 'Not Free') {
                var cColour = cNF;
            }
            else {
                var cColour = cPF;
            }
        }

        fill(cColour);
        textSize(((4 * cSize) / 500000) + 5);
        // textFont('Roboto Condensed');

        // textSize(((4*cSize)/500000)+5);
        // txt = createDiv(text(cStatus.toUpperCase(),(cLng*2)+(width/2),(cLat*-2)+(height/2)));
        sta = createDiv(cStatus);
        sta.position((cLng * latLngM) + (width / 2) - textWidth(cStatus)/2, (cLat * -latLngM) + (height / 2) - (cSizeM*cSize/cSizeD)+cSizeA );
        sta.style("font-size", ((cSizeM * cSize) / cSizeD) + cSizeA + 'px');
        sta.style("color", cColour);
        sta.style("font-family", "Noto Sans");
        sta.style("text-transform", "Uppercase");
        sta.style("cursor","default");

        // textSize(24);
        // text(cName, 100, 100);
        
        cou = createDiv(cName);
        cou.position(mouseX,mouseY);
        cou.style("background",cColour);
        cou.style("cursor","default");
        cou.style("padding","5px");
        cou.style("color","#ffffff");
        cou.style("font-family","Noto Sans");
        cou.style("visibility","hidden");

        sta.mouseOver(hoverIn);
        sta.mouseOut(hoverOut);

        function hoverIn() {
            // fill(255);
            // rect(mouseX, mouseY, 100, 100);
            cou.position(mouseX,mouseY);
            cou.style("visibility","visible");
        }

        function hoverOut() {
            background(255);
            cou.style("visibility","hidden");
        }

    }
}