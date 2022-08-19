import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ServicioTokenService } from 'src/app/ServicioManual/servicio-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];

  isLogged = false;
  isAdmin = false;
  autent = false;
  isEmpleado = false;

  constructor(private tokenService: ServicioTokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogged = this.tokenService.isLogged();
      // this.isAdmin = this.tokenService.isAdmin();
      //this.isEmpleado = this.tokenService.isUser();
    } else {
      this.isLogged = false;
    }

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-fw pi-user-minus',
        visible: this.isLogged,

        command: () => {
          this.onLogOut();
        },
      },
    ];
  }

  onLogOut(): void {
    localStorage.removeItem('AuthToken');
    sessionStorage.clear();
    this.tokenService.logOut();
    window.location.reload();

  }

}
