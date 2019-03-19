import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingEntityDialogComponent } from './edit-building-entity-dialog.component';

describe('EditBuildingEntityDialogComponent', () => {
  let component: EditBuildingEntityDialogComponent;
  let fixture: ComponentFixture<EditBuildingEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBuildingEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBuildingEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
