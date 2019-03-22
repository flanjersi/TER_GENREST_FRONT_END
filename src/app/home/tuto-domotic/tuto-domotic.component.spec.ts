import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoDomoticComponent } from './tuto-domotic.component';

describe('TutoDomoticComponent', () => {
  let component: TutoDomoticComponent;
  let fixture: ComponentFixture<TutoDomoticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoDomoticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoDomoticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
