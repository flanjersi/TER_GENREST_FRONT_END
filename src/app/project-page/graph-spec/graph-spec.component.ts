import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-graph-spec',
  templateUrl: './graph-spec.component.html',
  styleUrls: ['./graph-spec.component.scss']
})
export class GraphSpecComponent implements OnInit {
  name = 'Graph project specification for GenREST';
  hierarchialGraph = {nodes: [], links: []}
  curve = shape.curveBundle.beta(1);
  // curve = shape.curveLinear;

  public ngOnInit():void {
    this.showGraph();
  }

  showGraph() {
    this.hierarchialGraph.nodes = [
      {
        id: 'start',
        label: 'ProjectX'
      }, {
        id: '1',
        label: 'Building1'
      }, {
        id: '2',
        label: 'Building2'
      }, {
        id: '3',
        label: 'Floor1'
      }, {
        id: '4',
        label: 'Floor1'
      }, {
        id: '5',
        label: 'Room1'
      }, {
        id: '6',
        label: 'Floor2'
      }
    ];

    this.hierarchialGraph.links = [
      {
        source: 'start',
        target: '1',
        label: ''
      }, {
        source: 'start',
        target: '2',
        label: ''
      }, {
        source: '1',
        target: '3',
        label: ''
      }, {
        source: '2',
        target: '4',
        label: ''
      }, {
        source: '2',
        target: '6',
        label: ''
      }, {
        source: '3',
        target: '5'
      }
    ];

  }
}
