import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-json-projet',
  templateUrl: './json-projet.component.html',
  styleUrls: ['./json-projet.component.scss']
})
export class JsonProjetComponent{

  @Input()
  public datas: any;


}
