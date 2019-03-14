import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './project-page.component';
import {RouterModule, Routes} from "@angular/router";
import { TabSpecComponent } from './tab-spec/tab-spec.component';
import {MaterialModule} from "../features/material.module";
import {MenuProjectComponent} from './menu-project/menu-project.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { GraphSpecComponent } from './graph-spec/graph-spec.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MytreeComponent } from './mytree/mytree.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '', component: ProjectPageComponent},
];
@NgModule({
  declarations: [ProjectPageComponent, TabSpecComponent, MenuProjectComponent, GraphSpecComponent, MytreeComponent],
  imports: [
    MaterialModule,
    CommonModule,
    NgxGraphModule,
    NgxChartsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectPageModule { }
