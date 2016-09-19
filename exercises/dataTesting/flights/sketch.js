var table;
 
function preload() {
  table = loadTable("flights.csv","csv","header")
}

function setup() {
  createCanvas(600,300)
  noStroke()
  fill(0,0,255,10)
  background(255,255,255)
    var rows = table.getRows()
    for (var r = 0; r < rows.length; r++) {
        var from_long = rows[r].getNum("from_long")
        var from_lat = rows[r].getNum("from_lat")
        var x = map(from_long,-180,180,0,width)
        var y = map(from_lat,-90,90,height,0)
        ellipse(x,y,3,3)
    }
}