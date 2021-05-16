import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullprofileComponent } from './fullprofile.component';

describe('FullprofileComponent', () => {
  let component: FullprofileComponent;
  let fixture: ComponentFixture<FullprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
