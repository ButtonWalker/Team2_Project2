function buildCharts(sample) {
  d3.json("../Team2_Project2/resources/alldata.JSON", function(data) {
    console.log("bubbledata", data);
    const otu_ids = data.otu_ids;
    const otu_labels = data.otu_labels;
    const sample_values = data.sample_values;

    // Build a Bubble Chart
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "City Zipcodes" }
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.plot("bubble", bubbleData, bubbleLayout);

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selCityname");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
  });
}

function getcityData(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
}

// Initialize the dashboard
init();
