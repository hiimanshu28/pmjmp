import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoverningbodyComponent } from './governingbody.component';

describe('GoverningbodyComponent', () => {
  let component: GoverningbodyComponent;
  let fixture: ComponentFixture<GoverningbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoverningbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoverningbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
