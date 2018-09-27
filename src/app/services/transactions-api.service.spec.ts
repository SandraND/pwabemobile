import { TestBed } from '@angular/core/testing';

import { TransactionsApiService } from './transactions-api.service';

describe('TransactionsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionsApiService = TestBed.get(TransactionsApiService);
    expect(service).toBeTruthy();
  });
});
