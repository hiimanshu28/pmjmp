import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAdsComponent } from './footer-ads.component';

describe('FooterAdsComponent', () => {
  let component: FooterAdsComponent;
  let fixture: ComponentFixture<FooterAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
