import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss']
})
export class MenuProjectComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  }

  isLogged() {
    return this.cookieService.get('user') != null;
  }

}
