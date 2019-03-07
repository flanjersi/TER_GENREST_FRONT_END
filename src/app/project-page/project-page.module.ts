import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './project-page.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  { path: '', component: ProjectPageComponent},
];
@NgModule({
  declarations: [ProjectPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectPageModule { }
