import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorEntityDialogComponent } from './edit-sensor-entity-dialog.component';

describe('EditSensorEntityDialogComponent', () => {
  let component: EditSensorEntityDialogComponent;
  let fixture: ComponentFixture<EditSensorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSensorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSensorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
