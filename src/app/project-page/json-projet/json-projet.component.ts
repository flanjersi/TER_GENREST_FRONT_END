import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-json-projet',
  templateUrl: './json-projet.component.html',
  styleUrls: ['./json-projet.component.scss']
})
export class JsonProjetComponent{

  @Input()
  public datass: any;

 datas = 
  {
  "col1":{"@type": "bot:Building", "Attribute2": "value2", "Attribute3": "value3"},
  "col2":{"Attribute1": "value4", "Attribute2": "value5", "Attribute3": "value6"}, 
  "col3":{"Attribute1": "value7", "Attribute2": "value8", "Attribute3": "value9"} 
  };

  ddatas = {
    'simple key': 'simple value',
    'numbers': 1234567,
    'simple list': ['value1', 22222, 'value3'],
    'special value': undefined,
    'owner': null,
    'simple obect': {
      'simple key': 'simple value',
      'numbers': 1234567,
      'simple list': ['value1', 22222, 'value3'],
      'simple obect': {
        'key1': 'value1',
        'key2': 22222,
        'key3': 'value3'
      }
    }
  };
}
