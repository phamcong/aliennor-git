import { TestBed, inject } from '@angular/core/testing';

import { EsmsService } from './esms.service';

describe('EsmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsmsService]
    });
  });

  it('should be created', inject([EsmsService], (service: EsmsService) => {
    expect(service).toBeTruthy();
  }));
});
