// Create the tile layer that will be the background of our map
var streetmaps = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
// var layers = {
//   COMING_SOON: new L.LayerGroup(),
//   EMPTY: new L.LayerGroup(),
//   LOW: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   OUT_OF_ORDER: new L.LayerGroup()
// };

// Create the map with our layers
var map = L.map("map-id", {
  center: [32.7767, -96.7970],
  zoom: 12,
  // layers: [
  //   layers.COMING_SOON,
  //   layers.EMPTY,
  //   layers.LOW,
  //   layers.NORMAL,
  //   layers.OUT_OF_ORDER
  // ]
});

// Add our 'streetmaps' tile layer to the map
streetmaps.addTo(map);

//ADD location to Test Data
var dallasGeo = "full-data-geojson.js"

// Grab the data with d3
d3.json(dallasGeo, function(response) {

  // // Create a new marker cluster group
  var markers = L.marker();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].FeatureCollection;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }
  // Add our marker cluster layer to the map
  map.addLayer(markers);
});