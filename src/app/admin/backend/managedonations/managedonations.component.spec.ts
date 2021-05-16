import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedonationsComponent } from './managedonations.component';

describe('ManagedonationsComponent', () => {
  let component: ManagedonationsComponent;
  let fixture: ComponentFixture<ManagedonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
