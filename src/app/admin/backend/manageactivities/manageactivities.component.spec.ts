import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageactivitiesComponent } from './manageactivities.component';

describe('ManageactivitiesComponent', () => {
  let component: ManageactivitiesComponent;
  let fixture: ComponentFixture<ManageactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
