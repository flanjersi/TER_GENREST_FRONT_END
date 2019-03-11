import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss']
})
export class MenuProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLogged() {
    return localStorage.getItem('currentUser') != null;
  }

}
