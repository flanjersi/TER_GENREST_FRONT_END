import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MatDialog, MatDialogConfig} from "@angular/material";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {UserService} from "../shared/_services/user.service";
import {AuthService} from "./services/auth.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

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

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private authService: AuthService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {}

  login() {
    this.emailFormControl.markAsTouched();
    this.passwordFormControl.markAsTouched();

    if (this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')) {
      return;
    }
    if (this.passwordFormControl.hasError('required')) {
      return;
    }

    this.spinnerService.show();

    this.authService.login(this.email, this.password)
      .then(
              data => {
                this.cookieService.set('user', data['id'] + '');
                this.spinnerService.hide();
                this.router.navigateByUrl("/profil");
              },
              err => {
                this.emailFormControl.setErrors({'notGood' : true});
                this.passwordFormControl.setErrors({'notGood' : true});

                this.spinnerService.hide();
              }
      );
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
