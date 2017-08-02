import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllProjectsComponent } from './show-all-projects.component';

describe('ShowAllProjectsComponent', () => {
  let component: ShowAllProjectsComponent;
  let fixture: ComponentFixture<ShowAllProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
