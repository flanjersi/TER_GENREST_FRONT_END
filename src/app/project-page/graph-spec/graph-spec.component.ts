import {Component, Input, OnInit, OnChanges} from '@angular/core';
import * as shape from 'd3-shape';
import {Project} from '../../shared/_models/Project';
import {Building} from '../../shared/_models/Building';
import {logging} from 'selenium-webdriver';
import {Floor} from '../../shared/_models/Floor';
import {Corridor} from '../../shared/_models/Corridor';
import {MotherRoom} from '../../shared/_models/MotherRoom';
import {Sensor} from '../../shared/_models/Sensor';
import {Actuator} from '../../shared/_models/Actuator';
import {Room} from '../../shared/_models/Room';

@Component({
  selector: 'app-graph-spec',
  templateUrl: './graph-spec.component.html',
  styleUrls: ['./graph-spec.component.scss']
})
export class GraphSpecComponent implements OnInit, OnChanges {
  @Input()
  private project: Project;


  hierarchialGraph = {nodes: [], links: []}
  curve = shape.curveBundle.beta(1);

  public ngOnInit(): void {

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

    nodes.push({id: building.id + '', label: building.type});
    links.push({source: 'start', target: building.id + '' , label: ''});

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

    nodes.push({id: floor.id + '', label: 'Floor ' + floor.floorNumber});
    links.push({source: idBuilding + '', target: floor.id + '', label: ''});

    if (!floor.corridors) return [nodes, links];

    for (const index in floor.corridors) {
      const corridor = floor.corridors[index];
      const tuple = this.generateCorridorNodeAndLinks(corridor, floor.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    if (!floor.motherRooms) return [nodes, links];
    for (const index in floor.motherRooms) {
      const motherRoom = floor.motherRooms[index];
      const tuple = this.generateMotherRoomNodeAndLinks(motherRoom, floor.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    return [nodes, links];
  }

  generateCorridorNodeAndLinks(corridor: Corridor, idFloor: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: corridor.id + '', label: 'Corridor ' + corridor.numberCorridor});
    links.push({source: idFloor + '', target: corridor.id + '', label: ''});

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

    nodes.push({id: sensor.id + '', label: 'Sensor ' + sensor.model});
    links.push({source: idCorridor + '', target: sensor.id + '' , label: ''});

    return [nodes, links];
  }
  generateActuatorNodeAndLinks(actuator: Actuator, idCorridor: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: actuator.id + '', label: 'Actuator ' + actuator.model});
    links.push({source: idCorridor + '', target: actuator.id + '' , label: ''});

    return [nodes, links];
  }

  generateMotherRoomNodeAndLinks(motherRoom: MotherRoom, idFloor: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: motherRoom.id + '', label: 'MotherRoom ' + motherRoom.numberMotherRoom});
    links.push({source: idFloor + '', target: motherRoom.id + '' , label: ''});

    if (!motherRoom.rooms) return [nodes, links];

    for (const index in motherRoom.rooms) {
      const room = motherRoom.rooms[index];
      const tuple = this.generateRoomNodeAndLinks(room, motherRoom.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }

    if (!motherRoom.corridors) return [nodes, links];

    for (const index in motherRoom.corridors) {
      const corridor = motherRoom.corridors[index];
      const tuple = this.generateCorridorMotherRoomNodeAndLinks(corridor, motherRoom.id);

      nodes = nodes.concat(tuple[0]);
      links = links.concat(tuple[1]);
    }
    return [nodes, links];
  }

  generateCorridorMotherRoomNodeAndLinks(corridor: Corridor, idMotherRoom: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: corridor.id + '', label: 'Corridor ' + corridor.numberCorridor});
    links.push({source: idMotherRoom + '', target: corridor.id + '' , label: ''});

    return [nodes, links];
  }

  generateRoomNodeAndLinks(room: Room, idMohetRoom: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: room.id + '', label: 'room ' + room.type});
    links.push({source: idMohetRoom + '', target: room.id + '' , label: ''});

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

    nodes.push({id: actuator.id + '', label: 'Corridor ' + actuator.model});
    links.push({source: idRoom + '', target: actuator.id + '' , label: ''});

    return [nodes, links];
  }

  generateSensorRoomNodeAndLinks(sensor: Sensor, idRoom: number): [any, any] {
    let nodes = [];
    let links = [];

    nodes.push({id: sensor.id + '', label: 'Sensor ' + sensor.model});
    links.push({source: idRoom + '', target: sensor.id + '' , label: ''});

    return [nodes, links];
  }
}
