import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSensorEntityDialogComponent } from './create-sensor-entity-dialog.component';

describe('CreateSensorEntityDialogComponent', () => {
  let component: CreateSensorEntityDialogComponent;
  let fixture: ComponentFixture<CreateSensorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSensorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSensorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
