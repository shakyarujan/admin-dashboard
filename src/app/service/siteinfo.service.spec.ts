import { TestBed } from '@angular/core/testing';

import { SiteinfoService } from './siteinfo.service';

describe('SiteinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteinfoService = TestBed.get(SiteinfoService);
    expect(service).toBeTruthy();
  });
});
