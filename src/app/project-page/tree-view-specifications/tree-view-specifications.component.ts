import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf, generate } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DataSource } from '@angular/cdk/table';
import { Project } from 'src/app/shared/_models/Project';
import { Building } from 'src/app/shared/_models/Building';
import { Floor } from 'src/app/shared/_models/Floor';
import { Corridor } from 'src/app/shared/_models/Corridor';
import { MotherRoom } from 'src/app/shared/_models/MotherRoom';
import { Room } from 'src/app/shared/_models/Room';
import { Sensor } from 'src/app/shared/_models/Sensor';
import { Actuator } from 'src/app/shared/_models/Actuator';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateBuildingEntityDialogComponent } from './create-building-entity-dialog/create-building-entity-dialog.component';
import { CreateFloorEntityDialogComponent } from './create-floor-entity-dialog/create-floor-entity-dialog.component'

/** File node data with possible child nodes. */
export interface FileNode {
  id: number;
  name: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */

export interface FlatTreeNode {
  id: number;
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-tree-view-specifications',
  templateUrl: './tree-view-specifications.component.html',
  styleUrls: ['./tree-view-specifications.component.scss']
})
export class TreeViewSpecificationsComponent implements OnInit, OnChanges {

  @Input()
  private project: Project;

  @Output() addedSpecification: EventEmitter<number>;
  

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.addedSpecification = new EventEmitter();
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
    console.log(this.project);
    this.dataSource.data = this.generateData(this.project);
  }

  ngOnChanges(){
    this.dataSource.data = this.generateData(this.project);    
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      id: node.id,
      name: node.name,
      type: node.type,
      level: level,
      expandable: !!node.children
    };
  }

  generateData(project: Project): any{

    const data = [];

    const buildings = [];

    if(!project.buildings) return data;

    for(let index in project.buildings){
      let building = this.generateBuilding(project.buildings[index]);
      buildings.push(building);
    }

    const root = {
      id: project.id,
      name: 'Buildings',
      type: 'interface',
      children: buildings
    };
    data.push(root);
    return data;
  }

  generateBuilding(building: Building) : any{  
    let buildingData = {};

    buildingData['id'] = building.id;
    buildingData['name'] = building.type;
    buildingData['type'] = 'building';

    const floors = [];

    if(building.floors){
      for(let index in building.floors){
        let floor = this.generateFloor(building.floors[index]);
        floors.push(floor);
      }
    }
    const floorInterfaceData = [{
      id: building.id,
      name: 'Floors',
      type: 'interface',
      children: floors
    }];
    buildingData['children'] = floorInterfaceData;
    return buildingData;
  }

  generateFloor(floor: Floor): any{
    let floorData = {};

    floorData['id'] = floor.id;
    floorData['name'] = 'Floor '+ floor.floorNumber;
    floorData['type'] = 'floor';

    const motherRooms = [];
    const corridors = [];

    if(floor.corridors){
      for(let index in floor.corridors){
        let corridor = this.generateCorridor(floor.corridors[index]);
        corridors.push(corridor);
      }
    }

    if(floor.motherRooms){
      for(let index in floor.motherRooms){
        let motherRoom = this.generateMotherRoom(floor.motherRooms[index]);
        motherRooms.push(motherRoom);
      }
    }
    
    const corridorInterfaceData = {
      id: floor.id,
      name: 'Corridors',
      type: 'interface',
      children: corridors
    };


    const motherRoomInterfaceData = {
      id: floor.id,
      name: 'Spaces',
      type: 'interface',
      children: motherRooms
    };

    floorData['children'] = [corridorInterfaceData, motherRoomInterfaceData];

    return floorData;

  }

  generateMotherRoom(motherRoom: MotherRoom): any{
    
    let motherRoomsData = {};


    
    motherRoomsData['id'] = motherRoom.id;
    motherRoomsData['name'] = motherRoom.type;
    motherRoomsData['type'] = 'motherRoom';

    const roomsTab = [];
    const corridors = [];

    if(motherRoom.corridors){
      for(let index in motherRoom.corridors){
        let corridor = this.generateCorridor(motherRoom.corridors[index]);
        corridors.push(corridor);
      }
    }

    if(motherRoom.rooms){
      for(let index in motherRoom.rooms){
        let room = this.generateRoom(motherRoom.rooms[index]);
        roomsTab.push(room);
      }
    }

    const corridorInterfaceData = {
      id: motherRoom.id,
      name: 'Corridors',
      type: 'interface',
      children: corridors
    };


    const roomsInterfaceData = {
      id: motherRoom.id,
      name: 'Rooms',
      type: 'interface',
      children: roomsTab
    };

    motherRoomsData['children'] = [corridorInterfaceData, roomsInterfaceData];

    return motherRoomsData;
  }

  generateCorridor(corridor: Corridor): any{

    let corridorData = {};

    corridorData['id'] = corridor.id;
    corridorData['name'] = 'Corridor '+ corridor.numberCorridor;
    corridorData['type'] = 'corridor';

    const actuators = [];
    const sensors = [];

    if(corridor.sensors){
      for(let index in corridor.sensors){
        let room = this.generateSensor(corridor.sensors[index]);
        sensors.push(room);
      }
    }
    if(corridor.actuators){
      for(let index in corridor.actuators){
        let actuator = this.generateActuator(corridor.actuators[index]);
        actuators.push(actuator);
      }
    }
    const sensorInterfaceData = {
      id: corridor.id,
      name: 'Sensors',
      type: 'interface',
      children: sensors
    };

    const actuatorInterfaceData = {
      id: corridor.id,
      name: 'Actuators',
      type: 'interface',
      children: actuators
    };

    corridorData['children'] = [sensorInterfaceData, actuatorInterfaceData];
    return corridorData;
  }

  generateRoom(room: Room): any{
    let roomData = {};

    roomData['id'] = room.id;
    roomData['name'] = 'Room '+ room.numberRoom;
    roomData['type'] = 'room';

    const actuators = [];
    const sensors = [];

    if(room.sensors){
      for(let index in room.sensors){
        let sensor = this.generateSensor(room.sensors[index]);
        sensors.push(sensor);
      }
    }
    if(room.actuators){
      for(let index in room.actuators){
        let actuator = this.generateActuator(room.actuators[index]);
        actuators.push(actuator);
      }
    }

    const sensorInterfaceData = {
      id: room.id,
      name: 'Sensors',
      type: 'interface',
      children: sensors
    };

    const actuatorInterfaceData = {
      id: room.id,
      name: 'Actuators',
      type: 'interface',
      children: actuators
    };

    roomData['children'] = [sensorInterfaceData, actuatorInterfaceData];

    return roomData;

  }

  generateSensor(sensor: Sensor) : any{  
    let sensorData = {};

    sensorData['id'] = sensor.id;
    sensorData['name'] = 'Sensor '+ sensor.reference;
    sensorData['type'] = 'sensor';

    return sensorData;
  }

  generateActuator(actuator: Actuator) : any{  
    let actutorData = {};

    actutorData['id'] = actuator.id;
    actutorData['name'] = 'Actuator '+ actuator.reference;
    actutorData['type'] = 'Actuator';

    return actutorData;
  }

  add(node1){
    console.log(node1);
    switch(node1.name){
      case 'Buildings': {
        this.openCreationBuildingDialog(node1);
        break;
      }
      case 'Floors': {
        this.openCreationFloorDialog(node1);
        break;
      }
      case 'Corridors': {
        console.log('ccc');
        break;
      }
      case 'Spaces': {
        console.log('sss');
        break;
      }
      case 'Rooms': {
        console.log('rrrr');
        break;
      }
      case 'Sensors': {
        console.log('sssenn');
        break;
      }
      case 'Actuators': {
        console.log('aaa');
        break;
      }
      default: break;
    }

    let nodeFinded = this.searchRoot(node1);
    
    //let fileNode ={ id: 48, name: 'filsRamzi', type: 'ramzi' , children: []}

    
    //nodeFinded.children.push(fileNode);

    this.dataSource.data = this.generateData(this.project);

    this.treeControl.expandAll();

    //this.treeControl.expand(this.treeControl.dataNodes[0]);
    //console.log(this.treeControl.dataNodes);
    //this.treeControl.expandDescendants(this.searchFlatTreeNode(node1));
  }

 /* searchFlatTreeNode(node: FileNode) : FlatTreeNode {
    //A MODIFIER
    let array = this.treeControl.dataNodes;

    for(let index in array){
      let flatTreeNode = array[index];
      if(flatTreeNode.id === node.id && flatTreeNode.type === node.type)
        return flatTreeNode;
    }
    return null;
  }*/

  searchRoot(node : FileNode) : FileNode{
    let array = this.dataSource.data;

    for(let index in array){
      let nodeFinded = this.search(node, array[index]);
      
      if(nodeFinded != null)
        return nodeFinded;
    }

    return null;
  }

  /**
   * Le chemin est composé avec des '/' entre chaque elements
   */
  search(node: FileNode, currentNode:FileNode): FileNode{
    
    if(node.id == currentNode.id && node.type == currentNode.type && node.name == currentNode.name)
      return currentNode;

    if(!currentNode.children)
      return null;

    for(let indexNode in currentNode.children){
      let nodeFinded = this.search(node, currentNode.children[indexNode]);
      
      if(nodeFinded != null)
        return nodeFinded;
    }

    return null;
  }



  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  openCreationBuildingDialog(node: FileNode){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
    };

  const dialogRef = this.dialog.open(CreateBuildingEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'added'){
          this.addedSpecification.emit(1);
        }
      }
    );
  }

  openCreationFloorDialog(node: FileNode){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
    };
    
  const dialogRef = this.dialog.open(CreateFloorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'added'){
          this.addedSpecification.emit(1);
        }
      }
    );
  }

}
