import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "./services/auth.service";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {AuthComponent} from "./auth.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../features/material.module";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";


const routes: Routes = [
  { path: '', component: AuthComponent },
];

@NgModule({
  declarations: [
    CreateUserDialogComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    RouterModule.forChild(routes),
    CoreModule,
    SharedModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),

    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService],
  entryComponents : [CreateUserDialogComponent]
})
export class AuthModule { }
