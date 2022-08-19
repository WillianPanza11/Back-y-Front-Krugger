import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServicioTokenService } from '../ServicioManual/servicio-token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsLoginService implements CanActivate{
  realRol!: string;
  constructor(private tokenService: ServicioTokenService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRol = route.data['expectedRol'];
      const roles = this.tokenService.getAuthorities();
      this.realRol = 'user';
      roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.realRol = 'admin';
        }
      });
      if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
}
