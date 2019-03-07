import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfilComponent} from './user-profil.component';
import {RouterModule, Routes} from "@angular/router";
import { MenuProfilComponent } from './menu-profil/menu-profil.component';
import {MaterialModule} from "../features/material.module";
import {MDBBootstrapModule} from "angular-bootstrap-md";

const routes: Routes = [
  { path: '', component: UserProfilComponent },
];

@NgModule({
  declarations: [UserProfilComponent, MenuProfilComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class UserProfilModule { }
