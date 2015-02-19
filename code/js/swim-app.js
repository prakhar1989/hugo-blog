var barData = _.map(_.range(20), function() {
    return _.random(10, 100);
});

var scatterData = _.map(_.range(25), function(){
   return {
       x: _.random(100),
       y: _.random(100),
       r: Math.round(5 + _.random(10))
   }
});

var margin = {top: 40, right: 20, bottom: 40, left: 40};
var width = 600 - margin.right - margin.left,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select('#chartArea')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// paints a bar chart for the provided data
var barChart = function(svg, data, width, height) {
    var xScale = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, width], 0.2, 0);

    var yScale = d3.scale.linear()
        .domain([0, 10 + d3.max(data)])
        .range([0, height]);

    var colorScale = d3.scale.quantize()
        .domain([0, d3.max(data)])
        .range(["green", "orange", "red"]);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d, i) {
            return xScale(d);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .attr('width', xScale.rangeBand())
        .attr("height", yScale)
        .attr('fill', colorScale);
};

// paints a scatter plot for the provided data
var scatterChart = function (svg, data, width, height) {
    var xScale = d3.scale.linear()
        .domain([0, 100])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, 100])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(8)
        .innerTickSize(4)
        .outerTickSize(1);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickSize(1);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(0,0)')
        .call(yAxis);

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'bubble')
        .attr('cx', function (d) {
            return xScale(d.x);
        })
        .attr('cy', function (d) {
            return yScale(d.y);
        })
        .attr('r', function (d) {
            return d.r;
        })
        .on('mouseover', function (d) {
           d3.select(this).classed('active', true);
        })
        .on('mouseout', function (d) {
            d3.select(this).classed('active', false);
        })
        .on('mousedown', function (d) {
            d3.select(this).attr('r', 2 * d.r);
        })
        .on('mouseup', function (d) {
            d3.select(this).attr('r', d.r);
        });
};

var xScale = d3.scale.linear()
    .domain([0, 100])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0]);

function steppedTransition(selection) {
    selection
        .transition()
        .duration(500)
        //.delay(function(d, i) { return i * 25; })
        .attr('cx', function (d) {
            return xScale(d.x);
        })
        .transition()
        .duration(500)
        .attr('cy', function (d) {
            return yScale(d.y);
        })
        .attr('r', function (d) {
            return d.r;
        });

}

function update() {
    svg.selectAll('circle')
        .filter(function (d) {
            return d.x < 50;
        })
        .each(newData)
        .call(steppedTransition);
}

function newData (datum) {
    datum.x = _.random(100);
    datum.y = _.random(100);
    datum.r = Math.round(5 + _.random(10));
}

//barChart(svg, barData, width, height);
scatterChart(svg, scatterData, width, height);
