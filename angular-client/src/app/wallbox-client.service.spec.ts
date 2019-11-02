import { TestBed } from '@angular/core/testing';

import { WallboxClientService } from './wallbox-client.service';

describe('WallboxClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WallboxClientService = TestBed.get(WallboxClientService);
    expect(service).toBeTruthy();
  });
});
