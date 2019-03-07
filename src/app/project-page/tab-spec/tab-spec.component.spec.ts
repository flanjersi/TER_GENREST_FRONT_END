import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSpecComponent } from './tab-spec.component';

describe('TabSpecComponent', () => {
  let component: TabSpecComponent;
  let fixture: ComponentFixture<TabSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
