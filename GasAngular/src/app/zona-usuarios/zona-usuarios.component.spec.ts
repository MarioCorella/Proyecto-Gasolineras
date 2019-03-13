import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaUsuariosComponent } from './zona-usuarios.component';

describe('ZonaUsuariosComponent', () => {
  let component: ZonaUsuariosComponent;
  let fixture: ComponentFixture<ZonaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
