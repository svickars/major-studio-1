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

var latLngM, cSizeM, cSizeD, cSizeA;

var firstClick = true;

var params = {
    ignoreStopWords: true,
    ignoreCase: false,
    ignorePunctuation: true,
    wordsToIgnore: ['The', 'A', 'An', 'And', 'Of']
  };

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

function totalValues(obj) {
  var ritaTotal = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      ritaTotal += obj[k];
    }
  }
  return ritaTotal;
}

function showData2016(data) {
    var count = data.getRowCount();
    console.log(count);
    
    for (var i = 0; i < 1; i++) {
        cStati.push(data.getString(i, 4));
        cNames.push(data.getString(i, 0));
        cLats.push(data.getNum(i, 5));
        cLngs.push(data.getNum(i, 6));
        cSizes.push(data.getNum(i, 7));
        cPops.push(data.getNum(i, 8));
        cOverviews.push(data.getString(i,9).replace(/â€™/g, '\'').replace(/\\n \\n/g,' '));
        
        console.log(cOverviews[i]);
        
        var span, sta, nameSpan;
        
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
        
        nameSpan = createSpan(cNames[i]);
        nameSpan.position((cLngs[i] * latLngM) + (width / 2) - textWidth(cStati[i])/2, (cLats[i] * -latLngM) + (height / 2) - (cSizeM*cSizes[i]/cSizeD)+cSizeA/2 );
        nameSpan.style("font-family", "Noto Sans");
        nameSpan.style("background-color", cColour);
        nameSpan.style("color", "white");
        nameSpan.style("font-size", "12px");
        nameSpan.style("visibility", "hidden");
        nameSpan.style("cursor", "default");
        nameSpan.style("cursor", "default");
        
        var str = cOverviews[i];
        var rs = RiString(str);
        var words = rs.words();
        var pos = rs.pos();
        // 
        var ritaCounts = RiTa.concordance(str, params); 
        var ritaTotal = totalValues(ritaCounts);
        var ritaTags = RiTa.getPosTags(str);
        // 
        console.log(ritaCounts);
        console.log(ritaTags);
        
        sta.mouseOver(function hoverIn(){
            nameSpan.style("visibility","visible");
            nameSpan.position(mouseX,mouseY);
            // sta.style("color","black");
        });
        
        sta.mouseClicked(function click(){
            if(firstClick){
                for (var k in ritaCounts) {
                    if (ritaCounts.hasOwnProperty(k)) {
                        if (ritaCounts[k] / ritaTotal > 0.01) {
                            // fill(random(100));
                            textSize((ritaCounts[k] / ritaTotal) * 1000);
                            var span = createSpan(k);
                            span.id('span');
                            var oldSpan = select('#span');
                            span.position(random(width/5, width-(width/5)), random(height-250, height-100))
                            span.style('font-size',(ritaCounts[k] / ritaTotal) * 1000 + 'px');
                            span.style('opacity', '0.6');
                            
                            var ritaTag = RiTa.getPosTags(k);
                            if (ritaTag == 'nnp' || ritaTag == 'nnps'){
                                span.style('background-color', 'rgba(255,165,0,.35');
                            }
                            if (ritaTag == 'jj'){
                                span.style('background-color', 'rgba(30,144,255,.35)');
                            }
                            if (ritaTag == 'fw'){
                                span.style('background-color', 'rgba(34,139,34,.35)');
                            }
                            if (ritaTag == 'vb' || ritaTag == 'vbd' || ritaTag == 'vbg' || ritaTag == 'vbn' || ritaTag == 'vbp' || ritaTag == 'vbz'){
                                span.style('background-color', 'rgba(255,255,0,.35)');
                            }
                        }
                    }
                }
                firstClick = false;
            }else{
                for (var k in ritaCounts) {
                    if (ritaCounts.hasOwnProperty(k)) {
                        if (ritaCounts[k] / ritaTotal > 0.01) {
                            var oldSpan = select('#span');
                            oldSpan.remove();
                            console.log(oldSpan);
                            // fill(random(100));
                            textSize((ritaCounts[k] / ritaTotal) * 1000);
                            var span = createSpan(k);
                            span.id('span');
                            var oldSpan = select('#span');
                            span.position(random(width/5, width-(width/5)), random(height-250, height-100))
                            span.style('font-size',(ritaCounts[k] / ritaTotal) * 1000 + 'px');
                            span.style('opacity', '0.6');
                            
                            var ritaTag = RiTa.getPosTags(k);
                            if (ritaTag == 'nnp' || ritaTag == 'nnps'){
                                span.style('background-color', 'rgba(255,165,0,.35');
                            }
                            if (ritaTag == 'jj'){
                                span.style('background-color', 'rgba(30,144,255,.35)');
                            }
                            if (ritaTag == 'fw'){
                                span.style('background-color', 'rgba(34,139,34,.35)');
                            }
                            if (ritaTag == 'vb' || ritaTag == 'vbd' || ritaTag == 'vbg' || ritaTag == 'vbn' || ritaTag == 'vbp' || ritaTag == 'vbz'){
                                span.style('background-color', 'rgba(255,255,0,.35)');
                            }
                        }
                    }
                }
            }
        });
        
        sta.mouseOut(function hoverOut(){
            nameSpan.style("visibility", "hidden");
            // sta.style("color",cColour);
        });
    }
    
    
    
    console.log(cNames);
}