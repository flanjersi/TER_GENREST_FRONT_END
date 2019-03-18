import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomEntityDialogComponent } from './create-room-entity-dialog.component';

describe('CreateRoomEntityDialogComponent', () => {
  let component: CreateRoomEntityDialogComponent;
  let fixture: ComponentFixture<CreateRoomEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoomEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
