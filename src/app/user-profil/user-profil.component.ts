import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../shared/_models/User";
import {UserService} from "../shared/_services/user.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

//  @Input()
  private user: User;

  @Input()
  public isLoaded: boolean;

  constructor(private userService: UserService,
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

