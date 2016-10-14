var cAlpha = .5;
var cF = 'rgba(66,173,73,' + cAlpha + ')';
var cNF = 'rgba(255,0,0,' + cAlpha + ')';
var cPF = 'rgba(19,116,147,' + cAlpha + ')';

var cStati = [];
var cNames = [];
var cLats = [];
var cLngs = [];
var cSizes = [];
var cPops = [];

var latLngM, cSizeM, cSizeD, cSizeA, cName;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    textAlign(CENTER, CENTER);
    loadTable('dataSources/freedom2016.tsv', 'tsv', 'header', showData2016);
    rectMode(CENTER);
    
    latLngM = 2;
    cSizeM = 4;
    cSizeD = 500000;
    cSizeA = 5;

    // zoomIn = createButton("+");
    // zoomIn.position(100,19);
    // zoomIn.style("cursor","pointer");
    // zoomIn.mousePressed(zoomInskies);
    
    // zoomOut = createButton("-");
    // zoomOut.position(75,19);
    // zoomOut.style("cursor","pointer");
    // zoomOut.mousePressed(zoomOutskies);
}

// function zoomInskies() {
//         latLngM = latLngM * 2;
//         cSizeM = cSizeM * 2;
//         cSizeD = cSizeD * 2;
//         cSizeA = cSizeA * 2;
// }

// function zoomOutskies() {
//         latLngM = latLngM / 2;
//         cSizeM = cSizeM / 2;
//         cSizeD = cSizeD / 2;
//         cSizeA = cSizeA / 2;
// }

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
        cStati.push(data.getString(i, 4));
        cNames.push(data.getString(i, 0));
        cLats.push(data.getString(i, 5));
        cLngs.push(data.getString(i, 6));
        cSizes.push(data.getString(i, 7));
        cPops.push(data.getString(i, 8));
        cName = data.getString(i, 0);
        var cStatus = data.getString(i, 4);
        var cLat = data.getNum(i, 5);
        var cLng = data.getNum(i, 6);
        var cSize = data.getNum(i, 7);
        var cPop = data.getNum(i, 8);
        var cStatusColour = cF;
        // console.log(cName + ' (' + cStatus + ') ' + cLat + ',' + cLng + '  ' + cSize);

        // if (cStatus == 'Free') {
        //     var cColour = cF;
        // }
        // else {
        //     if (cStatus == 'Not Free') {
        //         var cColour = cNF;
        //     }
        //     else {
        //         var cColour = cPF;
        //     }
        // }

        // fill(cColour);
        // textSize(((4 * cSize) / 500000) + 5);
        
        // textSize(((4*cSize)/500000)+5);
        // txt = createDiv(text(cStatus.toUpperCase(),(cLng*2)+(width/2),(cLat*-2)+(height/2)));
        
        // sta = createSpan(cStatus);
        // sta.position((cLng * latLngM) + (width / 2) - textWidth(cStatus)/2, (cLat * -latLngM) + (height / 2) - (cSizeM*cSize/cSizeD)+cSizeA );
        // sta.style("font-size", ((cSizeM * cSize) / cSizeD) + cSizeA + 'px');
        // sta.style("color", cColour);
        // sta.style("font-family", "Noto Sans");
        // sta.style("text-transform", "Uppercase");
        // sta.style("line-height", ((cSizeM * cSize) / cSizeD) + cSizeA + 'px');
        // sta.style("cursor", "default");
        
        // cou = createSpan(cName);
        // cou.position(100,100);
        // cou.style("background",cColour);
        // cou.style("cursor","default");
        // cou.style("padding","5px");
        // cou.style("color","#ffffff");
        // cou.style("font-family","Noto Sans");
        // cou.style("visibility","hidden");
        

        // sta.mouseOver(hoverIn);
        // sta.mouseOut(hoverOut);
        
        // if (mouseX >= (cLng * latLngM) + (width / 2) - textWidth(cStatus)/2 && mouseX <= (cLng * latLngM) + (width / 2) + textWidth(cStatus)/2 && mouseY >= (cLat * -latLngM) + (height / 2) - (cSizeM*cSize/cSizeD)+cSizeA && mouseY <= (cLat * -latLngM) + (height / 2) + (cSizeM*cSize/cSizeD)+cSizeA) {
        //     cou.position(mouseX,mouseY);
        //     cou.style("visibility", "visible");
        // }
        
    }
    
    for (var i=0; i < cStati.length; i++) {
        ellipseMode(CENTER);
        ellipse(cLngs[i]*latLngM+(width/2),cLats[i]*-latLngM+height/2,5);
        span = createSpan(cStati[i]);
        // span = createSpan(text(cStati[i].toUpperCase(),(cLngs[i]*2)+(width/2),(cLats[i]*-2)+(height/2)));
        span.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - ((cSizeM*cSizes[i]/cSizeD)+cSizeA)/2);
        span.style("font-size", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
        // span.style("text-align", "center");
        span.style("font-family", "Noto Sans");
        span.style("text-transform", "Uppercase");
        span.style("line-height", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
        span.style("cursor", "default");
        
        if (cStati[i] == 'Free') {
            var cColour = cF;
        }
        else {
            if (cStati[i] == 'Not Free') {
                var cColour = cNF;
            }
            else {
                var cColour = cPF;
            }
        }
        
        span.style("color", cColour);
        
        console.log(textWidth(span));
    }
    
    console.log(cStati);
    console.log(windowWidth+','+windowHeight);
}

function hoverIn() {
    cou.position(mouseX,mouseY);
    cou.style("visibility","visible");
}

function hoverOut() {
    cou.style("visibility","hidden");
}