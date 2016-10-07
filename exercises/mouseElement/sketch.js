var test;
var shape1;
var slider;

function setup() {
    test = select('#kafka');
    shape1 = select('.shape');
    //  callback named click, function created below
    test.mouseOver(click);
    test.mouseOut(release);
    // shape1.mouseOver(shapeOver);
    // shape1.mouseOut(shapeOut);
    //  id.mousePressed(click);
    //  id.mouseReleased(release);
    //  attributes: min, max, [value], [step]
     slider = createSlider(0, windowWidth/2, 128);
     slider.position(windowWidth/2, windowHeight/2);
     slider.changed(change);
     test.position(slider.value() , windowHeight/2);
     createCanvas(windowWidth,windowHeight);
}

function draw() {
    noFill();
    strokeWeight(2);
    beginShape();
    vertex(30, 20);
    vertex(85, 20);
    endShape();
}


function click() {
    console.log('click');
    // attaching a CSS style tag to the id
    test.style('color', 'orange');
    rect(mouseX,mouseY,100,100);
}

function release() {
    // attaching a CSS style tag to the id
    test.style('color', 'black');
    // id.style('font-size', '90px');
    background(255);
}

function shapeOver() {
    strokeWeight(4);
}

function shapeOut() {
    strokeWeight(2);
}

function change() {
    test.position(slider.value() , windowHeight/2);
}