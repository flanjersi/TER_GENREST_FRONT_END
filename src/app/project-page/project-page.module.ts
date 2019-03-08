import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './project-page.component';
import {RouterModule, Routes} from "@angular/router";
import { TabSpecComponent } from './tab-spec/tab-spec.component';
import {MaterialModule} from "../features/material.module";
import {MenuProjectComponent} from './menu-project/menu-project.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';


const routes: Routes = [
  { path: '', component: ProjectPageComponent},
];
@NgModule({
  declarations: [ProjectPageComponent, TabSpecComponent, MenuProjectComponent],
  imports: [
    MaterialModule,
    CommonModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class ProjectPageModule { }
