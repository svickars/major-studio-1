// sequence: top --> bottom, right --> left

// this is a gloabl array, definition for newShape. --- Do two arrays, one for x, one for y
var x = [];
var y = [];
// same kind of var, no given value, use comma
var cX, cY; // centroid x and y component
var a; // area of the polygon

function setup() {
    // default canvas is 100,100. (windowWidth, windowHeight makes canvas fill browser, no matter size)
    createCanvas(windowWidth,windowHeight);
    // background has to come after we create canvas, done once at very beginning
// background(150);
    // line needs two points: initial x,y and ending x,y (0,0 is upper left)
    // mouseX always contains the current horizontal position of the mouse, relative to (0, 0) of the canvas
    // don't forget semi-colon!
// line(0,0,mouseX,100); doesn't know where mouse is, so makes it 0
    // other way to place rectangle at centre of mouse
    rectMode(CENTER);
    fill(255,255,255,100);
}

function draw() {
    
    // how to erase trail and start again
    background(150);
    
    line(width/2,height/2,mouseX,mouseY);
    text('(' + mouseX + ',' + mouseY + ')',mouseX,mouseY)
    
    // rectangle follows mouse - "mouseX-50" (subtract half of height and half of width) puts the rectangle at centre of mouse ---> use rectMode(CENTER) in function setup
    // fifth paramter adds a radius to the rectangle (20)
    rect(mouseX,mouseY,100,100,20);
    strokeWeight(2);
    
    // beginShape starts drawing a shape
    beginShape();
    // what does for loop need to know? Three pieces: init, test, update
    // init var i=o
    // test against x.length (array, at top, is empty, so length=0)
    // update with ++
    for(var i=0; i<x.length; i++) {
        // ten points made with an array and a variable - where does this go?
        vertex(x[i],y[i]);
        // this displays i (the number of the point), with the x (x[i]) and y (y[i]) coordinates of each point at those points
        // text(i + ' (' + x[i] + ',' + y[i] + ')', x[i], y[i]);
    }
    endShape(CLOSE);
    
    a = 0;
    cX = 0;
    cY = 0;
    
    // centroid formula
    // why is this in the draw function? Have the equation running while we are drawing... Change polygon, change centroid
    for(var i=0; i<x.length - 1; i++) {
        // enumerate, summation, += is an update and how we summate
        cX += (x[i] + x[i+1]) * (x[i] * y[i+1] - x[i+1] * y[i]);
        cY += (y[i] + y[i+1]) * (x[i] * y[i+1] - x[i+1] * y[i]);
        a += (x[i] * y[i+1] - x[i+1] * y[i]);
    }
    a = 0.5 * a;
    cX = cX / (6*a);
    cY = cY / (6*a);
    
    ellipse(cX,cY,5,5);
    text(cX + ", " +cY, cX + 10,cY+3);
}

// this function fires after the mouse has been released
// mouseReleased makes things happen once the mouse button is released. mouseClicked is the combination of pressing and releasing.
function mouseReleased() {
    // look this up in codecademy   
    // push to x array, mouseX = horizontal dimension
    // x.length limits array length to 10, meaning 10 vertices
    if (x.length < 10){
        x.push(mouseX);
        y.push(mouseY);
        // prints to console
        console.log(x);
    }
}