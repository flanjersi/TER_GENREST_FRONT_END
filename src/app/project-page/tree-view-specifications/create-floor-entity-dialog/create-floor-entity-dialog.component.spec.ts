import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFloorEntityDialogComponent } from './create-floor-entity-dialog.component';

describe('CreateFloorEntityDialogComponent', () => {
  let component: CreateFloorEntityDialogComponent;
  let fixture: ComponentFixture<CreateFloorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFloorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFloorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
