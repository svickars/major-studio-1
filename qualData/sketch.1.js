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
var cOverviews = [];
var stas = [];
var nameSpans = [];
var stas2 = [];
var nameSpans2 = [];

var span2, sta2, span, sta, rs, input, nameSpan, latLngM, cSizeM, cSizeD, cSizeA;

function setup() {
    // rs = RiString('Hi');
    // input = createInput('Country');
    //  callback function rita as soon as input is changed
    // input.changed(rita);
    
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
        cOverviews.push(data.getString(i,9));
        
        // apply colour
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
        
        
        // console.log(cNames[i] + ':' + cStati[i] + '(' + cColour + ')');
        
        // sta = createSpan(text(cStati[i]),(cLngs[i] * latLngM) + (width / 2), (cLats[i] * -latLngM) + (height / 2));
        sta = createSpan(cStati[i]);
        sta.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
        sta.style("font-size", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
        sta.style("color", cColour);
        sta.style("font-family", "Noto Sans");
        sta.style("text-transform", "Uppercase");
        sta.style("line-height", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
        sta.style("cursor", "default");
        stas.push(sta);
        
        nameSpan = createSpan(cNames[i]);
        nameSpan.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
        nameSpan.style("font-family", "Noto Sans");
        nameSpan.style("background-color", cColour);
        nameSpan.style("color", "white");
        nameSpan.style("font-size", "12px");
        nameSpan.style("visibility", "hidden");
        nameSpan.style("cursor", "default");
        nameSpan.style("cursor", "default");
        nameSpans.push(nameSpan);
        
        stas[i].mouseOver(function hoverIn(){
            nameSpan.style("visibility","visible");
            nameSpan.position(mouseX,mouseY);
            // sta.style("color","black");
        });
        
        stas[i].mouseOut(function hoverOut(){
            nameSpan.style("visibility", "hidden");
            // sta.style("color",cColour);
        });
        
    }
    
    // for (var i = 1; i < 2; i++) {
    //     cStati.push(data.getString(i, 4));
    //     cNames.push(data.getString(i, 0));
    //     cLats.push(data.getNum(i, 5));
    //     cLngs.push(data.getNum(i, 6));
    //     cSizes.push(data.getNum(i, 7));
    //     cPops.push(data.getNum(i, 8));
    //     cOverviews.push(data.getString(i,9));
        
    //     // apply colour
    //     if (cStati[i] == 'Free') {
    //         var cColour = cF;
    //     }
    //     else {
    //         if (cStati[i] == 'Not Free') {
    //             var cColour = cNF;
    //         }
    //         else {
    //             var cColour = cPF;
    //         }
    //     }
        
        
    //     // console.log(cNames[i] + ':' + cStati[i] + '(' + cColour + ')');
        
    //     sta2 = createSpan(cStati[i]);
    //     sta2.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
    //     sta2.style("font-size", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
    //     sta2.style("color", cColour);
    //     sta2.style("font-family", "Noto Sans");
    //     sta2.style("text-transform", "Uppercase");
    //     sta2.style("line-height", ((cSizeM * cSizes[i]) / cSizeD) + cSizeA + 'px');
    //     sta2.style("cursor", "default");
    //     stas2.push(sta2);
        
    //     nameSpan2 = createSpan(cNames[i]);
    //     nameSpan2.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
    //     nameSpan2.style("font-family", "Noto Sans");
    //     nameSpan2.style("background-color", cColour);
    //     nameSpan2.style("color", "white");
    //     nameSpan2.style("font-size", "12px");
    //     nameSpan2.style("visibility", "hidden");
    //     nameSpan2.style("cursor", "default");
    //     nameSpan2.style("cursor", "default");
    //     nameSpans2.push(nameSpan2);
        
    //     sta2.mouseOver(function hoverIn2(){
    //         nameSpan2.style("visibility","visible");
    //         nameSpan2.position(mouseX,mouseY);
    //         // sta2.style("color","black");
    //     });
        
    //     sta2.mouseOut(function hoverOut(){
    //         nameSpan2.style("visibility", "hidden");
    //         // sta2.style("color",cColour);
    //     });
        
    // }
    
        console.log(cNames);
}

// function hoverIn() {
//         // for (var i=0; i<nameSpans.length; i++) {
//             nameSpans.style("visibility", "visible");
//             nameSpans.position(mouseX,mouseY);
//         // }
// }

// function hoverOut() {
//         // for (var i=0; i<nameSpans.length; i++) {
//             nameSpans.style("visibility", "hidden");
//         // }
// }

// function rita() {
//     // for (var k=0; k<cStati.length; k++){
//         var str = cOverviews;
//         rs = RiString(str);
//         var words = rs.words();
//         var pos = rs.pos();
        
//         console.log(pos);
        
//         console.log(cOverviews);
        
//         for (var i=0; i < words.length; i++) {
//             var span = createSpan(words[i]);
//             if (pos[i] === 'nn') {
//                 span.style('background-color', 'orange');
//             }
//         }
//     // }
// }