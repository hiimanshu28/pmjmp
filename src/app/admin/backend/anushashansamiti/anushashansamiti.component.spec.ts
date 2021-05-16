import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnushashansamitiComponent } from './anushashansamiti.component';

describe('AnushashansamitiComponent', () => {
  let component: AnushashansamitiComponent;
  let fixture: ComponentFixture<AnushashansamitiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnushashansamitiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnushashansamitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
