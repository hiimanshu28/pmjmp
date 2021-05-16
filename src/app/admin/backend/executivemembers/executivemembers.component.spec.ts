import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutivemembersComponent } from './executivemembers.component';

describe('ExecutivemembersComponent', () => {
  let component: ExecutivemembersComponent;
  let fixture: ComponentFixture<ExecutivemembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutivemembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutivemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
