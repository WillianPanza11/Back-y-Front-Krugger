import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthControllerService, LoginUsuario } from 'src/app/ServiceSwagger';
import { ServicioTokenService } from 'src/app/ServicioManual/servicio-token.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  formLogin: FormGroup;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  loginUsuario: LoginUsuario = {
    nombreUsuario: '',
    password: ''
  }

  constructor(private tokenService: ServicioTokenService, private router: Router,
    private messageService: MessageService, private authService: AuthControllerService,
    private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  volverControl(): void {
    this.router.navigate(['/control']);
  }

  onLogin(): void {
    if (this.formLogin.valid) {
      this.authService.loginUsingPOST(this.loginUsuario).subscribe(data => {

        if (data.object?.token != null) {

          this.isLogged = true;
          this.isLoginFail = false;

          this.tokenService.setToken(data.object.token);
          this.tokenService.setUserName(data.object.nombreUsuario || '');
          this.tokenService.setAuthorities(data.object.authorities as string[]);
          this.roles = data.object.authorities as string[];
          //this.tokenService.setToken(data.object?.token!);
          this.messageService.add({ severity: 'success', summary: 'User', detail: 'Usew user', life: 3000 });
          this.router.navigate(['/control']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'User', detail: 'User not found', life: 3000 });
        }
      },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ERROR AL INGRESAR' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'INGRESE LOS CAMPOS SOLICITADOS' });
    }
  }

  validarCarecteresEspeciales(event: any) {
    const patron = /[a-zA-ZÑ@._0-9]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

}
