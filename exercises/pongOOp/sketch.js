var score = 0;

var pongBalls = [];

function setup() {
    createCanvas(500,500);
    rectMode(CENTER);
    textAlign(CENTER);
    
    for (var i=0; i < 10; i++) {
        
        // add pong balls to the array
        // add instances of PongBall to the pongBalls[] array
        // what follows PongBall (random) is what is myX and myY
        pongBalls.push(new PongBall(random(30, width-30), random(30, height-80)));
        
    }
}

function draw() {
    for(var i = 0; i < pongBalls.length; i++) {
        pongBalls[i].update();
        pongBalls[i].display();
    }
//     background('orange');
//     fill(255);
//     noStroke();
//     // for loop to make multiple balls
//     // init, test, update
//     // ten balls, background will stop it from staying, run random in the setup
//     for (var i=0; i < 10; i++) {
//         // this makes it move
//         x[i] += xSpeed[i];
//         y[i] += ySpeed[i];
//         ellipse(x[i],y[i],20,20)
        
//         // if y position is less than 0 (beyond top), then take ySpeed and multiply by -1
//         // || means or
//         if (y[i] < 10) {
//             ySpeed[i] *= -1; // ySpeed[i] = -ySpeed[i]
//         }
//         if (x[i] < 10 || x[i] > width - 10) {
//             xSpeed[i] *= -1; // ySpeed[i] = -ySpeed[i]
//         }
//         // if ellipse X position minus X position of mouse (paddle) is less than the width of the paddle
//         // absolute value to ignore the negative
//         // && means and
//         if (y[i] > height-65 && abs(x[i] - mouseX) < width/5/2){
//             ySpeed[i] *= -1;
//             score += 1;
//         }
//     }
//     rect(mouseX,height-50,width/5,15,10);
//     fill('orange');
//     text(score,mouseX,height-46);
}

function PongBall(myX, myY) {
    // this makes it only available to this specific pong ball, bound to the object
    this.x = myX;
    this.y = myY;
    this.speedX = random(-10,10);
    this.speedY = random(-10,10);
    
    console.log(this.x + ' | ' + this.y);
    
    // only visible to each instance of this object (by using this)
    this.display = function() {
        // background(255);
        push();
        translate(this.x, this.y);
        // since we are moving the whole "piece of paper" we can draw the elipse at 0,0
        ellipse(0,0,15,15);
        pop();
    }
    
    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // left wall
        if (this.x <= 10)
            this.speedX *= -1;
            
        // top wall
        if (this.y <= 10)
            this.speedY *= -1;
        
        // right wall
        if (this.x >= width -10)
            this.speedX = -this.speedX
        
    }
    
}