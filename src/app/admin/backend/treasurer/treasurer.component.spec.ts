import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurerComponent } from './treasurer.component';

describe('TreasurerComponent', () => {
  let component: TreasurerComponent;
  let fixture: ComponentFixture<TreasurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
