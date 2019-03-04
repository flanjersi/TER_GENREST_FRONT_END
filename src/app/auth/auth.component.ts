import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MatDialog, MatDialogConfig} from "@angular/material";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  public matcher = new MyErrorStateMatcher();

  public email: string;
  public password: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  login(){
    this.emailFormControl.markAsTouched();
    this.passwordFormControl.markAsTouched();

    if(this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')){
      return;
    }
    if(this.passwordFormControl.hasError('required')){
      return;
    }

    console.log(this.email);
    console.log(this.password);

    // TODO ADD WEB SERVICE
  }

  openCreationUserDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

}
