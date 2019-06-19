function init() {
  var data = [{
    x: ['Dallas, TX', 'Jackson, MS', 'San Francisco, CA'],
    y: [1, 1, 1],
    text: [1, 1, 1],
    textposition: 'auto',
    type: "bar"
  }];

  var layout = {
    height: 400,
    width: 600
  };

  Plotly.plot("barchart", data, layout);
}

// Update the plot with new data
function updatePlotly(newdata) {
  var BARCHART = document.getElementById("barchart");
  Plotly.restyle(BARCHART, "y", [newdata]);
  Plotly.restyle(BARCHART, "text", [newdata]);
}

// Get new data whenever the dropdown selection changes
function getData(dataset) {
  var datause = [];
  d3.json("/resources/citydata.JSON", function(data) {
    console.log("newdata", data[dataset]);
    datause.push(data[dataset]['Dallas']);
    datause.push(data[dataset]['Jackson']);
    datause.push(data[dataset]['San Francisco']);
    updatePlotly(datause);
  });
}

init();
