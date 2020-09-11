import { TestBed } from '@angular/core/testing';

import { LayoutHttpService } from './layout-http.service';

describe('LayoutHttpService', () => {
  let service: LayoutHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
