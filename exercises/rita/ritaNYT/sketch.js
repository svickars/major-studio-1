var url= 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
var apiKey = '&e70ffd56c35240dabd18df32632f31b1';
var input;
// create boolean to remove elements
var firstSearch = true;

var rs, snip;

function setup() {
    noCanvas();
    // select button by name we gave in index
    var button = select('#submit');
    // when button is pressed, run function searchArticles (callback)
    button.mousePressed(searchArticles);
    input = select('#search');
    console.log(input);
}

function searchArticles(){
    // input.value() steps into the input and pulls out the value
    var apiurl = url + input.value() + apiKey;
    loadJSON(apiurl, gotJSON);
}

function draw() {
  
}

function gotJSON(data) {
    // local variable (within the function)
        // stepping down through all data -> responses -> docs
    var articles = data.response.docs;
    
    if(firstSearch){
        // for (var i = 0; i<articles.length; i++){
        //     // local variable for headline
        //     var h = createElement('h1', articles[i].headline.main);
        //     // attach id to var h
        //     h.id('heading' + i);
        //     var p = createP(articles[i].snippet);
        //     p.id('description' + i);
        //     var ele = select('heading' + i);
        //     var para = select('description' + i);
        //     styleThis(ele, para);
        // }
        for (var i = 0; i<articles.length; i++){
            
            var rs = RiString(articles[i].headline.main);
            var words = rs.words();
            var pos = rs.pos();
            
            for (var j=0; j < words.length; j++) {
                var span = createSpan(words[j]);
                span.style('text-align', 'center');
                span.style('font-weight', 'bold');
                if (pos[j] === 'nnp' || pos[j] === 'nnps') {
                span.style('background-color', 'orange');
                }else{
                    if (pos[j] === 'fw') {
                        span.style('background-color', 'blue');
                    }else{
                        if(pos[j] === 'jj') {
                            span.style('background-color', '#ababab');
                        }else{
                            if(pos[j] === 'vbg') {
                                span.style('background-color', 'yellow');
                            }
                        }
                    }
                }
            }
            
            var h = createElement('h1', articles[i].headline.main);
            h.id('heading'+i);
            var ele = select('#heading'+i);
            
            var rs2 = RiString(articles[i].snippet);
            var words2 = rs2.words();
            var pos2 = rs2.pos();
            
            for (var j=0; j < words2.length; j++) {
                var span = createSpan(words2[j]);
                    span.style('color', '#888888');
                    span.style('font-size', '12pt');
                    span.style('padding-right', '.125em');
                    span.style('padding-left', '.125em');
                if (pos[j] === 'nnp') {
                span.style('background-color', 'orange');
                }else{
                    if (pos[j] === 'fw') {
                        span.style('background-color', 'blue');
                    }else{
                        if(pos[j] === 'jj') {
                            span.style('background-color', '#ababab');
                        }else{
                            if(pos[j] === 'vbg') {
                                span.style('background-color', 'yellow');
                            }
                        }
                    }
                }
            }

            var p = createP(articles[i].snippet);
            p.id('description'+i);
            styleThis(ele, p);
        }
    firstSearch = false;
    }else{
        // for (var i = 0; i<articles.length; i++){
        //     // create var for old shit
        //     var oldHeading = select('#heading' + i);
        //     oldHeading.remove();
        //     var oldDescription = select('#description' + i);
        //     oldDescription.remove();
        //     // local variable for headline
        //     var h = createElement('h1', articles[i].headline.main);
        //     // attach id to var h
        //     h.id('heading' + i);
        //     var p = createP(articles[i].snippet);
        //     p.id('description' + i);
        // }
        for (var i = 0; i<articles.length; i++){
            var oldHeading = select('#heading'+i);
            var oldDescription = select('#description'+i);
            oldHeading.remove();
            oldDescription.remove();
            
            var h = createElement('h1', articles[i].headline.main);
            h.id('heading'+i);
            var ele = select('#heading'+i);
            var p = createP(articles[i].snippet);
            p.id('description'+i);
            styleThis(ele, p);
        }
    }
    println(data);
    
}

function styleThis(ele, p){
    ele.style('color', 'blue');
    ele.style('font-family', 'sans-serif');
    ele.style('text-align', 'center');
    p.style('text-align', 'center');
}