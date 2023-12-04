var height = 750,
    width = 1000,
    curve_width = 20,
    entry_width = (width - 10 * curve_width) / 11;

var svg = d3.select("div").append("svg")
    .attr("height", height)
    .attr("width", width);

var rounds = [32, 16, 8, 4, 2, 1];

// Start drawing left side

var i;

rounds.forEach(function (d, j) {
    var entry_height = height / d;
    if (j > 0) {
        for (i = 0; i < rounds[j - 1]; i++) {
            var x = entry_width * j + (j - 1) * curve_width;
            var y = (i + 0.5) * (entry_height / 2);
            var a = i % 2 == 0 ? 0.25 : -0.25;
            svg.append("path").attr("d", "M" + x + " " + y + "c10,0 10," + a * entry_height + " 20," + a * entry_height).attr("stroke", "black").attr("stroke-width", 3);
        }
    }
    for (i = 0; i < d; i++) {
        var x = (entry_width + curve_width) * j;
        var y = (i + 0.5) * entry_height;
        svg.append("path").attr("d", "M" + x + " " + y + " l " + entry_width + " 0").attr("stroke", "black").attr("stroke-width", 3);
    }
});

var right = svg.append("g").attr("transform", "translate(" + width + ",0) scale(-1,1)");

rounds.forEach(function (d, j) {
    var entry_height = height / d;
    if (j > 0) {
        for (i = 0; i < rounds[j - 1]; i++) {
            var x = entry_width * j + (j - 1) * curve_width;
            var y = (i + 0.5) * (entry_height / 2);
            var a = i % 2 == 0 ? 0.25 : -0.25;
            right.append("path").attr("d", "M" + x + " " + y + "c10,0 10," + a * entry_height + " 20," + a * entry_height).attr("stroke", "black").attr("stroke-width", 3);
        }
    }
    for (i = 0; i < d; i++) {
        var x = (entry_width + curve_width) * j;
        var y = (i + 0.5) * entry_height;
        right.append("path").attr("d", "M" + x + " " + y + " l " + entry_width + " 0").attr("stroke", "black").attr("stroke-width", 3);
    }
});
