import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActuatorEntityDialogComponent } from './create-actuator-entity-dialog.component';

describe('CreateActuatorEntityDialogComponent', () => {
  let component: CreateActuatorEntityDialogComponent;
  let fixture: ComponentFixture<CreateActuatorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActuatorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActuatorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
