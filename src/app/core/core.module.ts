import {NgModule} from '@angular/core';
import {UserService} from "../shared/_services/user.service";
import {MenuComponent} from "./menu/menu.component";
import {MaterialModule} from "../features/material.module";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,

    MaterialModule,
    MDBBootstrapModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, CookieService],
  exports: [
    MenuComponent
  ]
})
export class CoreModule { }
