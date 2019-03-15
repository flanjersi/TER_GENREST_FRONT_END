import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../shared/_services/project.service";
import {Project} from "../shared/_models/Project";

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
    this.isLoaded = false;
/*
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
            },
            err => {},
          () => {
              this.isLoaded = true;
          });
      })*/
this.isLoaded = true;
  }

  ngOnInit() {
  }

}
