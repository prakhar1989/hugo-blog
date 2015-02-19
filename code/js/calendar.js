var cal = new Calendar();
var year = 2015, month = 2;

var table= d3.select('#calendar'),
    header = table.append('thead'),
    body = table.append('tbody');

header
    .append('tr')
    .append('td')
    .attr('colspan', 7)
    .style('text-align', 'center')
    .text(consts.monthNames[month])

header
    .append('tr')
    .selectAll('td')
    .data(consts.dayNames)
    .enter()
    .append('td')
    .style('text-align', 'center')
    .text(function(d) {
        return d;
    });


var weeks = cal.monthDays(year, month);
weeks.forEach(function(week) {
    body
        .append('tr')
        .selectAll('td')
        .data(week)
        .enter()
        .append('td')
        .attr('class', function (d) {
            return d > 0 ? '' : 'empty';
        })
        .text(function(d) {
            return d > 0 ? d : '';
        })
});
