import {Component, Inject, OnInit} from '@angular/core';
import {Project} from "../../../shared/_models/Project";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ProjectService} from "../../../shared/_services/project.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {CookieService} from "ngx-cookie-service";
import {Domain} from "../create-project-dialog/create-project-dialog.component";
import {formatDate} from "@angular/common";
import {locale} from "moment";

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

  domains: Domain[] = [
    {value: 'domotic', viewValue: 'Domotic'},
    {value: 'environnement', viewValue: 'Environnement'},
    {value: 'transport', viewValue: 'Transport'}
  ];


  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  public projectName: string;
  public idProject: number;
  public domain: string;
  public creationDate: string;
  public changeDate: string;

  constructor(private dialogRef: MatDialogRef<EditProjectComponent>,
              private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.formBuilder.group({
      projectName: new FormControl('', [
        Validators.required
      ]),
      domain: new FormControl('', [
        Validators.required
      ])
    });

    this.form.get('projectName').setValue(data.projectName);
    this.form.get('domain').setValue(data.domain);
    this.idProject = data.idProject;
    this.creationDate = data.creationDate;
    this.changeDate = data.changeDate;

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
    project.domaine = this.form.get('domain').value;
    project.creationDate = this.data.creationDate;
    project.changeDate = formatDate(Date.now()
      , 'yyyy-MM-dd\'T\'HH:mm:ss', locale());

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
