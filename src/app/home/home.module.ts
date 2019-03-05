import {NgModule} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MaterialModule} from "../features/material.module";

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,

    MDBBootstrapModule.forRoot(),
    MaterialModule,

    RouterModule.forChild(routes),
    CoreModule,
    SharedModule,
  ]
})
export class HomeModule { }
