var id;
var slider;

function setup() {
     id = select('#kafka');
    //  callback named click, function created below
     id.mousePressed(click);
     id.mouseReleased(release);
    //  attributes: min, max, [value], [step]
     slider = createSlider(0, windowWidth/2, 128);
     slider.position(windowWidth/2, windowHeight/2);
     slider.changed(change);
     id.position(slider.value() , windowHeight/2);
     noCanvas();
}

function click() {
    console.log('click');
    // attaching a CSS style tag to the id
    id.style('color', 'orange');
}

function release() {
    // attaching a CSS style tag to the id
    id.style('color', 'blue');
    // id.style('font-size', '90px');
}

function change() {
    id.position(slider.value() , windowHeight/2);
}