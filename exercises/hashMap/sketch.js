var hash = [];
var sorted = [];
var textX = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    loadStrings('poem.txt', callback);
}

function callback(poem) {
    console.log(poem);
    
    // go through all members of poem array
    for( var i in poem) {
        console.log(i + ' : ' + poem[i])
    }
    
    for (i in poem) {
        // split removes all the whitespace in between
        // each line is split into individual words
        var li = poem[i].split(' ');
        // now in line (ass opposed to whole poem)
        for (var k in li) {
            // remove special characters. li[k] means each word of each line. g means gloablly
            var clean = li[k].replace(/[.,-?!@#$%^&*()_~{}:;"']/g, '');
            
            // clean contains each word
            if (hash[clean] >= 1)
                hash[clean] += 1;
            else
                hash[clean] = 1;
        }
    }
    console.log('HASH ---------------');
    for (i in hash)
        console.log(i + ' : ' + hash[i]);
    
    console.log('HASH SORTED ---------------');
    
    for  (var key in hash) 
        sorted.push([key, hash[key]]);
    
    // compare function
    sorted.sort(function(a,b) {
        a = a[1];
        b = b[1];
        
        return a < b ? 1 : (a > b ? -1 : 0);
    });
    
    for(var i=0; i<sorted.length; i++)
        console.log(sorted[i][0] + ' : ' + sorted[i][1]);
}

function draw () {
    background(255);
    translate(textX, height/2);
    
    for(var i=0; i<sorted.length; i++){
        var txtSize = sorted[i][1] * 10;
        textSize(txtSize);
        text(sorted[i][0], 0, 0);
        
        var txtWidth = textWidth(sorted[i][0]);
        translate(txtWidth, 0);
        
        if (mouseIsPressed)
            line(0, txtSize * .25, 0, -txtSize * .75);
    }
}

function mouseDragged() {
    // current mouseX minus previouse mouseX
    textX += mouseX - pmouseX;
}