import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagenewsComponent } from './managenews.component';

describe('ManagenewsComponent', () => {
  let component: ManagenewsComponent;
  let fixture: ComponentFixture<ManagenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
