import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfilComponent} from './user-profil.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: UserProfilComponent },
];

@NgModule({
  declarations: [UserProfilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserProfilModule { }
