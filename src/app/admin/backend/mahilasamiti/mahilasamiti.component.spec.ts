import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahilasamitiComponent } from './mahilasamiti.component';

describe('MahilasamitiComponent', () => {
  let component: MahilasamitiComponent;
  let fixture: ComponentFixture<MahilasamitiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MahilasamitiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MahilasamitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
