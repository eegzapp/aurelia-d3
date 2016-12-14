
import { BindingEngine, inject, bindable } from 'aurelia-framework';
import * as d3 from 'd3';

@inject(BindingEngine)

export class MyD3 {
  
  @bindable myData;

  constructor(bindingEngine) {
    this.myData = null;
    this.bindingEngine = bindingEngine;

    var root, svg, nodes, nodeSvg, linkSvg, nodeEnter, linkEnter, simulation;

    this.subscription = this.bindingEngine.propertyObserver(this, 'myData').subscribe((newValue, oldValue) => {
        this.subscription.dispose();
        this.setupChart();
    });
  }



  /**
   * My code.
   * Draw a bar chart with the width of each bar set by each element passed in 

    setupChart() {
      select(this.thisChart) // grab the chart div
        .selectAll('div')  // select all div children (should be empty)
          .data(this.myData)  // associate data with the selection. This is weirdness. If there's 8 pieces of data in this.myData, then 8 enter() events will be registered
        .enter().append('div')  // handle the 8 enter events. In this case, we're appending a 'div' for each...
          .style('width', d => d*10+'px')  // Then setting it's style...
          .style('background-color', 'red')
          .text((elm) => elm);  // And width (because they're bars in a horizontal bar chart)
    }
  */


  /**
   * Run when the tag has finished loading
   * 
   * Creates a d3 interactive force-directed-graph.
   * Based on Mike Bostock's sample Block here: https://bl.ocks.org/mbostock/533daf20348023dfdd76
   * Had to update it for v3 of d3, put it into class structure for ES 2015 and made some modifications to make it fit into a single aurelia/bootstrap div.
   *
   * D3 Heirarchy docs are here: https://github.com/d3/d3-hierarchy/blob/master/README.md#tree 
   * They cover other kinds of heirarchies as well.  
   */
  setupChart() {

    // var width = 200;
    // var height = 300;

    this.root = d3.hierarchy(this.myData);

    var transform = d3.zoomIdentity;

    this.svg = d3.select(this.thisChart).append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      //.attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
      //.attr('preserveAspectRatio','xMinYMin')
      //.append("g")
      //.attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(100,50))
      .on("tick", this.ticked.bind(this));

    this.update();
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
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
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

