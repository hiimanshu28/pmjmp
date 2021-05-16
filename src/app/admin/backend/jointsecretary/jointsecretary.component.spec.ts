import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointsecretaryComponent } from './jointsecretary.component';

describe('JointsecretaryComponent', () => {
  let component: JointsecretaryComponent;
  let fixture: ComponentFixture<JointsecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointsecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointsecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
