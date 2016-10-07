var cAlpha = .7;
var cF = 'rgba(66,173,73,'+ cAlpha +')';
var cNF = 'rgba(255,0,0,'+ cAlpha +')';
var cPF = 'rgba(19,116,147,'+ cAlpha +')';

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(250,235,215);
    textAlign(CENTER,CENTER);
    loadTable('dataSources/freedom2016.tsv', 'tsv', 'header', showData);
}

function showData(data) {
    var count = data.getRowCount();
    console.log(count);
    
    for(var i=0; i<count; i++){
        var cName = data.getString(i,0);
        var cStatus = data.getString(i,4);
        var cLat = data.getNum(i,5);
        var cLng = data.getNum(i,6);
        var cSize = data.getNum(i,7);
        var cPop = data.getNum(i,8);
        var cStatusColour = cF;
        console.log(cName+' ('+cStatus+') '+cLat+','+cLng+'  '+cSize);
        
        if(cStatus == 'Free') {
            var cColour = cF;
        }else{
            if(cStatus == 'Not Free') {
                var cColour = cNF;
            }else{
                var cColour = cPF;
            }
        }
        
        fill(cColour);
        textFont('Noto Sans');
        textSize(((4*cSize)/500000)+5);
        text(cStatus.toUpperCase(),(cLng*2)+(width/2),(cLat*-2)+(height/2));
    }
}





// function callback(poem) {
//     console.log(poem);
    
//     // go through all members of poem array
//     for( var i in poem) {
//         console.log(i + ' : ' + poem[i])
//     }
    
//     for (i in poem) {
//         // split removes all the whitespace in between
//         // each line is split into individual words
//         var li = poem[i].split(' ');
//         // now in line (ass opposed to whole poem)
//         for (var k in li) {
//             // remove special characters. li[k] means each word of each line. g means gloablly
//             var clean = li[k].replace(/[.,-?!@#$%^&*()_~{}:;"']/g, '');
            
//             // clean contains each word
//             if (hash[clean] >= 1)
//                 hash[clean] += 1;
//             else
//                 hash[clean] = 1;
//         }
//     }
//     console.log('HASH ---------------');
//     for (i in hash)
//         console.log(i + ' : ' + hash[i]);
    
//     console.log('HASH SORTED ---------------');
    
//     for  (var key in hash) 
//         sorted.push([key, hash[key]]);
    
//     // compare function
//     sorted.sort(function(a,b) {
//         a = a[1];
//         b = b[1];
        
//         return a < b ? 1 : (a > b ? -1 : 0);
//     });
    
//     for(var i=0; i<sorted.length; i++)
//         console.log(sorted[i][0] + ' : ' + sorted[i][1]);
// }

// function draw () {
//     background(255);
//     translate(textX, height/2);
    
//     for(var i=0; i<sorted.length; i++){
//         var txtSize = sorted[i][1] * 10;
//         textSize(txtSize);
//         text(sorted[i][0], 0, 0);
        
//         var txtWidth = textWidth(sorted[i][0]);
//         translate(txtWidth, 0);
        
//         if (mouseIsPressed)
//             line(0, txtSize * .25, 0, -txtSize * .75);
//     }
// }

// function mouseDragged() {
//     // current mouseX minus previouse mouseX
//     textX += mouseX - pmouseX;
// }