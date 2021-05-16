import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkvakComponent } from './kkvak.component';

describe('KkvakComponent', () => {
  let component: KkvakComponent;
  let fixture: ComponentFixture<KkvakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkvakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkvakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
