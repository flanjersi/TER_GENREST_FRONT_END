import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSpecComponent } from './graph-spec.component';

describe('GraphSpecComponent', () => {
  let component: GraphSpecComponent;
  let fixture: ComponentFixture<GraphSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
