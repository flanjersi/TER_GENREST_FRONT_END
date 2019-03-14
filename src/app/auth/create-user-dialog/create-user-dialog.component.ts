import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {UserService} from "../../shared/_services/user.service";
import {User} from "../../shared/_models/User";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
  providers: [UserService]
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

  public emailFormControl = new FormControl('',
    [
        Validators.required,
        Validators.email,
      ],
    );

  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(200),
  ]);

  public confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  public matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<CreateUserDialogComponent>,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private cookieService: CookieService,
              private spinnerService: Ng4LoadingSpinnerService,
              private router: Router) {
    this.form = this.formBuilder.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl,
    }, {
      validators: [
        this.confirmedPasswordValidator
      ]
    });
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

    this.spinnerService.show();

    this.userService.getByEmail(this.emailFormControl.value)
      .subscribe( (user) => {
          this.emailFormControl.setErrors({'alreadyUse': true});
          this.spinnerService.hide();
        },
        (err) => {
          let user = new User();

          user.firstName = this.firstNameFormControl.value;
          user.lastName  = this.lastNameFormControl.value;
          user.email     = this.emailFormControl.value;
          user.password  = this.passwordFormControl.value;

          this.userService.create(user)
            .then(
              resp => {
                console.log(resp);
                this.spinnerService.hide();
                this.dialogRef.close('close');
                this.cookieService.set('user', resp + '');
                this.router.navigateByUrl("/profil");
              },
              err2 => {
                this.spinnerService.hide();
              }
            );
        },
       () => {}
      )
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
