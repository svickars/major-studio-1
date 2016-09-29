function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}

function draw() {
    background(255);
    push();
    translate(100,200);
    rotate(radians(mouseX));
    rect(0, 0, 100, 100);
    pop();
    push();
    translate(100,200);
    rotate(radians(mouseY));
    rect(0, 0, 100, 100);
    pop();
    push();
    translate(300,200);
    rotate(radians(-mouseY));
    rect(0, 0, 100, 100);
    pop();
    translate(300,200);
    rotate(radians(-mouseX));
    scale(mouseX/100,mouseY/100);
    rect(0, 0, 100, 100);
}