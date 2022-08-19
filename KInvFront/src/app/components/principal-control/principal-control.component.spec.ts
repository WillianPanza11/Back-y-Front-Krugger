import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalControlComponent } from './principal-control.component';

describe('PrincipalControlComponent', () => {
  let component: PrincipalControlComponent;
  let fixture: ComponentFixture<PrincipalControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
