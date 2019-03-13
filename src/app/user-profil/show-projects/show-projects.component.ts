import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../shared/_models/Project";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateProjectDialogComponent} from "./create-project-dialog/create-project-dialog.component";
import {CookieService} from "ngx-cookie-service";
import {ProjectService} from "../../shared/_services/project.service";

@Component({
  selector: 'app-show-projects',
  templateUrl: './show-projects.component.html',
  styleUrls: ['./show-projects.component.scss']
})
export class ShowProjectsComponent implements OnInit {

  public searchProject: string;

  @Input()
  private projects: Project[];

  private projectsFiltered: Project[];

  constructor(private dialog: MatDialog,
              private projectService: ProjectService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.projectsFiltered = Object.assign([], this.projects);
  }

  openCreationProjectDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateProjectDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'created') {
          this.projectService.getAllProjects(parseInt(this.cookieService.get('user')))
            .then(
              data => {
                this.projects = data;
                this.filterProject();
              },
              err => {}
            )
        }
      }
    );
  }

  filterProject() {
    if(!this.searchProject){
      this.projectsFiltered = Object.assign([], this.projects);
      return;
    }

    this.projectsFiltered = Object.assign([], this.projects).filter(
      project => {
        return project.projectName.toLowerCase().indexOf(this.searchProject.toLowerCase()) > -1
      }
    );
  }

  /**
   * Method was called when a project has been deleted
   */
  refreshProjects(){
    this.projectService.getAllProjects(parseInt(this.cookieService.get('user')))
      .then(
        data => {
          this.projects = data;
          this.filterProject();
        },
        err => {}
      )
  }
}
