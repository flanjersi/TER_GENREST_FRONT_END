import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewSpecificationsComponent } from './tree-view-specifications.component';

describe('TreeViewSpecificationsComponent', () => {
  let component: TreeViewSpecificationsComponent;
  let fixture: ComponentFixture<TreeViewSpecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewSpecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
