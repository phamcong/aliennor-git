import { TestBed, inject } from '@angular/core/testing';

import { EcocasesService } from './ecocases.service';

describe('EcocasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcocasesService]
    });
  });

  it('should be created', inject([EcocasesService], (service: EcocasesService) => {
    expect(service).toBeTruthy();
  }));
});
