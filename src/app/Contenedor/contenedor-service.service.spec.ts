import { TestBed } from '@angular/core/testing';

import { ContenedorServiceService } from './contenedor-service.service';

describe('ContenedorServiceService', () => {
  let service: ContenedorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenedorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
