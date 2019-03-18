import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomEntityDialogComponent } from './edit-room-entity-dialog.component';

describe('EditRoomEntityDialogComponent', () => {
  let component: EditRoomEntityDialogComponent;
  let fixture: ComponentFixture<EditRoomEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
