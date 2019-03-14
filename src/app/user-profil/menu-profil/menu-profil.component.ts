import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-profil',
  templateUrl: './menu-profil.component.html',
  styleUrls: ['./menu-profil.component.scss']
})
export class MenuProfilComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {}


  logout(){
    this.cookieService.delete('user');
    this.router.navigateByUrl('/');
  }

}
