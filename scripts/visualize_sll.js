console.log("inside script");

var update = function(list) {

  var head = list.head;

  d3.select("svg").remove();

  var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = ((list._length+1) * 150) - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#svgContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
        //.attr("preserveAspectRatio", "xMinYMin meet")
        //.attr("viewBox", "0 0 960 1500"),
      g = svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  var rootBuilder = function(node) {
    if (!node.next) return { name : node.element || '', children : []};
    return {
      name : node.element,
      children: [rootBuilder(node.next)]
    }
  };

    if (!head) return;
    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(rootBuilder(head));
    // maps the node data to the tree layout
    nodes = treemap(nodes);

    svg.append('defs').append('marker')
        .attr('id','arrowhead')
        .attr('viewBox','-0 -5 10 10')
        .attr('refX',26)
        .attr('refY',-0.5)
        .attr("orient", "auto-start-reverse")
        .attr('markerWidth',10)
        .attr('markerHeight',10)
        .attr('xoverflow','visible')
        .append('svg:path')
        .attr("d", "M0,-5L10,0L0,5")
        .attr('fill', 'red')
        .style('stroke','none');


    // adds the links between the nodes
    var link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
      .enter().append("path")
        .attr("class", "link")
        .style( "stroke", "red" )
        .attr('marker-start','url(#arrowhead)')
        .attr("d", function(d) {
           return "M" + d.y + "," + d.x
             + "C" + (d.y + d.parent.y) / 2 + "," + d.x
             + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
             + " " + d.parent.y + "," + d.parent.x;
           });

    // adds each node as a group
    var node = g.selectAll(".node")
        .data(nodes.descendants())
      .enter().append("g")
        .attr("class", function(d) { 
          return "node" + 
            (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")"; });

    // adds the circle to the node
    node.append("circle")
      .attr("r", 30);

    // adds the text to the node
    node.append("text")
      .attr("dy", ".35em")
      .attr("x", function(d) { 0 })
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.name; })
      .attr('font-size', '20px');

}