import {RoomService} from '../../shared/_services/room.service';
import {HttpClient} from '@angular/common/http';
import {BuildingService} from '../../shared/_services/building.service';
import {MotherRoomService} from '../../shared/_services/mother-room.service';
import {CorridorService} from '../../shared/_services/corridor.service';
import {ActuatorService} from '../../shared/_services/actuator.service';
import {SensorService} from '../../shared/_services/sensor.service';

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


  @Input()
  private project: Project;

  @Output() addedSpecification: EventEmitter<number>;
  @Output() showEntity: EventEmitter<any>;
  @Output() updated: EventEmitter<number>;

  private building: Building;

  private httpClient: HttpClient;

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private dialog: MatDialog, private roomService: RoomService,
              private buildingService: BuildingService, private motherRoomService: MotherRoomService,
              private actuatorService: ActuatorService, private corridorService: CorridorService,
              private  sensorService: SensorService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.addedSpecification = new EventEmitter();
    this.showEntity = new EventEmitter();
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.updated = new EventEmitter();

  }

  showSpec(node) {
    if (node.type === 'building') {
      console.log(node.type);
      this.showEntity.emit(this.buildingService.getById(node.id));
    }
    if (node.type === 'floor') {
      console.log(node.type);
      this.showEntity.emit(this.roomService.getById(node.id));
    }
    if (node.type === 'motherRoom') {
      console.log(node.type);
      this.showEntity.emit(this.motherRoomService.getById(node.id));
    }
    if (node.type === 'corridor') {
      console.log(node.type);
      this.showEntity.emit(this.corridorService.getById(node.id));
    }
    if (node.type === 'sensor') {
      console.log(node.type);
      this.showEntity.emit(this.sensorService.getById(node.id));
    }
    if (node.type === 'actuator') {
      console.log(node.type);
      this.showEntity.emit(this.actuatorService.getById(node.id));
    }

  }
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
    } as any;

    if (project.buildings && project.buildings.length > 0) {
      const buildings = [];
      const instance = this;
      project.buildings.sort((b1, b2) => b1.type.localeCompare(b2.type)).forEach(element => {
        const building = instance.generateBuilding(element);
        buildings.push(building);
      });

      root.children = buildings;
    }


    data.push(root);

    return data;
  }



  generateBuilding(building: Building): any {
    const buildingData = {} as any;

    buildingData.id = building.id;
    buildingData.name = building.type;
    buildingData.type = 'building';

    const floorInterfaceData = [{
      id: building.id,
      name: 'Floors',
      type: 'interface'
    }] as any;

    if (building.floors && building.floors.length > 0) {
      const floors = [];
      const instance = this;
      building.floors.sort((f1, f2) => f1.floorNumber - f2.floorNumber).forEach(element => {
        const floor = instance.generateFloor(element);
        floors.push(floor);
      });

      floorInterfaceData[0].children = floors;
    }

    buildingData.children = floorInterfaceData;

    return buildingData;
  }

  generateFloor(floor: Floor): any {
    const floorData = {} as any;

    floorData.id = floor.id;
    floorData.name = 'Floor ' + floor.floorNumber;
    floorData.type = 'floor';

    const corridorInterfaceData = {
      id: floor.id,
      name: 'Corridors',
      type: 'interface'
    } as any;

    if (floor.corridors && floor.corridors.length > 0) {
      const corridors = [];
      const instance = this;
      floor.corridors.sort((c1, c2) => c1.numberCorridor - c2.numberCorridor).forEach(element => {
        const corridor = instance.generateCorridor(element);
        corridors.push(corridor);
      });

      corridorInterfaceData.children = corridors;
    }

    const motherRoomInterfaceData = {
      id: floor.id,
      name: 'Spaces',
      type: 'interface'
    } as any;


    if (floor.motherRooms && floor.motherRooms.length > 0) {
      const motherRooms = [];
      const instance = this;
      floor.motherRooms.sort((mr1, mr2) => mr1.type.localeCompare(mr2.type)).forEach(element => {
        const motherRoom = instance.generateMotherRoom(element);
        motherRooms.push(motherRoom);
      });

      motherRoomInterfaceData.children = motherRooms;
    }

    floorData.children = [corridorInterfaceData, motherRoomInterfaceData];

    return floorData;

  }

  generateMotherRoom(motherRoom: MotherRoom): any {

    const motherRoomsData = {} as any;

    motherRoomsData.id = motherRoom.id;
    motherRoomsData.name = motherRoom.type;
    motherRoomsData.type = 'motherRoom';

    const corridorInterfaceData = {
      id: motherRoom.id,
      name: 'Corridors',
      type: 'interface'
    } as any;

    if (motherRoom.corridors && motherRoom.corridors.length > 0) {
      const corridors = [];
      const instance = this;
      motherRoom.corridors.sort((c1, c2) => c1.numberCorridor - c2.numberCorridor).forEach(element => {
        const corridor = instance.generateCorridor(element);
        corridors.push(corridor);
      });

      corridorInterfaceData.children = corridors;
    }

    const roomsInterfaceData = {
      id: motherRoom.id,
      name: 'Rooms',
      type: 'interface'
    } as any;

    if (motherRoom.rooms && motherRoom.rooms.length > 0) {

      const roomsTab = [];
      const instance = this;
      motherRoom.rooms.sort((r1, r2) => r1.type.localeCompare(r2.type)).forEach(element => {
        const room = instance.generateRoom(element);
        roomsTab.push(room);
      });

      roomsInterfaceData.children = roomsTab;
    }

    motherRoomsData.children = [corridorInterfaceData, roomsInterfaceData];

    return motherRoomsData;
  }

  generateCorridor(corridor: Corridor): any {
    const corridorData = {} as any;

    corridorData.id = corridor.id;
    corridorData.name = 'Corridor ' + corridor.numberCorridor;
    corridorData.type = 'corridor';

    const sensorInterfaceData = {
      id: corridor.id,
      name: 'Sensors',
      type: 'interface'
    } as any;


    if (corridor.sensors && corridor.sensors.length > 0) {
      const sensors = [];
      const instance = this;
      corridor.sensors.sort((s1, s2) => s1.id - s2.id).forEach(element => {
        const room = instance.generateSensor(element);
        sensors.push(room);
      });

      sensorInterfaceData.children = sensors;
    }


    const actuatorInterfaceData = {
      id: corridor.id,
      name: 'Actuators',
      type: 'interface'
    } as any;


    if (corridor.actuators && corridor.actuators.length > 0) {
      const actuators = [];
      const instance = this;
      corridor.actuators.sort((s1, s2) => s1.id - s2.id).forEach(element => {
        // const actuator = instance.generateActuator(element);
        // actuators.push(actuator);
      });

      actuatorInterfaceData.children = actuators;
    }

    corridorData.children = [sensorInterfaceData, actuatorInterfaceData];
    return corridorData;
  }

  generateRoom(room: Room): any {
    const roomData = {} as any;

    roomData.id = room.id;
    roomData.name = 'Room ' + room.numberRoom;
    roomData.type = 'room';



    const sensorInterfaceData = {
      id: room.id,
      name: 'Sensors',
      type: 'interface'
    } as any;

    if (room.sensors && room.sensors.length > 0) {
      const sensors = [];

      room.sensors.sort((s1, s2) => s1.id - s2.id).forEach(element => {
        const sensor = this.generateSensor(element);
        sensors.push(sensor);
      });
      sensorInterfaceData.children = sensors;
    }

    const actuatorInterfaceData = {
      id: room.id,
      name: 'Actuators',
      type: 'interface'
    } as any;

    /*if (room.actuators && room.actuators.length > 0) {
      const actuators = [];

      for (const index in room.actuators.sort((s1, s2) => s1.id - s2.id)) {
        const actuator = this.generateActuator(room.actuators[index]);
        actuators.push(actuator);
      }

      actuatorInterfaceData.children = actuators;
    }*/


    roomData.children = [sensorInterfaceData, actuatorInterfaceData];

    return roomData;

  }

  generateSensor(sensor: Sensor): any {
    const sensorData = {} as any;

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
  }*/

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

    const instance = this;

    if (!this.treeControl.dataNodes) {
      return nodesExpanded;
    }

    this.treeControl.dataNodes.forEach(element => {
      const node = element;

      if (instance.treeControl.isExpanded(node)) {
        nodesExpanded.push(node);
      }
    });

    return nodesExpanded;
  }
  openOlderExpandableNodes(expandablesNodes: FlatTreeNode[]) {
    expandablesNodes.forEach(element => {
      const oldNode = element;

      this.treeControl.dataNodes.forEach(element2 => {
        const newNode = element2;

        if (oldNode.id === newNode.id
          && oldNode.name === newNode.name
          && oldNode.type === newNode.type
          && oldNode.level === newNode.level) {
          this.treeControl.expand(newNode);
        }
      });
    });
  }

  searchRoot(node: FileNode): FileNode {
    const array = this.dataSource.data;

    array.forEach(element => {
      const nodeFinded = this.search(node, element);

      if (nodeFinded != null) {
        return nodeFinded;
      }
    });

    return null;
  }

  /**
   * Le chemin est composé avec des '/' entre chaque elements
   */
  search(node: FileNode, currentNode: FileNode): FileNode {

    if (node.id === currentNode.id && node.type === currentNode.type && node.name === currentNode.name) {
      return currentNode;
    }

    if (!currentNode.children) {
      return null;
    }

    currentNode.children.forEach(element => {
      const nodeFinded = this.search(node, element);

      if (nodeFinded != null) {
        return nodeFinded;
      }
    });

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
