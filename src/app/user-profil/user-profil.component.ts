import {Component, OnInit} from '@angular/core';
import {User} from "../shared/_models/User";
import {UserService} from "../shared/_services/user.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  private user: User;

  public isLoaded: boolean;

  constructor(private userService: UserService,
              private spinnerService: Ng4LoadingSpinnerService,
              private cookieService: CookieService) {
  }
  ngOnInit() {
    this.isLoaded = false;

    this.userService.getById(parseInt(this.cookieService.get('user'))).subscribe(
      (resp) => { this.user = resp},
        (err)  => {},
      () => this.isLoaded = true
    );
  }

}
