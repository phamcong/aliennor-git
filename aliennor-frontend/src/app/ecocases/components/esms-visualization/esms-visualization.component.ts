import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { miserables } from './miserables';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EsmsService } from '../../../esms/services/esms.service';
import { EcocasesService } from '../../services/ecocases.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-esms-visualization',
  templateUrl: './esms-visualization.component.html',
  styleUrls: ['./esms-visualization.component.scss']
})

export class EsmsVisualizationComponent implements OnInit, AfterViewInit, OnDestroy {
  vis; simulation;
  color;
  node; nodeText; link;
  width; height;

  public esms: any[];
  public ecocases: any[];
  public d3ESMEcocases: {"nodes": any[], "links": any[]};
  constructor(
    private es: EcocasesService,
    private esmss: EsmsService,
    private router: Router
  ) { }


  ngOnInit() {
    this.width = document.getElementById("esmEcocasesGraph").clientWidth;
    this.height = document.getElementById("esmEcocasesGraph").clientHeight;
    this.esmss.getESMs()
      .pipe(
        map(res => {
          console.log('esmsssssssssssss:', res.data.esms);
          this.esms = res.data.esms;
          this.esmss.getEcocasesByESM(this.esms[0].id)
            .pipe(
              map(res => {
                console.log('esms-visualization => clickESM => res ', res);
                this.ecocases = res.data.ecocases;
                this.d3ESMEcocases = this.getD3ESMEcocases(this.esms[0], this.ecocases, this.width, this.height);
                console.log('esms-visualization => clickESM => d3ESMEcocases ', this.d3ESMEcocases);
                this.displayD3Graph(this.d3ESMEcocases, 'esmEcocasesGraph');
              }))
            .subscribe();
        }))
      .subscribe();
  }

  clickESM(esm: any): any {
    console.log('click ESM: ', esm);
    this.esmss.getEcocasesByESM(esm.id)
      .pipe(
        map(res => {
          console.log('esms-visualization => clickESM => res ', res);
          this.ecocases = res.data.ecocases;
          this.d3ESMEcocases = this.getD3ESMEcocases(esm, this.ecocases, this.width, this.height);
          console.log('esms-visualization => clickESM => d3ESMEcocases ', this.d3ESMEcocases);
          this.displayD3Graph(this.d3ESMEcocases, 'esmEcocasesGraph');
        }))
      .subscribe();
  }

  getD3ESMEcocases(esm, ecocases, width, height) {
    let nodes = [], links = [];
    nodes.push({"id": esm.id.toString(), "title": esm.title, "group": 1, "x": width/2, "y": height/2, "fx": width/2, "fy": height/2});
    ecocases.forEach((ecocase, index) => {
      nodes.push({
        "id": ecocase.id.toString(),
        "title": ecocase.title,
        "group": ecocase.is_first_esm ? 2 : 3,
        "x": ecocase.is_first_esm ? width/2+150 : width/2-150,
        "fx": ecocase.is_first_esm ? width/2+150 : width/2-150,
        "y": height - 100*index,
        "fy": height - 100*index
      });
      links.push({"source": esm.id, "target": ecocase.id, "value": 1});
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
      .attr("r", (d) => d.group == 1 ? 20 : 15)
      .attr("fill", (d)=> { return this.color(d.group); })
      .call(d3.drag()
        .on("start", (d)=>{return this.dragstarted(d)})
        .on("drag", (d)=>{return this.dragged(d)})
        .on("end", (d)=>{return this.dragended(d)}))
      .on("click", (d) => {
        console.log(d);
        if (d.group !== 1) this.router.navigate([`ecocases/detail/${d.id}`]);
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
        if (d.group !== 1) this.router.navigate([`ecocases/detail/${d.id}`]);
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
