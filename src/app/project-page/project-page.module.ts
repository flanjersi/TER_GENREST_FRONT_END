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
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TreeViewSpecificationsComponent } from './tree-view-specifications/tree-view-specifications.component';
import { CreateBuildingEntityDialogComponent } from './tree-view-specifications/create-building-entity-dialog/create-building-entity-dialog.component';
import { CreateFloorEntityDialogComponent } from './tree-view-specifications/create-floor-entity-dialog/create-floor-entity-dialog.component';
import { CreateMotherRoomEntityDialogComponent } from './tree-view-specifications/create-mother-room-entity-dialog/create-mother-room-entity-dialog.component';
import { CreateRoomEntityDialogComponent } from './tree-view-specifications/create-room-entity-dialog/create-room-entity-dialog.component';
import { CreateSensorEntityDialogComponent } from './tree-view-specifications/create-sensor-entity-dialog/create-sensor-entity-dialog.component';
import { CreateActuatorEntityDialogComponent } from './tree-view-specifications/create-actuator-entity-dialog/create-actuator-entity-dialog.component';
import {EditBuildingEntityDialogComponent} from './tree-view-specifications/edit-building-entity-dialog/edit-building-entity-dialog.component';
import {EditFloorEntityDialogComponent} from './tree-view-specifications/edit-floor-entity-dialog/edit-floor-entity-dialog.component';
import {EditCorridorEntityDialogComponent} from './tree-view-specifications/edit-corridor-entity-dialog/edit-corridor-entity-dialog.component';
import {EditMotherRoomEntityDialogComponent} from './tree-view-specifications/edit-mother-room-entity-dialog/edit-mother-room-entity-dialog.component';
import {EditRoomEntityDialogComponent} from './tree-view-specifications/edit-room-entity-dialog/edit-room-entity-dialog.component';
import {CreateCorridorEntityDialogComponent} from './tree-view-specifications/create-corridor-entity-dialog/create-corridor-entity-dialog.component';
import {EditSensorEntityDialogComponent} from './tree-view-specifications/edit-sensor-entity-dialog/edit-sensor-entity-dialog.component';
import {EditActuatorEntityDialogComponent} from './tree-view-specifications/edit-actuator-entity-dialog/edit-actuator-entity-dialog.component';
import { DeployDialogComponent } from './deploy-dialog/deploy-dialog.component';
import {DeployService} from './deploy-dialog/services/deploy.service';

const routes: Routes = [
  { path: '', component: ProjectPageComponent},
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// @ts-ignore
@NgModule({
  declarations: [
    ProjectPageComponent,
    TabSpecComponent,
    MenuProjectComponent,
    GraphSpecComponent,
    CreateBuildingEntityDialogComponent,
    TreeViewSpecificationsComponent,
    CreateFloorEntityDialogComponent,
    CreateCorridorEntityDialogComponent,
    CreateMotherRoomEntityDialogComponent,
    CreateRoomEntityDialogComponent,
    CreateSensorEntityDialogComponent,
    CreateActuatorEntityDialogComponent,
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
    DeployDialogComponent
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
    CreateMotherRoomEntityDialogComponent,
    CreateRoomEntityDialogComponent,
    CreateSensorEntityDialogComponent,
    CreateActuatorEntityDialogComponent,
    EditActuatorEntityDialogComponent,
    EditSensorEntityDialogComponent,
    DeployDialogComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    DeployService
  ]
})
export class ProjectPageModule { }


