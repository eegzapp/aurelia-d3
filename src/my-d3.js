
import { bindable } from 'aurelia-framework';
import * as d3 from 'd3';

export class MyD3 {
  
  @bindable myData;

  constructor() {
    this.myData = "X";

    var root, svg, nodes, nodeSvg, linkSvg, nodeEnter, linkEnter, simulation;
  }

  /**
   * Run when the tag has finished loading
   */
  attached() {

    var width = 960,
        height = 600;
        
    this.root = d3.hierarchy(this.myData);

    var transform = d3.zoomIdentity;

    this.svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", this.zoomed.bind(this)))
      .append("g")
        .attr("transform", "translate(40,0)");

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", this.ticked.bind(this));

    this.update();

    /**
     * My code.
     * Draw a bar chart with the width of each bar set by each element passed in 
  
      select(this.thisChart) // grab the chart div
        .selectAll('div')  // select all div children (should be empty)
          .data(this.myData)  // associate data with the selection. This is weirdness. If there's 8 pieces of data in this.myData, then 8 enter() events will be registered
        .enter().append('div')  // handle the 8 enter events. In this case, we're appending a 'div' for each...
          .style('width', d => d*10+'px')  // Then setting it's style...
          .style('background-color', 'red')
          .text((elm) => elm);  // And width (because they're bars in a horizontal bar chart)
    */

      /**
       * Grabbed this bit of date/time d3 code from here: http://stackoverflow.com/questions/39366304/using-d3-js-with-aurelia-framework
      var formatMonth = timeFormat("%B"),
          formatDay = timeFormat("%A"),
          date = new Date(2014, 4, 1); 

          console.log(formatMonth(date)); // "May"
          console.log(formatDay(date)); // "Thursday"
      */
    }    

  zoomed() {
      this.svg.attr("transform", d3.event.transform);
    }

  ticked() {
    if (this.linkSvg)
    this.linkSvg
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    if (this.nodeSvg)
    this.nodeSvg
        .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
  }

  click (d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
      this.update();
      this.simulation.restart();
    } else {
      d.children = d._children;
      d._children = null;
      this.update();
      this.simulation.restart();
    }
  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart()
    //this.simulation.fix(d);
  }

  dragged(d) {
    //this.simulation.fix(d, d3.event.x, d3.event.y);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    //this.simulation.unfix(d);
  }

  update() {
    this.nodes = this.flatten(this.root);
    let links = this.root.links();

    this.linkSvg = this.svg.selectAll(".link")
      .data(links, function(d) { return d.target.id; })


    this.linkSvg.exit().remove();

    var linkEnter = this.linkSvg.enter()
        .append("line")
        .attr("class", "link");
    
    this.linkSvg = linkEnter.merge(this.linkSvg)
    

    this.nodeSvg = this.svg.selectAll(".node")
      .data(this.nodes, function(d) { return d.id; })

    this.nodeSvg.exit().remove();

    var nodeEnter = this.nodeSvg.enter()
      .append("g")
        .attr("class", "node")
        .on("click", this.click.bind(this))
        .call(d3.drag()
          .on("start", this.dragstarted.bind(this))
          .on("drag", this.dragged.bind(this))
          .on("end", this.dragended.bind(this)))

      nodeEnter.append("circle")
        .attr("r", 4  )
        .append("title")
          .text(function(d) { return d.data.name; })

      nodeEnter.append("text")
        .attr("dy", 3)
        .attr("x", function(d) { return d.children ? -8 : 8; })
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.data.name; });
    
    this.nodeSvg = nodeEnter.merge(this.nodeSvg);
    
      this.simulation
        .nodes(this.nodes);

      this.simulation.force("link")
        .links(links);

  }

  flatten (root) {
    // hierarchical data to flat data for force layout
    var nodes = [];
    function recurse(node, i) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      else ++i;
      nodes.push(node);
    }
    var i = 0;
    recurse(root, i);
    return nodes;
  }
}

