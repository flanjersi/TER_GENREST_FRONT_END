import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMotherRoomEntityDialogComponent } from './create-mother-room-entity-dialog.component';

describe('CreateMotherRoomEntityDialogComponent', () => {
  let component: CreateMotherRoomEntityDialogComponent;
  let fixture: ComponentFixture<CreateMotherRoomEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMotherRoomEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMotherRoomEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
