var rs, input;

function setup() {
    noCanvas();
     rs = RiString('Hi');
     input = createInput();
    //  callback function rita as soon as inout is changed
     input.changed(rita);
}

function rita() {
    var str = input.value();
    rs = RiString(str);
    var words = rs.words();
    var pos = rs.pos();
    
    console.log(pos);
    
    for (var i=0; i < words.length; i++) {
        var span = createSpan(words[i]);
        if (pos[i] === 'nn') {
            span.style('background-color', 'orange');
        }
    }
}