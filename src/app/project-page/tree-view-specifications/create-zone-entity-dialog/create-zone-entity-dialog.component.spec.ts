import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateZoneEntityDialogComponent } from './create-zone-entity-dialog.component';

describe('CreateZoneEntityDialogComponent', () => {
  let component: CreateZoneEntityDialogComponent;
  let fixture: ComponentFixture<CreateZoneEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateZoneEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateZoneEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
