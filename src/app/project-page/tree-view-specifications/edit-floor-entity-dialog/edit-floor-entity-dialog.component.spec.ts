import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFloorEntityDialogComponent } from './edit-floor-entity-dialog.component';

describe('EditFloorEntityDialogComponent', () => {
  let component: EditFloorEntityDialogComponent;
  let fixture: ComponentFixture<EditFloorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFloorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFloorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
