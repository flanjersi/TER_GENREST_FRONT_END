import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../shared/_services/project.service";
import {Project} from "../shared/_models/Project";
import {CookieService} from 'ngx-cookie-service';
import {Building} from "../shared/_models/Building";
import {Floor} from "../shared/_models/Floor";
import {Corridor} from "../shared/_models/Corridor";
import {Actuator} from "../shared/_models/Actuator";
import {Sensor} from "../shared/_models/Sensor";
import {MotherRoom} from "../shared/_models/MotherRoom";
import {Room} from "../shared/_models/Room";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectPageComponent implements OnInit {

  private project: Project;
  private isLoaded: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private cookieService: CookieService) {
    this.isLoaded = false;


    if(!cookieService.get('user'))
      this.router.navigateByUrl('/auth');

    this.route.queryParams.subscribe(params => {
        console.log(params);

        if(!params['id']){
          this.router.navigateByUrl('/profil');
          return;
        }

        this.projectService.getById(parseInt(params['id']))
          .subscribe(
            data => {
              this.project = data;
             // this.simulateProject();
            },
            err => {},
          () => {
              this.isLoaded = true;
          });

      });
  }

  simulateProject(){
    this.project = new Project();
    this.project.projectName = "Mon projet";
    this.project.id = 1;

    this.project.buildings = [];

    // CREATION BAT 1
    let building = new Building();
    building.id = 1;
    building.type = "Batiment 1";
    building.floors = [];

    let floor = new Floor();
    floor.id = 1;
    floor.floorNumber = 1;
    floor.corridors = [];

    let corridor = new Corridor();

    corridor.id = 1;
    corridor.numberCorridor = 1;

    corridor.actuators = [];

    let actuator = new Actuator();
    actuator.id = 1;
    actuator.brand = "test";

    corridor.actuators.push(actuator);

    corridor.sensors = [];

    let sensor = new Sensor();
    sensor.id = 1;
    sensor.brand = "test";

    corridor.sensors.push(sensor);

    floor.corridors.push(corridor);

    floor.motherRooms = [];

    let motherRoom = new MotherRoom();

    motherRoom.id = 1;
    motherRoom.type = "motherRoom";

    motherRoom.corridors = [];

    let corridor2 = new Corridor();

    corridor2.id = 2;
    corridor2.numberCorridor = 1;

    corridor2.actuators = [];

    let actuator2 = new Actuator();
    actuator2.id = 2;
    actuator2.brand = "test";

    corridor2.actuators.push(actuator2);

    corridor2.sensors = [];

    let sensor2 = new Sensor();
    sensor2.id = 2;
    sensor2.brand = "test";

    corridor2.sensors.push(sensor2);

    motherRoom.corridors.push(corridor2);

    motherRoom.rooms = [];

    let room = new Room();
    room.id = 1;
    room.type = "test";

    room.actuators = [];
    room.sensors = [];

    let actuator3 = new Actuator();
    actuator3.id = 3;
    actuator3.brand = "test";

    let sensor3 = new Sensor();
    sensor3.id = 2;
    sensor3.brand = "test";

    room.actuators.push(actuator3);
    room.sensors.push(sensor3);

    motherRoom.rooms.push(room);

    floor.motherRooms.push(motherRoom);

    building.floors.push(floor);

    // CREATION BAT 2
    let building2 = new Building();
    building2.id = 2;
    building2.type = "Batiment 2";
    building2.floors = [];

    this.project.buildings.push(building);
    this.project.buildings.push(building2);
  }

  ngOnInit(){

  }
  
  refreshProject(){
    console.log("test");
    this.projectService.getById(this.project.id)
      .subscribe(
        data => {
          this.project = data;
        },
        err => {},
        () => {

        }
      )
  }

}
