import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {User} from "../../shared/_models/User";
import {UserService} from "../../shared/_services/user.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-profil',
  templateUrl: './show-profil.component.html',
  styleUrls: ['./show-profil.component.scss']
})
export class ShowProfilComponent implements OnInit {

  @Input()
  private user: User;

  @Input()
  public isLoaded : boolean;

  @Output()
  updatedUser: EventEmitter<number>;

  constructor(private userService: UserService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService,
              private dialog: MatDialog,
              private router: Router) {
    this.updatedUser = new EventEmitter();
  }

  ngOnInit() {
    this.isLoaded = false;

    this.userService.getById(parseInt(this.cookieService.get('user'))).subscribe(
      (resp) => { this.user = resp},
      (err)  => {},
      () => this.isLoaded = true
    );
  }

  openEditUserDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idUser: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    };

    const dialogRef = this.dialog.open(EditUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data.action === 'updated') {
          this.user.firstName = data['firstName'];
          this.user.lastName =  data['lastName'];
          this.user.email  =  data['email'];
          this.user.password   =  data['password'];
        }
      });
  }

}
