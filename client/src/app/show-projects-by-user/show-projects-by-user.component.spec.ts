import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectsByUserComponent } from './show-projects-by-user.component';

describe('ShowProjectsByUserComponent', () => {
  let component: ShowProjectsByUserComponent;
  let fixture: ComponentFixture<ShowProjectsByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjectsByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
