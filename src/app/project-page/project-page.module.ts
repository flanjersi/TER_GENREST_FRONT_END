import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './project-page.component';
import {RouterModule, Routes} from '@angular/router';
import { TabSpecComponent } from './tab-spec/tab-spec.component';
import {MaterialModule} from '../features/material.module';
import {MenuProjectComponent} from './menu-project/menu-project.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { GraphSpecComponent } from './graph-spec/graph-spec.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TreeViewSpecificationsComponent } from './tree-view-specifications/tree-view-specifications.component';
import { CreateBuildingEntityDialogComponent } from './tree-view-specifications/create-building-entity-dialog/create-building-entity-dialog.component';
import { EditBuildingEntityDialogComponent } from './tree-view-specifications/edit-building-entity-dialog/edit-building-entity-dialog.component';



const routes: Routes = [
  { path: '', component: ProjectPageComponent},
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
     ProjectPageComponent,
     TabSpecComponent,
     MenuProjectComponent,
     GraphSpecComponent,
     CreateBuildingEntityDialogComponent,
     TreeViewSpecificationsComponent,
     EditBuildingEntityDialogComponent
    ],
  imports: [
    SharedModule.forRoot(),
    MaterialModule,
    CommonModule,
    NgxGraphModule,
    NgxChartsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    HttpClientModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
  ],
  entryComponents: [
    CreateBuildingEntityDialogComponent,
    EditBuildingEntityDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class ProjectPageModule { }
