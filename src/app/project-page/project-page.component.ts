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
              private cookieService: CookieService,
              private spinnerService: Ng4LoadingSpinnerService) {
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
      )
  }

}
