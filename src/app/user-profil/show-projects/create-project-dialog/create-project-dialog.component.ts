import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {UserService} from "../../../shared/_services/user.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {User} from "../../../shared/_models/User";
import {Project} from "../../../shared/_models/Project";
import {CookieService} from "ngx-cookie-service";
import {ProjectService} from "../../../shared/_services/project.service";

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
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  domains: Domain[] = [
    {value: 'domotic-0', viewValue: 'Domotic'},
    {value: 'environment-1', viewValue: 'Environment'},
    {value: 'transport-2', viewValue: 'Transport'}
  ];

  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
              private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService) {
    this.form = this.formBuilder.group({
      projectName: new FormControl('', [
        Validators.required
      ]),
      typeProject: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  addProject() {
    this.form.markAsTouched();

    this.form.get('typeProject').markAsTouched();

    if(!this.form.valid){
      return;
    }

    let project = new Project();
    project.projectName = this.form.get('projectName').value;

    this.spinnerService.show();

    this.projectService.createProject(parseInt(this.cookieService.get('user')), project)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close('created');
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
