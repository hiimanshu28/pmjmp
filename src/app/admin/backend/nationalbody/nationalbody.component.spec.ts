import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalbodyComponent } from './nationalbody.component';

describe('NationalbodyComponent', () => {
  let component: NationalbodyComponent;
  let fixture: ComponentFixture<NationalbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
