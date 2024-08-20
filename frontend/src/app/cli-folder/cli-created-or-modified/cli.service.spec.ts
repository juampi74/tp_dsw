import { TestBed } from '@angular/core/testing';

import { ClientCreatedOrModifiedService } from './cli.service.js';

describe('ClientCreatedOrModifiedService', () => {
  let service: ClientCreatedOrModifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCreatedOrModifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
