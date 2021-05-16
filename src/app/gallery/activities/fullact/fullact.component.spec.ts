import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullactComponent } from './fullact.component';

describe('FullactComponent', () => {
  let component: FullactComponent;
  let fixture: ComponentFixture<FullactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
