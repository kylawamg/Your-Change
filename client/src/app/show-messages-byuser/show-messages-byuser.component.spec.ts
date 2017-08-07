import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessagesByuserComponent } from './show-messages-byuser.component';

describe('ShowMessagesByuserComponent', () => {
  let component: ShowMessagesByuserComponent;
  let fixture: ComponentFixture<ShowMessagesByuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessagesByuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessagesByuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
