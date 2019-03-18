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
import { CreateFloorEntityDialogComponent } from './create-floor-entity-dialog/create-floor-entity-dialog.component';
import { CreateCorridorEntityDialogComponent } from './create-corridor-entity-dialog/create-corridor-entity-dialog.component';
import { CreateMotherRoomEntityDialogComponent } from './create-mother-room-entity-dialog/create-mother-room-entity-dialog.component';
import { CreateRoomEntityDialogComponent } from './create-room-entity-dialog/create-room-entity-dialog.component';
import { CreateSensorEntityDialogComponent} from './create-sensor-entity-dialog/create-sensor-entity-dialog.component';
import { CreateActuatorEntityDialogComponent } from './create-actuator-entity-dialog/create-actuator-entity-dialog.component';


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
    this.dataSource.data = this.generateData(this.project);
  }

  ngOnChanges(){
    let expandablesNodes = this.getAllExpandableNodes();

    this.dataSource.data = this.generateData(this.project);

    this.openOlderExpandableNodes(expandablesNodes);
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

    const root = {
      id: project.id,
      name: 'Buildings',
      type: 'interface'
    };

    if(project.buildings && project.buildings.length > 0){
      const buildings = [];

      for(let index in project.buildings.sort((b1, b2) => b1.type.localeCompare(b2.type))){
        let building = this.generateBuilding(project.buildings[index]);
        buildings.push(building);
      }

      root['children'] = buildings;
    }

    data.push(root);

    return data;
  }

  generateBuilding(building: Building) : any{  
    let buildingData = {};

    buildingData['id'] = building.id;
    buildingData['name'] = building.type;
    buildingData['type'] = 'building';

    const floorInterfaceData = [{
      id: building.id,
      name: 'Floors',
      type: 'interface'
    }];

    if(building.floors && building.floors.length > 0){
      const floors = [];

      for(let index in building.floors.sort((f1, f2) => f1.floorNumber - f2.floorNumber)){
        let floor = this.generateFloor(building.floors[index]);
        floors.push(floor);
      }

      floorInterfaceData[0]['children'] = floors;
    }

    buildingData['children'] = floorInterfaceData;

    return buildingData;
  }

  generateFloor(floor: Floor): any{
    let floorData = {};

    floorData['id'] = floor.id;
    floorData['name'] = 'Floor '+ floor.floorNumber;
    floorData['type'] = 'floor';

    const corridorInterfaceData = {
      id: floor.id,
      name: 'Corridors',
      type: 'interface'
    };

    if(floor.corridors && floor.corridors.length > 0){
      const corridors = [];

      for(let index in floor.corridors.sort((c1, c2) => c1.numberCorridor - c2.numberCorridor)){
        let corridor = this.generateCorridor(floor.corridors[index]);
        corridors.push(corridor);
      }

      corridorInterfaceData['children'] = corridors;
    }

    const motherRoomInterfaceData = {
      id: floor.id,
      name: 'Spaces',
      type: 'interface'
    };

    if(floor.motherRooms && floor.motherRooms.length > 0){
      const motherRooms = [];

      for(let index in floor.motherRooms.sort((mr1, mr2) => mr1.type.localeCompare(mr2.type))){
        let motherRoom = this.generateMotherRoom(floor.motherRooms[index]);
        motherRooms.push(motherRoom);
      }

      motherRoomInterfaceData['children'] = motherRooms;
    }

    floorData['children'] = [corridorInterfaceData, motherRoomInterfaceData];

    return floorData;

  }

  generateMotherRoom(motherRoom: MotherRoom): any{
    
    let motherRoomsData = {};

    motherRoomsData['id'] = motherRoom.id;
    motherRoomsData['name'] = motherRoom.type;
    motherRoomsData['type'] = 'motherRoom';

    const corridorInterfaceData = {
      id: motherRoom.id,
      name: 'Corridors',
      type: 'interface'
    };

    if(motherRoom.corridors && motherRoom.corridors.length > 0){
      const corridors = [];

      for(let index in motherRoom.corridors.sort((c1, c2) => c1.numberCorridor - c2.numberCorridor)){
        let corridor = this.generateCorridor(motherRoom.corridors[index]);
        corridors.push(corridor);
      }

      corridorInterfaceData['children'] = corridors;
    }

    const roomsInterfaceData = {
      id: motherRoom.id,
      name: 'Rooms',
      type: 'interface'
    };

    if(motherRoom.rooms && motherRoom.rooms.length > 0){

      const roomsTab = [];
      for(let index in motherRoom.rooms.sort((r1, r2) => r1.type.localeCompare(r2.type))){
        let room = this.generateRoom(motherRoom.rooms[index]);
        roomsTab.push(room);
      }

      roomsInterfaceData['children'] = roomsTab;
    }

    motherRoomsData['children'] = [corridorInterfaceData, roomsInterfaceData];

    return motherRoomsData;
  }

  generateCorridor(corridor: Corridor): any{
    let corridorData = {};

    corridorData['id'] = corridor.id;
    corridorData['name'] = 'Corridor '+ corridor.numberCorridor;
    corridorData['type'] = 'corridor';

    const sensorInterfaceData = {
      id: corridor.id,
      name: 'Sensors',
      type: 'interface'
    };

    if(corridor.sensors && corridor.sensors.length > 0){
      const sensors = [];

      for(let index in corridor.sensors.sort((s1, s2) => s1.id - s2.id)){
        let room = this.generateSensor(corridor.sensors[index]);
        sensors.push(room);
      }

      sensorInterfaceData['children'] = sensors;
    }

    const actuatorInterfaceData = {
      id: corridor.id,
      name: 'Actuators',
      type: 'interface'
    };

    if(corridor.actuators && corridor.actuators.length > 0){
      const actuators = [];

      for(let index in corridor.actuators.sort((s1, s2) => s1.id - s2.id)){
        let actuator = this.generateActuator(corridor.actuators[index]);
        actuators.push(actuator);
      }

      actuatorInterfaceData['children'] = actuators;
    }

    corridorData['children'] = [sensorInterfaceData, actuatorInterfaceData];
    return corridorData;
  }

  generateRoom(room: Room): any{
    let roomData = {};

    roomData['id'] = room.id;
    roomData['name'] = 'Room '+ room.numberRoom;
    roomData['type'] = 'room';

    const sensorInterfaceData = {
      id: room.id,
      name: 'Sensors',
      type: 'interface'
    };

    if(room.sensors && room.sensors.length > 0){
      const sensors = [];

      for(let index in room.sensors.sort((s1, s2) => s1.id - s2.id)){
        let sensor = this.generateSensor(room.sensors[index]);
        sensors.push(sensor);
      }
      sensorInterfaceData['children'] = sensors;
    }

    const actuatorInterfaceData = {
      id: room.id,
      name: 'Actuators',
      type: 'interface'
    };

    if(room.actuators && room.actuators.length > 0){
      const actuators = [];

      for(let index in room.actuators.sort((s1, s2) => s1.id - s2.id)){
        let actuator = this.generateActuator(room.actuators[index]);
        actuators.push(actuator);
      }

      actuatorInterfaceData['children'] = actuators;
    }


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
        let array = this.treeControl.dataNodes;
        
        for(let index in array){
          let flatTreeNode = array[index];
          if(flatTreeNode.id === node1.id && flatTreeNode.type === node1.type){
            this.openCreationCorridorDialog(node1,flatTreeNode.level);
            break;
          }
        }
        break;
      }
      case 'Spaces': {
        this.openCreationMotherRoomDialog(node1);
        break;
      }
      case 'Rooms': {
       this.openCreationRoomDialog(node1);
        break;
      }
      case 'Sensors': {
        let array = this.treeControl.dataNodes;
        for(let index in array){
          let flatTreeNode = array[index];
          if(flatTreeNode.id === node1.id && flatTreeNode.type === node1.type){
            this.openCreationSensorDialog(node1,flatTreeNode.level);
            break;
          }
        }
        break;      
      }
      case 'Actuators': {
        let array = this.treeControl.dataNodes;
        for(let index in array){
          let flatTreeNode = array[index];
          if(flatTreeNode.id === node1.id && flatTreeNode.type === node1.type){
            this.openCreationActuatorDialog(node1,flatTreeNode.level);
            break;
          }
        }
        break;        
      }
      default: break;
    }
    
    let nodeFinded = this.searchRoot(node1);

    let expandablesNodes = this.getAllExpandableNodes();

    this.dataSource.data = this.generateData(this.project);

    this.openOlderExpandableNodes(expandablesNodes);
  }

  getAllExpandableNodes() : FlatTreeNode[] {
    const nodesExpanded = [];

    for(let index in this.treeControl.dataNodes){
      let node = this.treeControl.dataNodes[index];

      if(this.treeControl.isExpanded(node)){
        nodesExpanded.push(node);
      }
    }

    return nodesExpanded;
  }

  openOlderExpandableNodes(expandablesNodes : FlatTreeNode[]) {
    for(let index in expandablesNodes){
      let oldNode = expandablesNodes[index];

      for(let indexNewNode in this.treeControl.dataNodes){
        let newNode = this.treeControl.dataNodes[indexNewNode];

        if(oldNode.id === newNode.id
          && oldNode.name === newNode.name
          && oldNode.type === newNode.type
          && oldNode.level === newNode.level){
          this.treeControl.expand(newNode);
        }
      }
    }
  }

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

  openCreationCorridorDialog(node: FileNode,levelFlatTreeNode){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
      level: levelFlatTreeNode,
    };

  const dialogRef = this.dialog.open(CreateCorridorEntityDialogComponent, dialogConfig);

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

  openCreationMotherRoomDialog(node: FileNode){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
    };
  
  const dialogRef = this.dialog.open(CreateMotherRoomEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'added'){
          this.addedSpecification.emit(1);
        }
      }
    );
  }

  openCreationRoomDialog(node: FileNode){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
    };
  
  const dialogRef = this.dialog.open(CreateRoomEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'added'){
          this.addedSpecification.emit(1);
        }
      }
    );
  }
  openCreationSensorDialog(node: FileNode,levelFlatTreeNode){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
      level: levelFlatTreeNode,
    };

  const dialogRef = this.dialog.open(CreateSensorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'added'){
          this.addedSpecification.emit(1);
        }
      }
    );
  }

  openCreationActuatorDialog(node: FileNode,levelFlatTreeNode){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
      level: levelFlatTreeNode,
    };

  const dialogRef = this.dialog.open(CreateActuatorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data === 'added'){
          this.addedSpecification.emit(1);
        }
      }
    );
  }


}
