import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpecComponent } from './project-spec.component';

describe('ProjectSpecComponent', () => {
  let component: ProjectSpecComponent;
  let fixture: ComponentFixture<ProjectSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
