import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonProjetComponent } from './json-projet.component';

describe('JsonProjetComponent', () => {
  let component: JsonProjetComponent;
  let fixture: ComponentFixture<JsonProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
