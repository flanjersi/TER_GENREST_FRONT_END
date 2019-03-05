import {NgModule} from '@angular/core';
import {UserService} from "./_services/user.service";
import {MenuComponent} from "./menu/menu.component";
import {MaterialModule} from "../features/material.module";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

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
  providers: [UserService],
  exports: [
    MenuComponent
  ]
})
export class CoreModule { }
