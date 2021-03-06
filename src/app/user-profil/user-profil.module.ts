import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfilComponent} from './user-profil.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuProfilComponent} from './menu-profil/menu-profil.component';
import {ShowProjectsComponent} from './show-projects/show-projects.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../features/material.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateProjectDialogComponent} from './show-projects/create-project-dialog/create-project-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {ShowProjectComponent} from './show-projects/show-project/show-project.component';
import {ShowProfilComponent} from './show-profil/show-profil.component';
import {EditProjectComponent} from './show-projects/edit-project/edit-project.component';
import {EditUserDialogComponent} from './show-profil/edit-user-dialog/edit-user-dialog.component';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";


const routes: Routes = [
  { path: '', component: UserProfilComponent },
];

@NgModule({
  declarations: [UserProfilComponent, MenuProfilComponent, ShowProjectsComponent,
    CreateProjectDialogComponent, ShowProjectComponent, EditProjectComponent, ShowProfilComponent, EditUserDialogComponent],
  imports: [
    CommonModule,
    SharedModule.forRoot(),

    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
  ],
  entryComponents: [CreateProjectDialogComponent, EditProjectComponent, ShowProfilComponent, EditUserDialogComponent],
})
export class UserProfilModule { }
