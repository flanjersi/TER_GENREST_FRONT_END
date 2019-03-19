import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Configuration {
  value: string;
  viewValue: string;
}
export interface Language {
  value: string;
  viewValue: string;
}
export interface System {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-deploy-dialog',
  templateUrl: './deploy-dialog.component.html',
  styleUrls: ['./deploy-dialog.component.scss']
})
export class DeployDialogComponent implements OnInit {

  configurations: Configuration[] = [
    {value: 'configuration-0', viewValue: 'Domotic'},
    {value: 'configuration-1', viewValue: 'Environment'},
    {value: 'configuration-2', viewValue: 'Transport'}
  ];

  systems: System[] = [
    {value: 'system-0', viewValue: 'Windows'},
    {value: 'system-1', viewValue: 'Lunix'}
  ];

  languages: Language[] = [
    {value: 'language-0', viewValue: 'NodeJS'},
    {value: 'language-1', viewValue: 'Python'},
    {value: 'language-2', viewValue: 'Php'}
  ];

  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<DeployDialogComponent>,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      typeLanguage: new FormControl('', [
        Validators.required
      ]),
      typeConfiguration: new FormControl('', [
        Validators.required
      ]),
      typeSystem: new FormControl('', [
        Validators.required
      ])
    });
  }
  ngOnInit() {
  }

  deploy() {
    this.form.markAsTouched();
  }

  close() {
    this.dialogRef.close('Close');
  }
}
