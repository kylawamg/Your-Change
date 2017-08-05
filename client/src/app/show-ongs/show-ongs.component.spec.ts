import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOngsComponent } from './show-ongs.component';

describe('ShowOngsComponent', () => {
  let component: ShowOngsComponent;
  let fixture: ComponentFixture<ShowOngsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOngsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOngsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
