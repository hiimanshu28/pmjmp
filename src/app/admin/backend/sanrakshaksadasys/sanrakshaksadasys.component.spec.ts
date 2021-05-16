import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanrakshaksadasysComponent } from './sanrakshaksadasys.component';

describe('SanrakshaksadasysComponent', () => {
  let component: SanrakshaksadasysComponent;
  let fixture: ComponentFixture<SanrakshaksadasysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanrakshaksadasysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanrakshaksadasysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
