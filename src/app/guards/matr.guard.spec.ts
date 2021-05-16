import { TestBed } from '@angular/core/testing';

import { MatrGuard } from './matr.guard';

describe('MatrGuard', () => {
  let guard: MatrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MatrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
