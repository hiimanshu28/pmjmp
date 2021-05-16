import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicepresidentComponent } from './vicepresident.component';

describe('VicepresidentComponent', () => {
  let component: VicepresidentComponent;
  let fixture: ComponentFixture<VicepresidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicepresidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicepresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
