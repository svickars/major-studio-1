// canvas 1
var c1 = function(p) {
    
    p.setup = function() {
        p.createCanvas(400, 300);
    }
    
    p.draw = function() {
        p.background(128,0,0);
        p.ellipse(canvas2.mouseX, canvas2.mouseY, 30, 30);
    }
};

// canvas 2
var c2 = function(p) {
    
    p.setup = function() {
        p.createCanvas(400, 300);
    }
    
    p.draw = function() {
        p.background(0,128,128);
        p.ellipse(canvas1.mouseX, canvas1.mouseY, 30, 30);
    }
    
    // p.mouseReleased = function() {
    //     p.rect(canvas1.mouseX, canvas2.mouseY, 50, 50);
    // }
    
};

// start canvases
var canvas1 = new p5(c1);
var canvas2 = new p5(c2);