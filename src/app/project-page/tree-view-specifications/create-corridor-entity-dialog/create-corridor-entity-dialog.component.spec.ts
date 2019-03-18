import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorridorEntityDialogComponent } from './create-corridor-entity-dialog.component';

describe('CreateCorridorEntityDialogComponent', () => {
  let component: CreateCorridorEntityDialogComponent;
  let fixture: ComponentFixture<CreateCorridorEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCorridorEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorridorEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
