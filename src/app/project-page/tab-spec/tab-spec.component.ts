import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../shared/_models/Project';
import {MatTabGroup} from "@angular/material";

@Component({
  selector: 'app-tab-spec',
  templateUrl: './tab-spec.component.html',
  styleUrls: ['./tab-spec.component.scss']
})
export class TabSpecComponent implements OnInit, OnChanges {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  @Input()
  private project: Project;
  
  @Input()
  private specEntity: any;

  private refreshGraph: boolean;

  constructor() {
  }

  ngOnInit() {
  
  }

  ngOnChanges() {}

  selectedTabIndex(index){
    this.tabGroup.selectedIndex = index;
  }

  selectedTabChange(event){
    if(event.index === 0){
      this.refreshGraph = !this.refreshGraph;
    }
  }



}
