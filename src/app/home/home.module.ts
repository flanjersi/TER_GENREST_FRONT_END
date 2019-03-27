import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MaterialModule} from '../features/material.module';
import { TutoDomoticComponent } from './tuto-domotic/tuto-domotic.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tuto', component: TutoDomoticComponent}

];

@NgModule({
  declarations: [
    HomeComponent,
    TutoDomoticComponent
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
