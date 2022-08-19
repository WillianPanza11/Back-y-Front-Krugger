import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthControllerService, EmpleadoControllerService, EmpleadoDto, NuevoUsuario, Usuario } from 'src/app/ServiceSwagger';
import { ServicioTokenService } from 'src/app/ServicioManual/servicio-token.service';
import { ListarEmpleadosComponent } from '../listar-empleados/listar-empleados.component';
@Component({
  selector: 'app-principal-control',
  templateUrl: './principal-control.component.html',
  styleUrls: ['./principal-control.component.css']
})
export class PrincipalControlComponent implements OnInit, CanActivate, OnDestroy {

  //@ViewChield(ListarEmpleadosComponent, {static:true}) popoverComponent!: ListarEmpleadosComponent;
  listarEmpleadoComponet!: ListarEmpleadosComponent;
  private unsuscribes$ = new Subject<void>();
  val1!: string;

  val2!: string;

  formRegistro: FormGroup;
  isLogged = false;
  nombreUsuario = "";
  realRoles!: string;
  roles: string[] = [];
  isAdmin = false;

  editDialog!: boolean;
  submitted!: boolean;

  items!: MegaMenuItem[];

  nuevoUsuario: NuevoUsuario ={
    apellidos: "",
    cedula: "",
    email: "",
    nombreUsuario: "",
    nombres: "",
    password: "",
    roles: [""]
  }

  empleado: EmpleadoDto = {
    estadoVacunacion: "",
    idEmpleado: 0,
    salario: 0,
    tipo: ""
  }

  //otro
  rol!: String[];
  authority!: string;

  constructor(private tokenService: ServicioTokenService, private fb: FormBuilder,
    private personaService: AuthControllerService, private messageService: MessageService,
    private empleadoService: EmpleadoControllerService, private listcomponentEmp: ListarEmpleadosComponent ) {
    this.formRegistro = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.rol = this.tokenService.getAuthorities();
    this.rol.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
        //this.listarSecciones('ADMIN');
      }
    })


    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();

    } else {
      this.isLogged = false;
      this.nombreUsuario = "";
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
        //this.listarSecciones('ADMIN');
      }
    })
    this.items = [
      {
        label: 'Nuevo Usuario',
        icon: 'pi pi-fw pi-user',
        command: () => this.showDialogEdit()
      }]

  }

  ngOnDestroy(): void {
    this.unsuscribes$.next();
    this.unsuscribes$.complete();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRoles = 'user';
    roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.realRoles = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRoles) === -1) {
      //this.router.navigate(['/']);
      return false;
    }
    return true;
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

  validarNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validarLetras(event: any) {
    const patron = /[a-zA-Z ]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validarEmail(event: any){
    const patron = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  mensajeError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  MessageSuccess(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  hideDialog() {
    this.editDialog = false;
    this.submitted = false;
  }

  showDialogEdit() {
    this.editDialog = true;
  }
  esEmailValido(email: string): boolean {
    let mailValido = false;
    'use strict';

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)) {
      console.log("email valido");
      mailValido = true;
    }
    return mailValido;
  }

  registraPersona() {
    if(this.esEmailValido(this.nuevoUsuario.email)){
    this.personaService.nuevoUsingPOST(this.nuevoUsuario).pipe(takeUntil(this.unsuscribes$)).subscribe(
      data => {
        if (data.status==1) {
          this.hideDialog();
          this.formRegistro.reset();
          this.submitted = false;
          this.registraEmpleado(+data.object!);
          this.MessageSuccess("Creado Correctamente");
        }else{
          this.mensajeError("error al crear" + data.message)
        }
      },error => {
        this.mensajeError("ERROR EN EL SERVIDOR")
      })
    }else{
      this.mensajeError("Email no valido")
    }
  }

  registraEmpleado(idEmpleado: number) {
    this.empleado.idEmpleado = idEmpleado;
    this.empleado.salario = 1000;
    this.empleado.tipo = "SISTEMAS";
    this.empleadoService.saveEmpleadoUsingPOST(this.empleado).pipe(takeUntil(this.unsuscribes$)).subscribe(
      data => {
        if(data){
          this.recargaTableEmpleados();
          this.MessageSuccess("Creado Correctamente Empleado");
        }
      },error => {
        this.mensajeError("ERROR EN EL SERVIDOR")
      })
  }

  visible: boolean = true;
  recargaTableEmpleados(){
    console.log("recarga table");
    //this.listcomponentEmp.listarEmpleadosAllDates(this.listcomponentEmp.lastTableLazyLoadEvent);
    this.listcomponentEmp.listarEmpleadosAllDates();
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
  }
}
