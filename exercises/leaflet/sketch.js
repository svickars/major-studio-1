var map;
var canvas;
var mags = [];
var quakes = [];
var slider;
var data;

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.parent('map');
    initLeaflet();
    loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv', parseSource, data);
    slider = createSlider(0,10,1);
    slider.position(width-400,25);
    slider.id('top');
}

function draw() {
    for (var i=1; i<data.length; i++) {
        quakes[i].setRadius(mags[i]);
    }
}

function parseSource(data) {
    // start at 1 to skip the header
    for (var i = 1; i<data.length; i++) {
        // split into columns
        var row = split(data[i], ',');
        // call on 4th column for mag
        mags[i] = row[4];
        // marker needs a lat/long (x, y array) from column 2 and 3 (1 and 2)
        quakes[i] = L.circleMarker([row[1], row[2]], {
           stroke: true,
           weight: 1,
           opacity: 0.3,
           fillOpacity: 0.8,
        //   fillColor: setColor(row[4])
        });
        
        var place = row[13];
        
        quakes[i]
            .addTo(map)
            .setRadius(mags[i])
            .bindPopup('<b>'+row[4]+'</b> magnitude '+place);
    }
}

function initLeaflet(){
    L.mapbox.accessToken = 'pk.eyJ1Ijoic3ZpY2thcnMiLCJhIjoiY2l1aW5saDhkMDAwMTNvbDdmcTlncnp1cyJ9.wIpJKF-DW1C2uPgKnUtNWg';
    // mapbox params = map, style // setView pararms = coords, zoom level
    map = L.mapbox.map('map', 'mapbox.light').setView([20, 0], 2)
    
    function onMapClick(e) {
        // no need but we need the function
    }
    
    map.on('click', onMapClick);
}