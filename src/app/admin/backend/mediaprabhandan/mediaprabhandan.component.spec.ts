import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaprabhandanComponent } from './mediaprabhandan.component';

describe('MediaprabhandanComponent', () => {
  let component: MediaprabhandanComponent;
  let fixture: ComponentFixture<MediaprabhandanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaprabhandanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaprabhandanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
