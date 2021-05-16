import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagevideosComponent } from './managevideos.component';

describe('ManagevideosComponent', () => {
  let component: ManagevideosComponent;
  let fixture: ComponentFixture<ManagevideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagevideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagevideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
