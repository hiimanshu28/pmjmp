import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagephotosComponent } from './managephotos.component';

describe('ManagephotosComponent', () => {
  let component: ManagephotosComponent;
  let fixture: ComponentFixture<ManagephotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagephotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagephotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
