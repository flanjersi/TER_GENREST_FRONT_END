import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  }

  isLogged(){
    return this.cookieService.check('user');
  }

}
