import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonalbodyComponent } from './zonalbody.component';

describe('ZonalbodyComponent', () => {
  let component: ZonalbodyComponent;
  let fixture: ComponentFixture<ZonalbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonalbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonalbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
