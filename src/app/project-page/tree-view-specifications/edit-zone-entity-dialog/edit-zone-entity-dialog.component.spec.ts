import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZoneEntityDialogComponent } from './edit-zone-entity-dialog.component';

describe('EditZoneEntityDialogComponent', () => {
  let component: EditZoneEntityDialogComponent;
  let fixture: ComponentFixture<EditZoneEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditZoneEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditZoneEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
