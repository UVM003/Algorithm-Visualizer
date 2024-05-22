
import * as d3 from 'd3'
export function drawGraph(HuffmanTable) {
   
    var list = [].concat(HuffmanTable),
        tableSize = HuffmanTable.length;
        
    while (list.length > 1) {
        let y = list[0];
        list.shift()
        let  x = list[0];
        list.shift()
        let  obj = {
            'freq': parseInt(x.freq+ y.freq),
            'children': [x, y],
            'value':null,
            'code':null
        }
        list.push(obj);

        list.sort(function(a,b){return a.freq-b.freq;})
    }
    var margin = {
            top: 25,
            right: 5,
            bottom: 5,
            left: 5
        },
        width = (70* tableSize*2) - margin.right - margin.left,
        height = (70* tableSize*2) - margin.top - margin.bottom;

    var i = 0;
    var tree = d3.tree().size([width, height]);
    var diagonal = d3.linkVertical().x(function(d) { return (d.x/1.5); }).y(function(d) { return (d.y/1.5); });
    var svg = d3.select(".render").append("svg")
        .attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var root = list.pop();
    var hierarchyData = d3.hierarchy(root);
    var treeLayout = tree(hierarchyData);
    var nodes = treeLayout.descendants();
    var links = treeLayout.links();

    nodes.forEach(function(d) {
        d.y = d.depth * 140;
    });

    var gNode = svg.selectAll("g.node")
        .data(nodes, function(d) {
            return d.id || (d.id = ++i);
        });

    var nodeEnter = gNode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x/1.5 + "," + d.y/1.5 + ")";
        });

    var circle = nodeEnter.append("circle")
        .attr("r", 15)
        .style("fill", function(d) {
            return d.children || d.children ? '#FFE066' : '#fff';
        });

        circle.transition()
        .delay(function(d, i) {
            return i * 80;
        })
        .attr("r", 25)
        .style("fill", function(d, i) {
            return d.children || d.children ? '#FFE066' : '#fff';
        })
        .duration(1000)
        .ease(d3.easeElastic);

        var charText = nodeEnter.append('text')
        .attr('y', 5)
        .attr("text-anchor", "middle");

    charText.transition()
        .delay(function(d, i) {
            return i * 90;
        })
        .text(function(d) {
            return d.children ? d.data.freq : d.data.value;
        });
        
    var path = svg.selectAll("path.link")
        .data(links, function(d) {
            return d.target.id;
        });

    var pathT = path.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);
        
    
        pathT.transition()
        .delay(function(d, i) {
            return i * 85;
        })
        .attr("d", diagonal);
}

