import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectPageComponent} from './project-page.component';
import {RouterModule, Routes} from '@angular/router';
import {TabSpecComponent} from './tab-spec/tab-spec.component';
import {MaterialModule} from '../features/material.module';
import {MenuProjectComponent} from './menu-project/menu-project.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {GraphSpecComponent} from './graph-spec/graph-spec.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {TreeViewSpecificationsComponent} from './tree-view-specifications/tree-view-specifications.component';
import {CreateBuildingEntityDialogComponent} from './tree-view-specifications/create-building-entity-dialog/create-building-entity-dialog.component';
import {CreateFloorEntityDialogComponent} from './tree-view-specifications/create-floor-entity-dialog/create-floor-entity-dialog.component';
import {EditBuildingEntityDialogComponent} from './tree-view-specifications/edit-building-entity-dialog/edit-building-entity-dialog.component';
import {EditFloorEntityDialogComponent} from './tree-view-specifications/edit-floor-entity-dialog/edit-floor-entity-dialog.component';
import {EditCorridorEntityDialogComponent} from './tree-view-specifications/edit-corridor-entity-dialog/edit-corridor-entity-dialog.component';
import {EditMotherRoomEntityDialogComponent} from './tree-view-specifications/edit-mother-room-entity-dialog/edit-mother-room-entity-dialog.component';
import {EditRoomEntityDialogComponent} from './tree-view-specifications/edit-room-entity-dialog/edit-room-entity-dialog.component';
import {CreateCorridorEntityDialogComponent} from './tree-view-specifications/create-corridor-entity-dialog/create-corridor-entity-dialog.component';
import {EditSensorEntityDialogComponent} from './tree-view-specifications/edit-sensor-entity-dialog/edit-sensor-entity-dialog.component';
import {EditActuatorEntityDialogComponent} from './tree-view-specifications/edit-actuator-entity-dialog/edit-actuator-entity-dialog.component';
import { DeployDialogComponent } from './deploy-dialog/deploy-dialog.component';
import { DeleteConfirmDialogComponent } from './tree-view-specifications/delete-confirm-dialog/delete-confirm-dialog.component';

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
    EditBuildingEntityDialogComponent,
    CreateFloorEntityDialogComponent,
    EditFloorEntityDialogComponent,
    EditCorridorEntityDialogComponent,
    EditMotherRoomEntityDialogComponent,
    EditRoomEntityDialogComponent,
    CreateCorridorEntityDialogComponent,
    EditSensorEntityDialogComponent,
    EditActuatorEntityDialogComponent,
    DeployDialogComponent,
    DeleteConfirmDialogComponent
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
    EditBuildingEntityDialogComponent,
    EditFloorEntityDialogComponent,
    EditMotherRoomEntityDialogComponent,
    EditCorridorEntityDialogComponent,
    EditRoomEntityDialogComponent,
    CreateFloorEntityDialogComponent,
    CreateCorridorEntityDialogComponent,
    EditActuatorEntityDialogComponent,
    EditSensorEntityDialogComponent,
    DeployDialogComponent

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
