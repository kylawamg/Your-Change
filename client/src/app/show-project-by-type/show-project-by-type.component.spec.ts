import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectByTypeComponent } from './show-project-by-type.component';

describe('ShowProjectByTypeComponent', () => {
  let component: ShowProjectByTypeComponent;
  let fixture: ComponentFixture<ShowProjectByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjectByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
