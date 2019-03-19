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
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateProjectDialogComponent} from "../user-profil/show-projects/create-project-dialog/create-project-dialog.component";
import {DeployDialogComponent} from "./deploy-dialog/deploy-dialog.component";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectPageComponent implements OnInit {

  private project: Project;
  private isLoaded: boolean;

  private entitySpec: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private cookieService: CookieService,
              private spinnerService: Ng4LoadingSpinnerService,
              private dialog: MatDialog) {
    this.isLoaded = false;
    if(!cookieService.get('user'))
      this.router.navigateByUrl('/auth');


    this.route.queryParams.subscribe(params => {
      if(!params['id']){
        this.router.navigateByUrl('/profil');
        return;
      }

      this.spinnerService.show();
      this.projectService.getById(parseInt(params['id']))
        .subscribe(
          data => {
            this.project = data;
          },
          err => {},
          () => {
            this.spinnerService.hide();
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
  }

  ngOnInit(){}

  refreshProject(){
    this.projectService.getById(this.project.id)
      .subscribe(
        data => {
          this.project = data;
        },
        err => {},
        () => {
        }
      );
  }

  updateEntitySpec(event){
    this.entitySpec = event;
  }


  openDeployDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DeployDialogComponent, dialogConfig);

  }
}
