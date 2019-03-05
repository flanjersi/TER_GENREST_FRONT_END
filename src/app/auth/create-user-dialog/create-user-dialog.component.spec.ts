import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUserDialogComponent} from './create-user-dialog.component';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../features/material.module";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateUserDialogComponent
      ],
      imports: [
        CommonModule,
        MaterialModule,

        CoreModule,
        SharedModule,

        ReactiveFormsModule,
        FormsModule,

        BrowserAnimationsModule,
      ],
      providers: [AuthService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
