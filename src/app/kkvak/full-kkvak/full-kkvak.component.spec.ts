import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullKkvakComponent } from './full-kkvak.component';

describe('FullKkvakComponent', () => {
  let component: FullKkvakComponent;
  let fixture: ComponentFixture<FullKkvakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullKkvakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullKkvakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
