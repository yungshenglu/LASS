var width = 900,
    height = 600,
    active = d3.select(null);

d3.select(window)
    .on("resize", sizeChange);

//set the projection of the map
var projection = d3.geo.mercator()
    .center([120.979531, 23.978567])
    .scale(7000);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

svg.append("rect")
    .attr('class', 'background')
    .attr('width', width)
    .attr('height', height)
    .on('click', zoom_reset);

var g = svg.append('g')
    .style('stroke-width', '0.5px');

var region = svg.append('g');

var tooltip = d3.select('body')
    .append('div')
    .attr('class', 'hidden tooltip');

//draw map with toopojson
d3.json('topojson/taiwan.json', function(error, taiwan) {
    if (error)
        return console.error(error);

    //display all regions.
    region.selectAll('path')
        .data(topojson.feature(taiwan, taiwan.objects.layer1).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'region')
        .on('click', zoom_in)
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svg.node()).map(function(d) {
                return parseInt(d);
            });
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
                .html(d.properties.COUNTYNAME);
        })
        .on('mouseout', function() {
            tooltip.classed('hidden', true);
        });

    region.append('path')
        .datum(topojson.mesh(taiwan, taiwan.objects.layer1, function(a, b) {
            return a !== b;
        }))
        .attr('d', path)
        .attr('class', 'mesh');
});

//click to zoom in
function zoom_in(d) {
    if (active.node() === this)
        return zoom_reset();

    active.classed('active', false);
    active = d3.select(this).classed('active', true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    region.transition()
        .duration(750)
        .style('stroke-width', 1.5 / scale + 'px')
        .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');
}

//click to reset zoom
function zoom_reset() {
    active.classed('active', false);
    active = d3.select(null);

    region.transition()
        .duration(750)
        .style('stroke-width', '1.5px')
        .attr('transform', '');
}

function sizeChange() {
    d3.select("g").attr("transform", "scale(" + $(".container-map").width() / 900 + ")");
    $("svg").height($(".container-map").width() * 0.618);
}