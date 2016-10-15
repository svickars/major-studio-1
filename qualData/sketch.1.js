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

var span, nameSpan, latLngM, cSizeM, cSizeD, cSizeA;

function setup() {
    // noCanvas();
    createCanvas(windowWidth, windowHeight);
    background(255);
    textAlign(CENTER, CENTER);
    loadTable('dataSources/freedom2016.tsv', 'tsv', 'header', showData2016);
    rectMode(CENTER);
    
    latLngM = 2;
    cSizeM = 4;
    cSizeD = 500000;
    cSizeA = 5;
}

function showData2016(data) {
    var count = data.getRowCount();
    console.log(count);

    for (var i = 0; i < count; i++) {
        cStati.push(data.getString(i, 4));
        cNames.push(data.getString(i, 0));
        cLats.push(data.getNum(i, 5));
        cLngs.push(data.getNum(i, 6));
        cSizes.push(data.getNum(i, 7));
        cPops.push(data.getNum(i, 8));
    }
    
    for (var i=0; i < cStati.length; i++) {
       
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
        
        // if(mouseX > ((cLngs[i]*2)+(width/2))-5 && mouseX < ((cLngs[i]*2)+(width/2))+5 && mouseY > ((cLats[i]*-2)+(height/2)-5) && mouseY < ((cLats[i]*-2)+(height/2))+5){
        //      //do something
        //     fill(0);
        //     text(cNames[i],100,100);
        //     nameSpan.style("visibility", "visible");
        // }else{
        //     fill(cColour);
        // }
        noStroke();
        fill(cColour);
        ellipseMode(CENTER,CENTER);
        ellipse((cLngs[i]*2)+(width/2),(cLats[i]*-2)+(height/2),10);
        
        
        // textSize(((cSizeM * cSizes[i]) / cSizeD) + cSizeA);
        // fill(cColour);
        // textFont('Noto Sans');
        // sta = createSpan(text(cStati[i].toUpperCase(),(cLngs[i]*2)+(width/2),(cLats[i]*-2)+(height/2)));
        sta = createSpan(cStati[i]);
        sta.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
        sta.style("font-size", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
        sta.style("color", cColour);
        sta.style("font-family", "Noto Sans");
        sta.style("text-transform", "Uppercase");
        sta.style("line-height", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
        sta.style("cursor", "default");
        
        nameSpan = createSpan(cNames[i]);
        nameSpan.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
        nameSpan.style("font-family", "Noto Sans");
        nameSpan.style("background-color", cColour);
        nameSpan.style("color", "white");
        nameSpan.style("font-size", "12px");
        nameSpan.style("visibility", "hidden");
        nameSpan.style("cursor", "default");
        
    }
    
    for (var i=0; i<cStati.length; i++){
        sta.mouseOver(hoverIn);
        sta.mouseOut(hoverOut);
    }
}

function hoverIn() {
    // for (var i=0; i<cStati.length; i++) {
        nameSpan.style("visibility", "visible");
    // }
}

function hoverOut() {
        nameSpan.style("visibility", "hidden");
}