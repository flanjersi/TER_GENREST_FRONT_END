import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../../shared/_models/User';
import {UserService} from '../../../shared/_services/user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  public form: FormGroup;

  public matcher = new MyErrorStateMatcher();

  public idUser: number;

  constructor(private dialogRef: MatDialogRef<EditUserDialogComponent>,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.idUser = data.idUser;


    this.form = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    this.form.get('firstName').setValue(data.firstName);
    this.form.get('lastName').setValue(data.lastName);
    this.form.get('email').setValue(data.email);
    this.form.get('password').setValue(data.password);

  }

  ngOnInit() {
  }

  editUser() {
    this.form.markAsTouched();

    if(!this.form.valid) {
      return;
    }

    let user = new User();
    user.id = this.idUser;
    user.firstName = this.form.get('firstName').value;
    user.lastName = this.form.get('lastName').value;
    user.email = this.form.get('email').value;
    user.password = this.form.get('password').value;

    this.spinnerService.show();

    this.userService.update(user)
      .then(
        data => {
          this.spinnerService.hide();
          this.dialogRef.close({
            action: 'updated',
            firstName : this.form.get('firstName').value,
            lastName : this.form.get('lastName').value,
            email : this.form.get('email').value,
            password : this.form.get('password').value
          });
          console.log(user);
          console.log(data);
        },
        msg => {
          this.form.get('email').setErrors({'alreadyUsed': true});
        }
      );
  }

  cancel() {
    this.dialogRef.close({
      action : 'cancel'
    });
  }
}
