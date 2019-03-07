import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './project-page.component';
import {RouterModule, Routes} from "@angular/router";
import { TabSpecComponent } from './tab-spec/tab-spec.component';
import {MaterialModule} from "../features/material.module";

const routes: Routes = [
  { path: '', component: ProjectPageComponent},
];
@NgModule({
  declarations: [ProjectPageComponent, TabSpecComponent],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectPageModule { }
