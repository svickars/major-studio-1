var cnv;
var d;
var g;
function setup() {
  createCanvas(400, 400);
//   cnv.mouseOver(changeWeight);
  d = 10;
}

function draw() {
    strokeWeight(1);
    elps = ellipse(width/2, height/2, d, d);
    elps.mouseOver(changeWeight);
}

function changeWeight() {
  d = d + 10;
  if (d > 100) {
    d = 0;
  }
}