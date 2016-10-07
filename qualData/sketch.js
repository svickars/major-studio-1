var cAlpha = .7;
var cF = 'rgba(66,173,73,'+ cAlpha +')';
var cNF = 'rgba(255,0,0,'+ cAlpha +')';
var cPF = 'rgba(19,116,147,'+ cAlpha +')';

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    textAlign(CENTER,CENTER);
    loadTable('dataSources/freedom2016.tsv', 'tsv', 'header', showData);
}

function draw() {
    // header
    push();
    fill(76,76,76);
    noStroke();
    rect(0,0,width,150);
    fill(255);
    textFont('Noto Serif');
    textSize(42);
    text('Freedom in the World', width/2, 50);
    pop();
}

function showData(data) {
    var count = data.getRowCount();
    console.log(count);
    
    for(var i=0; i<count; i++){
        var cName = data.getString(i,0);
        var cStatus = data.getString(i,4);
        var cLat = data.getNum(i,5);
        var cLng = data.getNum(i,6);
        var cSize = data.getNum(i,7);
        var cPop = data.getNum(i,8);
        var cStatusColour = cF;
        console.log(cName+' ('+cStatus+') '+cLat+','+cLng+'  '+cSize);
        
        if(cStatus == 'Free') {
            var cColour = cF;
        }else{
            if(cStatus == 'Not Free') {
                var cColour = cNF;
            }else{
                var cColour = cPF;
            }
        }
        
        fill(cColour);
        textSize(((4*cSize)/500000)+5);
        
        // textSize(((4*cSize)/500000)+5);
        txt = createDiv(text(cStatus.toUpperCase(),(cLng*2)+(width/2),(cLat*-2)+(height/2)));
        txt.class("countries");
        txt.style("font-family", '"Noto Sans", sans-serif')
    }
}

function hoverIn() {
    fill(0);
    stroke(0);
    rect(mouseX,mouseY,100,100);
}