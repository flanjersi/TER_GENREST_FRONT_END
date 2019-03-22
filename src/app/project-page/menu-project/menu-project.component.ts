import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss']
})
export class MenuProjectComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
  }

  isLogged() {
    return this.cookieService.get('user') != null;
  }
  logout(){
    this.cookieService.delete('user');
    this.router.navigateByUrl('/');
  }

}
