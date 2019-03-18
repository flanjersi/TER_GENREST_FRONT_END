import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Project} from '../../shared/_models/Project';

@Component({
  selector: 'app-tab-spec',
  templateUrl: './tab-spec.component.html',
  styleUrls: ['./tab-spec.component.scss']
})
export class TabSpecComponent implements OnInit, OnChanges {

  @Input()
  private project: Project;
  @Input()
  private specEntity: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {}


}
