function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(10);
}

function draw() {

  var g = random(0,200);
  var b = random(200,256);
  fill(0, g, b);
  textSize(250);
  text('P5', mouseX, mouseY);

}
