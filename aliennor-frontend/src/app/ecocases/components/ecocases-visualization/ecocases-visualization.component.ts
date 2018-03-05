import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EcocasesService } from '../../services/ecocases.service';
import { map } from 'rxjs/operators';
import { min } from 'rxjs/operator/min';
import { Router } from '@angular/router';
import { urls } from './urls';

@Component({
  selector: 'app-ecocases-visualization',
  templateUrl: './ecocases-visualization.component.html',
  styleUrls: ['./ecocases-visualization.component.scss']
})
export class EcocasesVisualizationComponent implements OnInit {
  public ecocases: any[];
  public esmsWeights: any[];
  public associated_esms: any[];
  public width;
  public height;
  public d3TaggedEcocaseESMs: {"nodes": any[], "links": any[]};
  public d3UntaggedEcocaseESMs: {"nodes": any[], "links": any[]};
  public count_results: {
    esms: any,
    categories: any[]
  };
  vis; simulation;
  color;
  node; nodeText; link;
  width; height;
  constructor(
    private es: EcocasesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.width = document.getElementById("ecocaseESMsGraph").clientWidth;
    this.height = document.getElementById("ecocaseESMsGraph").clientHeight;
    this.es.getEcocases({})
      .pipe(
        map(res => {
          this.ecocases = res.data.ecocases;
          console.log('at ecocases-visualization ===> this.ecocases: ', this.ecocases);
        }))
      .subscribe();

    let str = []
    urls.forEach(function(item) {
      var line = [];
      item.categories.split(',').forEach(function(ctg) {
        line.push(item.name+'_'+ctg+'.png');
      })
      str.push(line.join(', '));
    })
    console.log(str.join('\r\n'));
  }

  clickEcocase(ecocase: any): any {
    console.log('at ecocases-visualization ===> clickEcocase');
    if ((ecocase.first_esm != null) || (ecocase.first_esm != null))
      this.es.getWeightESMsTaggedEcocase(ecocase.id)
        .pipe(
          map( res => {
            console.log('at ecocases-visualization ===> getWeightESMsTaggedEcocase => res: ', res);
            var obj = res.data.esms_weights;
            this.esmsWeights =  Object.keys(obj).map(key => obj[key]);
            this.d3TaggedEcocaseESMs = this.getD3TaggedEcocaseESMs(ecocase, this.esmsWeights, this.width, this.height);
            this.displayD3Graph(this.d3TaggedEcocaseESMs, 'ecocaseESMsGraph');
          }))
        .subscribe();
    else
      this.es.getAssociatedESMs(ecocase.id)
        .pipe(
          map(res => {
            console.log('at ecocases-visualization ===> getAssociatedESMs summary => res: ', res);
            var obj = res.data.associated_esms_summary;
            this.associated_esms =  Object.keys(obj).map(key => obj[key]);
            this.d3UntaggedEcocaseESMs =  this.getD3UntaggedEcocaseESMs(ecocase, this.associated_esms, this.width, this.height);
            this.displayD3Graph(this.d3UntaggedEcocaseESMs, 'ecocaseESMsGraph');
          }))
        .subscribe()
  };

  getD3TaggedEcocaseESMs(ecocase, esmsWeights, width, height) {
    var nodes = [], links = [];
    var radius = (width/2 > height/2) ? height/2 - 5 : width/2 - 5;

    nodes.push({"id": ecocase.id.toString(), "title": ecocase.title, "group": 1, "x": width/2, "y": height/2, "fx": width/2, "fy": height/2, "weight": 10});
    esmsWeights.forEach((esmweight, index) => {
      var angle =  (index / (esmsWeights.length/2)) * Math.PI;
      var x = (radius * Math.cos(angle)) + (width/2);
      var y = (radius * Math.sin(angle)) + (height/2);
      nodes.push({
        "id": esmweight.esm.id,
        "title": esmweight.esm.title.split(' ').slice(2).join(' '),
        "group": esmweight.esm.id + 1,
        "x": x, "y": y,
        "fx": x, "fy": y,
        "weight": esmweight.weight
      });
    });
    return {"nodes": nodes, "links": links};
  }

  getD3UntaggedEcocaseESMs(ecocase, associated_esms, width, height) {
    var nodes = [], links = [];
    var radius1 = (width/2 > height/2) ? height/2 - 55 : width/2 - 55;
    var radius2 = (width/2 > height/2) ? height/2 - 5 : width/2 - 5;

    nodes.push({"id": ecocase.id.toString(), "title": ecocase.title, "group": 1, "x": width/2, "y": height/2, "fx": width/2, "fy": height/2, "weight": 10});
    associated_esms.forEach((esm, index) => {
      var angle =  (index / (associated_esms.length/2)) * Math.PI;
      nodes.push({
        "id": esm.esm.id,
        "title": esm.esm.title.split(' ').slice(2).join(' '),
        "group": esm.esm.id + 1,
        "x": (radius1 * Math.cos(angle)) + (width/2),
        "y": (radius1 * Math.sin(angle)) + (height/2),
        "fx": (radius1 * Math.cos(angle)) + (width/2),
        "fy": (radius1 * Math.sin(angle)) + (height/2),
        "weight": (esm.first_esm_count == 0) ? 4 : 5 * esm.first_esm_count
      });
      nodes.push({
        "id": esm.esm.id+'b',
        "title": '',
        "group": esm.esm.id + 1,
        "x": (radius2 * Math.cos(angle)) + (width/2),
        "y": (radius2 * Math.sin(angle)) + (height/2),
        "fx": (radius2 * Math.cos(angle)) + (width/2),
        "fy": (radius2 * Math.sin(angle)) + (height/2),
        "weight": (esm.second_esm_count == 0) ? 4 : 5 * esm.second_esm_count
      });
    });
    return {"nodes": nodes, "links": links};
  }

  displayD3Graph(d3Data, graphDiv) {
    d3.select("#d3"+graphDiv).select("#idD3"+graphDiv).remove();
    this.vis = d3.select("#d3"+graphDiv)
      .classed("svg-container",true).append("svg:svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","-50 -70 800 500").classed("svg-content-responsive",true)
      .attr("id","idD3"+graphDiv).attr("width",this.width).attr("height",this.height).attr("pointer-events","all")

    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width/2, this.height/2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));

    this.render(d3Data);
  }

  ticked() {
    this.link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    this.node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

    this.nodeText.attr("x", function(d){ return d.x; })
      .attr("y", function (d) {return d.y - 10; });
  }

  render(graph){
    this.link = this.vis.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke", "red")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    this.node = this.vis.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", (d) => d.weight)
      .attr("fill", (d)=> { return this.color(d.group); })
      .call(d3.drag()
        .on("start", (d)=>{return this.dragstarted(d)})
        .on("drag", (d)=>{return this.dragged(d)})
        .on("end", (d)=>{return this.dragended(d)}))
      .on("click", (d) => {
        console.log(d);
        // if (d.group !== 1) this.router.navigate([`ecocases/detail/${d.id}`]);
      });

    this.nodeText = this.vis.selectAll(".nodeText")
      .data(graph.nodes)
      .enter()
      .append("text")
      .attr("dx",12).attr("dy",".35em")
      .text((d) => d.title.length > 30 ? d.title.substring(0, 30) + '...' : d.title)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", 15)
      .on("click", (d) => {
        console.log(d);
        // if (d.group !== 1) this.router.navigate([`ecocases/detail/${d.id}`]);
      });

    this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph.links);
  }

  dragstarted(d) {
    d.fx = null; d.fy = null;
  }

  dragged(d) {
    d.x = d3.event.x; d.y = d3.event.y;
  }

  dragended(d) {
    d.fx = d3.event.x; d.fy = d3.event.y;
  }
}
