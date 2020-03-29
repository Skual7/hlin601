import { TestBed } from '@angular/core/testing';

import { QualifServiceService } from './qualif-service.service';

describe('QualifServiceService', () => {
  let service: QualifServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualifServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
