import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../shared/_services/project.service";
import {Project} from "../shared/_models/Project";
import { Building } from '../shared/_models/Building';
import { Floor } from '../shared/_models/Floor';
import { Corridor } from '../shared/_models/Corridor';
import { MotherRoom } from '../shared/_models/MotherRoom';
import { Sensor } from '../shared/_models/Sensor';
import { Actuator } from '../shared/_models/Actuator';
import { Room } from '../shared/_models/Room';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  private project: Project;
  private isLoaded: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService) {

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
              console.log(this.project);
            },
            err => {},
          () => {
              this.isLoaded = true;
          });
      })
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

  ngOnInit() {
  }

}
