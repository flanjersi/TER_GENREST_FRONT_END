import {Component, Inject, OnInit} from '@angular/core';
import {Project} from "../../../shared/_models/Project";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ProjectService} from "../../../shared/_services/project.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {CookieService} from "ngx-cookie-service";
import {Domain} from "../create-project-dialog/create-project-dialog.component";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Domain {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  public projectName: string;
  public idProject: number;

  constructor(private dialogRef: MatDialogRef<EditProjectComponent>,
              private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.formBuilder.group({
      projectName: new FormControl('', [
        Validators.required
      ])
    });

    this.projectName = data.projectName;
    this.idProject = data.idProject;
  }

  ngOnInit(): void {
  }

  updateProject() {
    this.form.markAsTouched();

    if(!this.form.valid){
      return;
    }

    let project = new Project();

    project.id = this.idProject;
    project.projectName = this.form.get('projectName').value;

    this.spinnerService.show();

    this.projectService.updateProject(project)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('updated');
          console.log(project);
          console.log(data);
        },
        msg => {
          this.form.get('projectName').setErrors({'alreadyUsed' : true});
        }
      )

  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
