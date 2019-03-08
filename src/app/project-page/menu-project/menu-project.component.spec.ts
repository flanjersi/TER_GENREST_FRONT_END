import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProjectComponent } from './menu-project.component';

describe('MenuProjectComponent', () => {
  let component: MenuProjectComponent;
  let fixture: ComponentFixture<MenuProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
