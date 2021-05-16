import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallAdsComponent } from './tall-ads.component';

describe('TallAdsComponent', () => {
  let component: TallAdsComponent;
  let fixture: ComponentFixture<TallAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
