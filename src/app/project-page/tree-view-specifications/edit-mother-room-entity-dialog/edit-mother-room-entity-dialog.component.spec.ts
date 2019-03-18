import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotherRoomEntityDialogComponent } from './edit-mother-room-entity-dialog.component';

describe('EditMotherRoomEntityDialogComponent', () => {
  let component: EditMotherRoomEntityDialogComponent;
  let fixture: ComponentFixture<EditMotherRoomEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMotherRoomEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMotherRoomEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
