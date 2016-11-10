// function setup() {
//     textFont("PT Sans");
//     createCanvas(windowWidth, 150);
// }

function draw() {
    // timeline
    fill(200);
    stroke(200);
    strokeWeight(5);
    line(150,20,width-100,20);
    noStroke();
        
    textSize(7);
    textAlign(CENTER);
    text('1996',150,20);
    text('2014',((width-250)/18)*18+150,20);
}