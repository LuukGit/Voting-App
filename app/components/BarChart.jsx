import React from "react";
var d3 = require("d3");

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = Math.min(700, document.getElementById("content").clientWidth) - margin.left - margin.right;
    var height = Math.min(400, document.getElementById("content").clientHeight) - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .domain(this.props.data.map(function(d) { return d.option }))
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .domain([0, d3.max(this.props.data, function(d) { return d.votes; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

    var yAxis = d3.svg.axis()
      .scale(y)
      .ticks(d3.max(this.props.data, function(d) { return d.votes; }))
      .orient("left");

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
        .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      svg.selectAll(".bar")
        .data(this.props.data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.option); })
          .attr("y", function(d) { return y(d.votes) - 5; })
          .attr("height", function(d) { return height - y(d.votes) + 5 ; })
          .attr("width", x.rangeBand());
    }

  render() {
    return(
      <div id="barChart">
        <div className="text-center">
          <div id="chart" />
        </div>
      </div>
    )
  }
}

module.exports = BarChart;
