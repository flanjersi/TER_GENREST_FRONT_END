import { TestBed } from '@angular/core/testing';

import { CorridorService } from './corridor.service';

describe('CorridorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorridorService = TestBed.get(CorridorService);
    expect(service).toBeTruthy();
  });
});
