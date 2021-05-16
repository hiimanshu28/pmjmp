import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKkvakComponent } from './manage-kkvak.component';

describe('ManageKkvakComponent', () => {
  let component: ManageKkvakComponent;
  let fixture: ComponentFixture<ManageKkvakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageKkvakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKkvakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
