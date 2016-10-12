var font;
var textString = 'Lorem ipsum dolor sit amet.';
function preload() {
   font = loadFont('./assets/Regular.otf');
};
function setup() {
   background(210);

   var bbox = font.textBounds(textString, 10, 30, 12);
   fill(255);
   stroke(0);
   rect(bbox.x, bbox.y, bbox.w, bbox.h);
   fill(0);
   noStroke();

   textFont(font);
   textSize(12);
   text(textString, 10, 30);
};