import { TestBed, inject } from '@angular/core/testing';

import { EcocaseDetailResolverService } from './ecocase-detail-resolver.service';

describe('EcocaseDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcocaseDetailResolverService]
    });
  });

  it('should be created', inject([EcocaseDetailResolverService], (service: EcocaseDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
