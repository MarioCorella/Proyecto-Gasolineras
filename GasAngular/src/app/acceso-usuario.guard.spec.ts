import { TestBed, async, inject } from '@angular/core/testing';

import { AccesoUsuarioGuard } from './acceso-usuario.guard';

describe('AccesoUsuarioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesoUsuarioGuard]
    });
  });

  it('should ...', inject([AccesoUsuarioGuard], (guard: AccesoUsuarioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
