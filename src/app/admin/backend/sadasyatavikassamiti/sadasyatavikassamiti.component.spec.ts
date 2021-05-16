import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadasyatavikassamitiComponent } from './sadasyatavikassamiti.component';

describe('SadasyatavikassamitiComponent', () => {
  let component: SadasyatavikassamitiComponent;
  let fixture: ComponentFixture<SadasyatavikassamitiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadasyatavikassamitiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadasyatavikassamitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
