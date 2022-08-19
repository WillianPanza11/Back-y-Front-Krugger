import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionEmpleadoComponent } from './seccion-empleado.component';

describe('SeccionEmpleadoComponent', () => {
  let component: SeccionEmpleadoComponent;
  let fixture: ComponentFixture<SeccionEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
