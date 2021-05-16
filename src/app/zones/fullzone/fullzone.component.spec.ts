import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullzoneComponent } from './fullzone.component';

describe('FullzoneComponent', () => {
  let component: FullzoneComponent;
  let fixture: ComponentFixture<FullzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
