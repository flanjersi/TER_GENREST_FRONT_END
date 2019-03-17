
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {of as observableOf} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Project} from 'src/app/shared/_models/Project';
import {Building} from 'src/app/shared/_models/Building';
import {Floor} from 'src/app/shared/_models/Floor';
import {Corridor} from 'src/app/shared/_models/Corridor';
import {MotherRoom} from 'src/app/shared/_models/MotherRoom';
import {Room} from 'src/app/shared/_models/Room';
import {Sensor} from 'src/app/shared/_models/Sensor';
import {Actuator} from 'src/app/shared/_models/Actuator';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreateBuildingEntityDialogComponent} from './create-building-entity-dialog/create-building-entity-dialog.component';
import {CreateFloorEntityDialogComponent} from './create-floor-entity-dialog/create-floor-entity-dialog.component';
import {EditBuildingEntityDialogComponent} from './edit-building-entity-dialog/edit-building-entity-dialog.component';
import {EditFloorEntityDialogComponent} from './edit-floor-entity-dialog/edit-floor-entity-dialog.component';
import {EditCorridorEntityDialogComponent} from './edit-corridor-entity-dialog/edit-corridor-entity-dialog.component';
import {EditMotherRoomEntityDialogComponent} from './edit-mother-room-entity-dialog/edit-mother-room-entity-dialog.component';
import {EditRoomEntityDialogComponent} from './edit-room-entity-dialog/edit-room-entity-dialog.component';
import {CreateCorridorEntityDialogComponent } from './create-corridor-entity-dialog/create-corridor-entity-dialog.component';
import {EditActuatorEntityDialogComponent} from './edit-actuator-entity-dialog/edit-actuator-entity-dialog.component';
import {EditSensorEntityDialogComponent} from './edit-sensor-entity-dialog/edit-sensor-entity-dialog.component';

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

  constructor(private dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.addedSpecification = new EventEmitter();
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.updated = new EventEmitter();
  }


  @Input()
  private project: Project;



  @Output() addedSpecification: EventEmitter<number>;
  @Output() updated: EventEmitter<number>;



  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;


  ngOnInit() {
    this.dataSource.data = this.generateData(this.project);
  }

  ngOnChanges() {
    const expandablesNodes = this.getAllExpandableNodes();

    this.dataSource.data = this.generateData(this.project);

    this.openOlderExpandableNodes(expandablesNodes);
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      id: node.id,
      name: node.name,
      type: node.type,
      level,
      expandable: !!node.children
    };
  }

  generateData(project: Project): any {

    const data = [];

    const root = {
      id: project.id,
      name: 'Buildings',
      type: 'interface'
    };

    if (project.buildings && project.buildings.length > 0) {
      const buildings = [];

      for (const index in project.buildings.sort((b1, b2) => b1.type.localeCompare(b2.type))) {
        const building = this.generateBuilding(project.buildings[index]);
        buildings.push(building);
      }

      root.children = buildings;
    }


    data.push(root);

    return data;
  }

  generateBuilding(building: Building): any {
    const buildingData = {};

    buildingData.id = building.id;
    buildingData.name = building.type;
    buildingData.type = 'building';

    const floorInterfaceData = [{
      id: building.id,
      name: 'Floors',
      type: 'interface'
    }];

    if (building.floors && building.floors.length > 0) {
      const floors = [];

      for (const index in building.floors.sort((f1, f2) => f1.floorNumber - f2.floorNumber)) {
        const floor = this.generateFloor(building.floors[index]);
        floors.push(floor);
      }

      floorInterfaceData[0].children = floors;
    }

    buildingData.children = floorInterfaceData;

    return buildingData;
  }

  generateFloor(floor: Floor): any {
    const floorData = {};

    floorData.id = floor.id;
    floorData.name = 'Floor ' + floor.floorNumber;
    floorData.type = 'floor';

    const corridorInterfaceData = {
      id: floor.id,
      name: 'Corridors',
      type: 'interface'
    };

    if (floor.corridors && floor.corridors.length > 0) {
      const corridors = [];

      for (const index in floor.corridors.sort((c1, c2) => c1.numberCorridor - c2.numberCorridor)) {
        const corridor = this.generateCorridor(floor.corridors[index]);
        corridors.push(corridor);
      }

      corridorInterfaceData.children = corridors;
    }

    const motherRoomInterfaceData = {
      id: floor.id,
      name: 'Spaces',
      type: 'interface'
    };


    if (floor.motherRooms && floor.motherRooms.length > 0) {
      const motherRooms = [];

      for (const index in floor.motherRooms.sort((mr1, mr2) => mr1.type.localeCompare(mr2.type))) {
        const motherRoom = this.generateMotherRoom(floor.motherRooms[index]);
        motherRooms.push(motherRoom);
      }

      motherRoomInterfaceData.children = motherRooms;
    }

    floorData.children = [corridorInterfaceData, motherRoomInterfaceData];

    return floorData;

  }

  generateMotherRoom(motherRoom: MotherRoom): any {

    const motherRoomsData = {};

    motherRoomsData.id = motherRoom.id;
    motherRoomsData.name = motherRoom.type;
    motherRoomsData.type = 'motherRoom';

    const corridorInterfaceData = {
      id: motherRoom.id,
      name: 'Corridors',
      type: 'interface'
    };

    if (motherRoom.corridors && motherRoom.corridors.length > 0) {
      const corridors = [];

      for (const index in motherRoom.corridors.sort((c1, c2) => c1.numberCorridor - c2.numberCorridor)) {
        const corridor = this.generateCorridor(motherRoom.corridors[index]);
        corridors.push(corridor);
      }

      corridorInterfaceData.children = corridors;
    }

    const roomsInterfaceData = {
      id: motherRoom.id,
      name: 'Rooms',
      type: 'interface'
    };

    if (motherRoom.rooms && motherRoom.rooms.length > 0) {

      const roomsTab = [];
      for (const index in motherRoom.rooms.sort((r1, r2) => r1.type.localeCompare(r2.type))) {
        const room = this.generateRoom(motherRoom.rooms[index]);
        roomsTab.push(room);
      }

      roomsInterfaceData.children = roomsTab;
    }

    motherRoomsData.children = [corridorInterfaceData, roomsInterfaceData];

    return motherRoomsData;
  }

  generateCorridor(corridor: Corridor): any {
    const corridorData = {};

    corridorData.id = corridor.id;
    corridorData.name = 'Corridor ' + corridor.numberCorridor;
    corridorData.type = 'corridor';

    const sensorInterfaceData = {
      id: corridor.id,
      name: 'Sensors',
      type: 'interface'
    };


    if (corridor.sensors && corridor.sensors.length > 0) {
      const sensors = [];

      for (const index in corridor.sensors.sort((s1, s2) => s1.id - s2.id)) {
        const room = this.generateSensor(corridor.sensors[index]);
        sensors.push(room);
      }

      sensorInterfaceData.children = sensors;
    }


    const actuatorInterfaceData = {
      id: corridor.id,
      name: 'Actuators',
      type: 'interface'
    };


    if (corridor.actuators && corridor.actuators.length > 0) {
      const actuators = [];

      for (const index in corridor.actuators.sort((s1, s2) => s1.id - s2.id)) {
        const actuator = this.generateActuator(corridor.actuators[index]);
        actuators.push(actuator);
      }

      actuatorInterfaceData.children = actuators;
    }

    corridorData.children = [sensorInterfaceData, actuatorInterfaceData];
    return corridorData;
  }

  generateRoom(room: Room): any {
    const roomData = {};

    roomData.id = room.id;
    roomData.name = 'Room ' + room.numberRoom;
    roomData.type = 'room';



    const sensorInterfaceData = {
      id: room.id,
      name: 'Sensors',
      type: 'interface'
    };

    if (room.sensors && room.sensors.length > 0) {
      const sensors = [];

      for (const index in room.sensors.sort((s1, s2) => s1.id - s2.id)) {
        const sensor = this.generateSensor(room.sensors[index]);
        sensors.push(sensor);
      }
      sensorInterfaceData.children = sensors;
    }

    const actuatorInterfaceData = {
      id: room.id,
      name: 'Actuators',
      type: 'interface'
    };

    if (room.actuators && room.actuators.length > 0) {
      const actuators = [];

      for (const index in room.actuators.sort((s1, s2) => s1.id - s2.id)) {
        const actuator = this.generateActuator(room.actuators[index]);
        actuators.push(actuator);
      }

      actuatorInterfaceData.children = actuators;
    }


    roomData.children = [sensorInterfaceData, actuatorInterfaceData];

    return roomData;

  }

  generateSensor(sensor: Sensor): any {
    const sensorData = {};

    sensorData.id = sensor.id;
    sensorData.name = 'Sensor ' + sensor.reference;
    sensorData.type = 'sensor';

    return sensorData;
  }
  /* generateActuator(edit-actuator-entity-dialog: Actuator): any {
    const actutorData = {};

    actutorData.id = edit-actuator-entity-dialog.id;
    actutorData.name = 'Actuator ' + edit-actuator-entity-dialog.reference;
    actutorData.type = 'Actuator';

    return actutorData;
  }

*/
  update(node1) {
    console.log(node1);
    switch (node1.type) {
      case 'building': {
        this.openUpdateBuildingDialog(node1);
        break;
      }
      case 'floor': {
        this.openUpdateFloorDialog(node1);
        break;
      }
      case 'corridor': {
        this.openUpdateCorridorDialog(node1);
        break;
      }
      case'motherRoom': {
        this.openUpdateMotherRoomDialog(node1);
        break;
      }
      case'room': {
        this.openUpdateRoomDialog(node1);
        break;
      }
      case'actuator' : {
        this.openUpdateActuatorDialog(node1);
        break;
      }
      case'sensor' : {
        this.openUpdateSensorDialog(node1);
        break;
      }
    }
  }

  add(node1) {
    switch (node1.name) {
      case 'Buildings': {
        this.openCreationBuildingDialog(node1);
        break;
      }
      case 'Floors': {
        this.openCreationFloorDialog(node1);
        break;
      }
      case 'Corridors': {
        this.openCreationCorridorDialog(node1);
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

    const nodeFinded = this.searchRoot(node1);

    const expandablesNodes = this.getAllExpandableNodes();

    this.dataSource.data = this.generateData(this.project);

    this.openOlderExpandableNodes(expandablesNodes);
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

  getAllExpandableNodes(): FlatTreeNode[] {
    const nodesExpanded = [];

    for (const index in this.treeControl.dataNodes) {
      const node = this.treeControl.dataNodes[index];

      if (this.treeControl.isExpanded(node)) {
        nodesExpanded.push(node);
      }
    }

    return nodesExpanded;
  }
  openOlderExpandableNodes(expandablesNodes: FlatTreeNode[]) {
    for (const index in expandablesNodes) {
      const oldNode = expandablesNodes[index];

      for (const indexNewNode in this.treeControl.dataNodes) {
        const newNode = this.treeControl.dataNodes[indexNewNode];

        if (oldNode.id === newNode.id
          && oldNode.name === newNode.name
          && oldNode.type === newNode.type
          && oldNode.level === newNode.level) {
          this.treeControl.expand(newNode);
        }
      }
    }
  }

  searchRoot(node: FileNode): FileNode {
    const array = this.dataSource.data;

    for (const index in array) {
      const nodeFinded = this.search(node, array[index]);

      if (nodeFinded != null) {
        return nodeFinded;
      }
    }

    return null;
  }

  /**
   * Le chemin est composé avec des '/' entre chaque elements
   */
  search(node: FileNode, currentNode: FileNode): FileNode {

    if (node.id == currentNode.id && node.type == currentNode.type && node.name == currentNode.name) {
      return currentNode;
    }

    if (!currentNode.children) {
      return null;
    }

    for (const indexNode in currentNode.children) {
      const nodeFinded = this.search(node, currentNode.children[indexNode]);

      if (nodeFinded != null) {
        return nodeFinded;
      }
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


  openCreationFloorDialog(node: FileNode) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id
    };

    const dialogRef = this.dialog.open(CreateFloorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'added') {
          this.addedSpecification.emit(1);
        }
      }
    );
  }

  openCreationBuildingDialog(node: FileNode) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
    };

    const dialogRef = this.dialog.open(CreateBuildingEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'added') {
          this.addedSpecification.emit(1);
        }
      }
    );
  }

  openCreationCorridorDialog(node: FileNode) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: node.id,
    };

    const dialogRef = this.dialog.open(CreateCorridorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'added') {
          this.addedSpecification.emit(1);
        }
      }
    );
  }


  openUpdateBuildingDialog(node) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idProject: this.project.id,
      idBuilding: node.id
    };

    const dialogRef = this.dialog.open(EditBuildingEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }

  openUpdateFloorDialog(node) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idFloor: node.id
    };

    const dialogRef = this.dialog.open(EditFloorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }

  openUpdateCorridorDialog(node) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idCorridor: node.id
    };

    const dialogRef = this.dialog.open(EditCorridorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }

  openUpdateMotherRoomDialog(node) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idMotherRoom: node.id
    };

    const dialogRef = this.dialog.open(EditMotherRoomEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }

  openUpdateRoomDialog(node) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idRoom: node.id
    };

    const dialogRef = this.dialog.open(EditRoomEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }

  openUpdateActuatorDialog(node) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idActuator: node.id
    };

    const dialogRef = this.dialog.open(EditActuatorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }

  openUpdateSensorDialog(node) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idSensor: node.id
    };

    const dialogRef = this.dialog.open(EditSensorEntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updated.emit(1);
        }
      });
  }
}
