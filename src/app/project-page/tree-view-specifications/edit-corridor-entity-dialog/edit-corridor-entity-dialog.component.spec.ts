import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorridorEntityDialogComponent } from './edit-corridor-entity-dialog.component';

describe('EditCorridorEntityDialogComponent', () => {
  let component: EditCorridorEntityDialogComponent;
  let fixture: ComponentFixture<EditCorridorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorridorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorridorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
