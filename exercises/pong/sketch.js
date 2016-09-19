var score = 0;

// empty arrays
var x = [];
var y = [];
var xSpeed = [];
var ySpeed = [];

function setup() {
    createCanvas(500,500);
    rectMode(CENTER);
    textAlign(CENTER);
    
    for (var i=0; i < 10; i++) {
        // randomize position in two dimensions -> x and y variables
        x[i] = random(width);
        y[i] = random(height);
        // this makes random values between -2 and +2
        xSpeed[i] = random(-2,2);
        ySpeed[i] = random(-2,2);
        
    }
}

function draw() { // updates 60 times a second
    background('orange');
    fill(255);
    noStroke();
    // for loop to make multiple balls
    // init, test, update
    // ten balls, background will stop it from staying, run random in the setup
    for (var i=0; i < 10; i++) {
        // this makes it move
        x[i] += xSpeed[i];
        y[i] += ySpeed[i];
        ellipse(x[i],y[i],20,20)
        
        // if y position is less than 0 (beyond top), then take ySpeed and multiply by -1
        // || means or
        if (y[i] < 10) {
            ySpeed[i] *= -1; // ySpeed[i] = -ySpeed[i]
        }
        if (x[i] < 10 || x[i] > width - 10) {
            xSpeed[i] *= -1; // ySpeed[i] = -ySpeed[i]
        }
        // if ellipse X position minus X position of mouse (paddle) is less than the width of the paddle
        // absolute value to ignore the negative
        // && means and
        if (y[i] > height-65 && abs(x[i] - mouseX) < width/5/2){
            ySpeed[i] *= -1;
            score += 1;
        }
    }
    rect(mouseX,height-50,width/5,15,10);
    fill('orange');
    text(score,mouseX,height-46);
}