function setup() {
  createCanvas(windowWidth, windowHeight);
  // makes canvas the full size of the browser window
  loadTable('groceries.tsv', 'tsv', 'header', showData) 
  textAlign(CENTER);
}

function showData(data) {
  var count = data.getRowCount();
  var rowHeight = height/count;
  // this evens the row heights
  
  for (var i=0; i<count; i++) {
    var amount = data.getString(i, 0);
    var unit = data.getString(i, 1);
    var item = data.getString(i, 2);
    var source = data.getString(i, 3);
    
    if (source === 'market')
      fill(0, 255, 0);
    else {
      fill(128);
    }
    // if this had more than two lines, we would need curly brackets

    text(amount + '  ' + unit + '  ' + item + ' - ' + source, width/2, rowHeight * (i + 1));
  }
}
