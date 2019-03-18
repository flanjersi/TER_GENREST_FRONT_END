import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../shared/_models/Project";
import {ProjectService} from "../../../shared/_services/project.service";
import {CookieService} from "ngx-cookie-service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateProjectDialogComponent} from "../create-project-dialog/create-project-dialog.component";
import {EditProjectComponent} from "../edit-project/edit-project.component";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss']
})
export class ShowProjectComponent implements OnInit {

  @Input()
  private project: Project;

  @Input()
  private isLast: boolean;

  @Output() deletedProject: EventEmitter<number>;
  @Output() updatedProject: EventEmitter<number>;


  constructor(private dialog: MatDialog,
              private projectService: ProjectService,
              private cookieService: CookieService,
              private spinnerService: Ng4LoadingSpinnerService,
              private router: Router) {
    this.deletedProject = new EventEmitter<number>();
    this.updatedProject = new EventEmitter<number>();

  }

  ngOnInit() {
  }

  edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idProject: this.project.id,
      projectName: this.project.projectName
    };

    const dialogRef = this.dialog.open(EditProjectComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'updated') {
          this.updatedProject.emit(this.project.id);
        }
      }
    );
  }

  delete(){
    this.spinnerService.show();

    this.projectService.deleteProject(parseInt(this.cookieService.get('user')), this.project.id)
      .then(data => {
          this.spinnerService.hide();
          this.deletedProject.emit(this.project.id);
        },
        err => {
          this.spinnerService.hide();
        });
  }

  goToProject(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": this.project.id
      }
    };

    this.router.navigate(['project'], navigationExtras);
  }


}
