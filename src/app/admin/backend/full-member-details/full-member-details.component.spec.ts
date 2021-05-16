import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMemberDetailsComponent } from './full-member-details.component';

describe('FullMemberDetailsComponent', () => {
  let component: FullMemberDetailsComponent;
  let fixture: ComponentFixture<FullMemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMemberDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
