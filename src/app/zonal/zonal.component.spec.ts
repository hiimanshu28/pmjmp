import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonalComponent } from './zonal.component';

describe('ZonalComponent', () => {
  let component: ZonalComponent;
  let fixture: ComponentFixture<ZonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
