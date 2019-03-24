import {Component, Input, OnInit, OnChanges} from '@angular/core';
import * as shape from 'd3-shape';
import {Project} from '../../shared/_models/Project';
import {Building} from '../../shared/_models/Building';
import {Floor} from '../../shared/_models/Floor';
import {Corridor} from '../../shared/_models/Corridor';
import {Zone} from '../../shared/_models/Zone';
import {Sensor} from '../../shared/_models/Sensor';
import {Actuator} from '../../shared/_models/Actuator';
import {Room} from '../../shared/_models/Room';
import {ColorHelper} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-graph-spec',
  templateUrl: './graph-spec.component.html',
  styleUrls: ['./graph-spec.component.scss']
})
export class GraphSpecComponent implements OnInit, OnChanges {
  @Input()
  private project: Project;

  @Input()
  private refreshGraph: boolean;


  public chartNames: string[];
  public colors: ColorHelper;
  public colorScheme = { domain: ['#5D6D7E', '#AAB7B8    ', '#CD6155', '#A9DFBF  ', '#CD6155', '#4D5656', '#CD6155', '#CD6155', '#1ABC9C'] }; // Custom color scheme in hex


  hierarchialGraph = {nodes: [], links: []};
  curve = shape.curveBundle.beta(1);

  public ngOnInit(): void {
    this.chartNames = [];
    this.chartNames.push("Project", "Building", "Floor", "Space", "Corridor", "Room", "Actuator", "Sensor");

    this.colors = new ColorHelper(this.colorScheme, 'ordinal', this.chartNames, this.colorScheme);;
    const tuple = this.generateGraph(this.project);

    this.hierarchialGraph.nodes = tuple[0];
    this.hierarchialGraph.links = tuple[1];
  }

  public ngOnChanges(){
    const tuple = this.generateGraph(this.project);

    this.hierarchialGraph.nodes = tuple[0];
    this.hierarchialGraph.links = tuple[1];
  }

  generateGraph(project: Project) : [any, any]{

    let nodes = [];
    let links = [];

    const root = {};
    root['id'] = 'start';
    root['label'] = project.projectName;
    root['color'] = "#2E4053";

    nodes.push(root);

    if(!project.buildings) return [nodes, links];

    for(const index in project.buildings) {
      const building = project.buildings[index];
      const tuple = this.generateBuildingNodeAndLinks(building);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }

    return [nodes, links];
  }

  generateBuildingNodeAndLinks(building: Building): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: 'Building' + building.id , label: building.type, color: '#CD6155'});
    links.push({source: 'start', target: 'Building' + building.id  , label: ''});

    if(!building.floors) return [nodes, links];

    for(const index in building.floors) {
      const floor = building.floors[index];
      const tuple = this.generateFloorNodeAndLinks(floor, building.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }

    return [nodes, links];
  }

  generateFloorNodeAndLinks(floor: Floor, idBuilding: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: 'Floor' + floor.id, label: 'Floor ' + floor.floorNumber, color: '#0E6655'});
    links.push({source: 'Building' + idBuilding, target: 'Floor' + floor.id, label: ''});

    if (!floor.corridors) return [nodes, links];

    for (const index in floor.corridors) {
      const corridor = floor.corridors[index];
      const tuple = this.generateCorridorNodeAndLinks(corridor, floor.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    if (!floor.zones) return [nodes, links];

    for (const index in floor.zones) {
      const zone = floor.zones[index];
      const tuple = this.generateZoneNodeAndLinks(zone, floor.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    return [nodes, links];
  }

  generateCorridorNodeAndLinks(corridor: Corridor, idFloor: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Corridor' + corridor.id , label: '' + corridor.name, color: '#154360'});

    links.push({source: 'Floor' + idFloor , target: 'Corridor' + corridor.id , label: ''});

    if (!corridor.sensors) return [nodes, links];

    for (const index in corridor.sensors) {
      const sensor = corridor.sensors[index];
      const tuple = this.generateSensorNodeAndLinks(sensor, corridor.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }

    if (!corridor.actuators) return [nodes, links];

    for (const index in corridor.actuators) {
      const actuator = corridor.actuators[index];
      const tuple = this.generateActuatorNodeAndLinks(actuator, corridor.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    return [nodes, links];
  }

  generateSensorNodeAndLinks(sensor: Sensor, idCorridor: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Sensor' + sensor.id , label: sensor.name + ' ' + sensor.model, color: '#7FB3D5'});

    links.push({source: 'Corridor' + idCorridor , target: 'Sensor' + sensor.id  , label: ''});

    return [nodes, links];
  }
  generateActuatorNodeAndLinks(actuator: Actuator, idCorridor: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Actuator' + actuator.id , label:  actuator.name + ' ' + actuator.model, color: '#A2D9CE'});

    links.push({source: 'Corridor' + idCorridor , target: 'Actuator' + actuator.id  , label: ''});

    return [nodes, links];
  }

  generateZoneNodeAndLinks(zone: Zone, idFloor: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Zone' + zone.id , label: zone.name, color: '#5D6D7E'});
    links.push({source: 'Floor' + idFloor , target: 'Zone' + zone.id , label: ''});


    if (!zone.rooms) return [nodes, links];

    for (const index in zone.rooms) {
      const room = zone.rooms[index];
      const tuple = this.generateRoomNodeAndLinks(room, zone.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }

    if (!zone.corridors) return [nodes, links];

    for (const index in zone.corridors) {
      const corridor = zone.corridors[index];
      const tuple = this.generateCorridorZoneNodeAndLinks(corridor, zone.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    return [nodes, links];
  }

  generateCorridorZoneNodeAndLinks(corridor: Corridor, idZone: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Corridor' + corridor.id , label: 'Corridor ' + corridor.name, color: '#154360'});
    links.push({source: 'Zone' + idZone , target: 'Corridor' + corridor.id  , label: ''});


    return [nodes, links];
  }

  generateRoomNodeAndLinks(room: Room, idZone: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Room' + room.id , label: room.type, color: '#95A5A6'});
    links.push({source: 'Zone' + idZone , target: 'Room' + room.id  , label: ''});


    if (!room.actuators) return [nodes, links];

    for (const index in room.actuators) {
      const actuator = room.actuators[index];
      const tuple = this.generateActuatorRoomNodeAndLinks(actuator, room.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }

    if (!room.sensors) return [nodes, links];

    for (const index in room.sensors) {
      const sensor = room.sensors[index];
      const tuple = this.generateSensorRoomNodeAndLinks(sensor, room.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    return [nodes, links];
  }

  generateActuatorRoomNodeAndLinks(actuator: Actuator, idRoom: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: 'Actuator' + actuator.id, label: actuator.model + ' ' + actuator.name, color: '#A2D9CE'});
    links.push({source: 'Room' + idRoom, target: 'Actuator' + actuator.id , label: ''});

    return [nodes, links];
  }

  generateSensorRoomNodeAndLinks(sensor: Sensor, idRoom: number): [any, any] {
    let nodes = [];
    let links = [];


    nodes.push({id: 'Sensor' + sensor.id, label: sensor.model + ' ' + sensor.name, color: '#7FB3D5'});

    links.push({source: 'Room' + idRoom, target: 'Sensor' + sensor.id, label: ''});

    return [nodes, links];
  }
}
