import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpicComponent } from './fullpic.component';

describe('FullpicComponent', () => {
  let component: FullpicComponent;
  let fixture: ComponentFixture<FullpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
