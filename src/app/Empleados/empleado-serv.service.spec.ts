import { TestBed } from '@angular/core/testing';

import { EmpleadoServService } from './empleado-serv.service';

describe('EmpleadoServService', () => {
  let service: EmpleadoServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
