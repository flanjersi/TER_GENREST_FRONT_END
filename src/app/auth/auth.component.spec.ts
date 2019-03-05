import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../features/material.module";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateUserDialogComponent,
        AuthComponent,
      ],
      imports: [
        CommonModule,
        MaterialModule,

        BrowserAnimationsModule,

        CoreModule,
        SharedModule,

        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
      ],
      providers: [AuthService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
