import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';



@Component({
  selector: 'app-project-spec',
  templateUrl: './project-spec.component.html',
  styleUrls: ['./project-spec.component.scss']
})
export class ProjectSpecComponent implements OnInit {


  @Input()
  public datas: any;

  constructor() {

  }

  ngOnInit() {}


}
