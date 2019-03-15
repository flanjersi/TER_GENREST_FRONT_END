import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-spec',
  templateUrl: './project-spec.component.html',
  styleUrls: ['./project-spec.component.scss']
})
export class ProjectSpecComponent implements OnInit {
  @Output()
  datas: any;
  constructor() {

    this.datas = {
      name: 'Composant1',
      id: '1',
      latitude: '200',
      longitude: '300',
      type: 'Actuator',
      reference: 'Ref1',
      model: 'Model1'
    };
  }

  ngOnInit() {
  }

}
