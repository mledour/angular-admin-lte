import { TestBed, inject } from '@angular/core/testing';

import { AngularAdminLteService } from './angular-admin-lte.service';

describe('AngularAdminLteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularAdminLteService]
    });
  });

  it('should be created', inject([AngularAdminLteService], (service: AngularAdminLteService) => {
    expect(service).toBeTruthy();
  }));
});
