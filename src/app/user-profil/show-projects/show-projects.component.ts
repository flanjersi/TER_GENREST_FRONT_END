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

  private showedProjects: Project[];

  private length : number;
  private pageSize : number = 10;
  private pageIndex: number = 0;

  constructor(private dialog: MatDialog,
              private projectService: ProjectService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.showedProjects = [];

    this.projectsFiltered = Object.assign([], this.projects);

    for(let index = 0 ; index < (this.pageSize < this.projectsFiltered.length ? this.pageSize : this.projectsFiltered.length) ; index++){
      this.showedProjects.push(this.projectsFiltered[index]);
    }

    this.length = this.projectsFiltered.length;
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
      this.prepareShowedProject(this.pageIndex);

      return;
    }

    this.projectsFiltered = Object.assign([], this.projects).filter(
      project => {
        return project.projectName.toLowerCase().indexOf(this.searchProject.toLowerCase()) > -1
      }
    );

    this.prepareShowedProject(this.pageIndex);

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
      );

  }

  paginatorEvent(event){
    this.pageIndex = event.pageIndex;
    this.prepareShowedProject(event.pageIndex);
  }

  prepareShowedProject(pageIndex){
    this.showedProjects = [];

    let numberProjectToShow = this.projectsFiltered.length - (this.pageSize * pageIndex);

    if(numberProjectToShow >= this.pageSize){
      for(let index = 0 ; index < this.pageSize ; index++){
        this.showedProjects.push(this.projectsFiltered[index + (pageIndex * this.pageSize)]);
      }
    }
    else {
      for(let index = 0 ; index < numberProjectToShow ; index++){
        this.showedProjects.push(this.projectsFiltered[index + (pageIndex * this.pageSize)]);
      }
    }

    this.length = this.projectsFiltered.length;
  }
}
