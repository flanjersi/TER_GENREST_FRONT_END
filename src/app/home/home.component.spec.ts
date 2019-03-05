import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {CommonModule} from "@angular/common";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MaterialModule} from "../features/material.module";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        CommonModule,

        MDBBootstrapModule.forRoot(),
        MaterialModule,

        CoreModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
