import { TestBed } from '@angular/core/testing';

import { MotherRoomService } from './mother-room.service';

describe('MotherRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotherRoomService = TestBed.get(MotherRoomService);
    expect(service).toBeTruthy();
  });
});
