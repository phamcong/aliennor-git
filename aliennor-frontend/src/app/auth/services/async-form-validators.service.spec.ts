import { TestBed, inject } from '@angular/core/testing';

import { AsyncFormValidatorsService } from './async-form-validators.service';

describe('AsyncFormValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncFormValidatorsService]
    });
  });

  it('should be created', inject([AsyncFormValidatorsService], (service: AsyncFormValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
