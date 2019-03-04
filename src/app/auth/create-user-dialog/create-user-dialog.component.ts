import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {

  public form: FormGroup;

  public firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]);

  public lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]);

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(200),
  ]);

  public confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  public matcher = new MyErrorStateMatcher();

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmedPassword: string;

  constructor(private dialogRef: MatDialogRef<CreateUserDialogComponent>, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl,
    }, {validator: this.confirmedPasswordValidator});
  }

  ngOnInit() {}

  save() {
    this.form.markAsTouched();
    this.firstNameFormControl.markAsTouched();
    this.lastNameFormControl.markAsTouched();
    this.emailFormControl.markAsTouched();
    this.passwordFormControl.markAsTouched();
    this.confirmPasswordFormControl.markAsTouched();

    if(!this.form.valid){
      return;
    }

    this.dialogRef.close("close");
  }

  close() {
    this.dialogRef.close();
  }

  confirmedPasswordValidator(control: FormControl){
    let pass = control.get('password').value;
    let confirmPass = control.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
