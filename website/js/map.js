'use strict';
var position = [23.583, 120.583],
    minZoom =  7,
    defaultZoom = 8,
    maxZoom = 18,
    legendGrade = [0, 11, 23, 35, 41, 47, 53, 58, 64, 70],
    legendColor = ['#9CFF9C', '#31FF00', '#31CF00', '#FFFF00', '#FFCF00',
    '#FF9A00', '#FF6464', '#FF0000', '#990000', '#CE30FF'],
    factoryColor = '#888888';
var map,
    layerAirData;

function getLegendColor(aqi) {
    return aqi < 11 ? legendColor[0] :
        aqi < 23 ? legendColor[1] :
        aqi < 35 ? legendColor[2] :
        aqi < 41 ? legendColor[3] :
        aqi < 47 ? legendColor[4] :
        aqi < 53 ? legendColor[5] :
        aqi < 58 ? legendColor[6] :
        aqi < 64 ? legendColor[7] :
        aqi < 70 ? legendColor[8] :
        legendColor[9];
}

function renderAirData(data) {
    var opacity = 0.5,
        radiusCircle = 500,
        radiusCircleMarker = 1;
    var title,
        color,
        circle,
        circleMarker,
        strPopup;

    var I = data.length;
    for(var i = 0; i < I; i++) {
        title = data[i].device_id;
        color = getLegendColor(data[i].pollution);

        circle = L.circle([data[i].lat, data[i].lon], {
            color: color,
            fillColor: color,
            fillOpacity: opacity,
            radius: radiusCircle
        }).addTo(map);
        circleMarker = new L.CircleMarker([data[i].lat, data[i].lon], {
            color: color,
            fillColor: color,
            fillOpacity: opacity,
            radius: radiusCircleMarker
        });

/* Legend arguments */
var legend,
    legendLabel = [],
    legendGrade = [0, 11, 23, 35, 41, 47, 53, 58, 64, 70],
    legendColor = ['#9CFF9C', '#31FF00', '#31CF00', '#FFFF00', '#FFCF00', '#FF9A00', '#FF6464', '#FF0000', '#990000', '#CE30FF']

/* Data cirlce arguments */
var datacircles = [],
    circle,
    dataAlpha = 0.5,
    dataRadius = 500,
    circleMaker,
    markerAlpha = 0.55,
    markerRadius = 1;

/* Define color square of legend. */
function getLegendColor(d) {
    return d < 11 ? legendColor[0] :
        d < 23 ? legendColor[1] :
        d < 35 ? legendColor[2] :
        d < 41 ? legendColor[3] :
        d < 47 ? legendColor[4] :
        d < 53 ? legendColor[5] :
        d < 58 ? legendColor[6] :
        d < 64 ? legendColor[7] :
        d < 70 ? legendColor[8] :
        legendColor[9];

        strPopup = "SiteName: " + (i + 1).toString()
            + "<br /> Record timestamp : " + data[i].timestamp
            + "<br/> PM 2.5 : " + data[i].pollution
            + "<br /> ID: " + data[i].device_id;
        circle.bindPopup(strPopup);
        circleMarker.bindPopup(strPopup);
        layerAirData.addLayer(circleMarker);
    }
}

function createLegend() {
    var legendLabel = [];

    var legend = L.control({
        position: 'bottomright'
    });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend');

        div.innerHTML = '<i style="background: ' + factoryColor
            + ';">&nbsp;&nbsp;&nbsp;&nbsp;</i> factory<br/>';

        // Generate a label with a colored square for each interval.
        for (var i = 0; i < legendGrade.length; ++i) {
            legendLabel.push('<i style="background:'
                    + getLegendColor(legendGrade[i] + 1)
                    + ';">&nbsp;&nbsp;&nbsp;&nbsp;</i> '
                    + legendGrade[i]
                    + (legendGrade[i + 1] ? '&ndash;'+legendGrade[i + 1] : '+')
                    );
        }
        div.innerHTML += legendLabel.join('<br>');

        return div;
    };
    return legend;
}

// init map
(function() {
    var airData = [],
        search;

        if (0 <= data[i].pollution && data[i].pollution <= 11) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[0],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[0],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else if (11 < data[i].pollution && data[i].pollution <= 23) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[1],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[1],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else if (23 < data[i].pollution && data[i].pollution <= 35) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[2],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[2],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else if (35 < data[i].pollution && data[i].pollution <= 41) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[3],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[3],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else if (41 < data[i].pollution && data[i].pollution <= 47) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[4],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[4],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else if (47 < data[i].pollution && data[i].pollution <= 53) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[5],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[5],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else if (53 < data[i].pollution && data[i].pollution <= 58) {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[6],
                fillOpacity: dataAlpha,
                radius: dataRadius
            }).addTo(map);
            circleMaker = new L.CircleMarker([data[i].lat, data[i].lon], {
                title: title,
                color: legendColor[6],
                fillOpacity: markerAlpha,
                radius: markerRadius
            });
        } else {
            circle = L.circle([data[i].lat, data[i].lon], {
                color: legendColor[7],
                fillOpacity: dataAlpha,
                radius: dataRadius

    map = L.map('map').setView(position, defaultZoom);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: minZoom,
            maxZoom: maxZoom,
            continuousWorld: false,
            attribution: 'Map data &copy; OpenStreetMap contributors'
            }).addTo(map);

        circle.bindPopup("SiteName: " + data[i].number + "<br /> Record timestamp : " + data[i].timestamp + "<br/> PM 2.5 : " + data[i].pollution + "<br /> ID: " + data[i].device_id);
        circleMaker.bindPopup("SiteName: " + data[i].number + "<br /> Record timestamp : " + data[i].timestamp + "<br/> PM 2.5 : " + data[i].pollution + "<br /> ID: " + data[i].device_id).openPopup();
        layer_airbox.addLayer(circleMaker);
    }
}

/* Initialize map */
function initMap() {
    // Load CSV file. (path: ../LASS/data/csv/airbox.html)
    d3.csv('data/csv/airbox.csv', function(error, d) {
        if (error) throw error;

        data = d;
        //window.alert('Catch ' + data.length + ' points')

        // Initializa the map.
        map = L.map('map').setView(position, scale);

    layerAirData = new L.LayerGroup();
    map.addLayer(layerAirData);

    // load factories
    d3.csv('data/csv/factories.csv', function(error, data) {
        if(error) throw error;
        var color = factoryColor;
        var circle,
            strPopup;

        var I = data.length;
        for(var i = 0; i < I; i++) {
            circle = L.circle([data[i].latitude, data[i].longitude], {
                color: color,
                fillColor: color,
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);

            strPopup = "ID: " + data[i].id
                + "<br/> FactoryName: " + data[i].name
                + "<br/> Type: " + data[i].type;
            circle.bindPopup(strPopup);
        }
    });

    // load csv
    d3.csv('data/csv/lass.csv', function(error, data) {
        if(error) throw error;
        airData = airData.concat(data);
    });
    d3.csv('data/csv/airbox.csv', function(error, data) {
        if(error) throw error;
        airData = airData.concat(data);

        console.log('Number of data: ' + airData.length);
        // callback renderAirData
        renderAirData(airData);
    });

    // add sidebar
    L.control.sidebar('sidebar').addTo(map);

    // add legend
    createLegend().addTo(map);
    
    // add search
    search = new L.Control.Search({
        position: 'topright',
        layer: layerAirData,
        initial: false,
        zoom: 12,
        marker: false
    });
    map.addControl(search);
})();

