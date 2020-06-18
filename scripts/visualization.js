var d3Builder = function(head) {
  console.log(head);
  var rootBuilder = function(node) {
    if (!node.next) return { name : node.element || '', children : []};
    return {
      name : node.element,
      children: [rootBuilder(node.next)]
    }
  };  

  //const width = 600, height = 600;

  var root = d3.hierarchy(rootBuilder(head));
  console.log(root);
  //console.log(root.links());
  
  var treeLayout = d3.tree();
  treeLayout.size([400, 200]);
  treeLayout(root);

  console.log(root.descendants());
  console.log(root.links());

  d3.select('svg g.nodes')
    .selectAll('circle.node')
    .data(root.descendants())
    .enter()
    .append('circle')
    .classed('node', true)
    .attr('cx', function(d){return d.x;})
    .attr('cy', function(d){return d.y;})
    .attr('r', 25)
    .text(function(d) { return d.data.name; });

    //create text
    d3.select('svg g.nodes').selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('x', function (d) {
        return d.x;
    })
        .attr('y', function (d) {
        return d.y+5;
    })
        .text(function (d) {
        return d.data.name;
    })
        .attr('font-size', '20px');

  d3.select('svg g.links')
    .selectAll('line.link')
    .data(root.links())
    .enter()
    .append('line')
    .classed('link', true)
    .attr('x1', function(d){return d.source.x;})
    .attr('y1', function(d){return d.source.y;})
    .attr('x2', function(d){return d.target.x;})
    .attr('y2', function(d){return d.target.y;})

}

/* var d3Builder = function(head) {
  //root object is used to access the nodes as D3 objects.
  var buildRoot = function(node) {
    if (!node.next) return { data : node.data || '', children : []};
    return {
      data     : node.data,
      children : [buildRoot(node.next)]
    }
  };

  var buildD3 = function(head) {
    var width = 400,
        height = 600;

    var cluster = d3.cluster()
        .size([height, width - 160]);

    var root = d3.hierarchy(head, function(d) {
        if (!d.next) return { data : d.data || '', children : []};
        return d.next;
    });
    console.log("root: " + root)
    cluster(root);

    var svg = d3.select("#svg");

    console.log(svg.selectAll('path')
    .data( root.descendants().slice(1) ));

  // Add the links between nodes:
  svg.selectAll('path')
    .data( root.descendants().slice(1) )
    .enter()
    .append('path')
    .attr("d", function(d) {
        return "M" + d.y + "," + d.x
                + "C" + (d.parent.y + 50) + "," + d.x
                + " " + (d.parent.y + 150) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
                + " " + d.parent.y + "," + d.parent.x;
              })
    .style("fill", 'none')
    .attr("stroke", '#ccc')

    // Nodes
    d3.select('svg g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .attr('r', 25);

    var node = svg.selectAll(".node");
    node.append("text")
    .attr("dx", function(d) { return d.children ? -8 : 8; })
    .attr("dy", 3)
    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
    .text(function(d) { return d.data; });


  };

  //execution. biuldroot returns the root (to convert to D3 nodes, buildD3 takes the root and displays on page)
  //if   (head) buildD3(buildRoot(head));
  if   (head) buildD3(head);
  else d3.select("body").append("p").text(function(d) { return 'No nodes here!'; });
}; */