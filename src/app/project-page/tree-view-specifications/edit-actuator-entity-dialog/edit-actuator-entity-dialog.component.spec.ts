import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActuatorEntityDialogComponent } from './edit-actuator-entity-dialog.component';

describe('EditActuatorEntityDialogComponent', () => {
  let component: EditActuatorEntityDialogComponent;
  let fixture: ComponentFixture<EditActuatorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActuatorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActuatorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
