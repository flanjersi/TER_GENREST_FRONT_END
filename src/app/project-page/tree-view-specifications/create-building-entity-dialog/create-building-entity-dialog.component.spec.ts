import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingEntityDialogComponent } from './create-building-entity-dialog.component';

describe('CreateBuildingEntityDialogComponent', () => {
  let component: CreateBuildingEntityDialogComponent;
  let fixture: ComponentFixture<CreateBuildingEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBuildingEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuildingEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
