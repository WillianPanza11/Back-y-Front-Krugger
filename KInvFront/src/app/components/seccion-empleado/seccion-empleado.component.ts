import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EmpleadoControllerService, EmpleadoListAllDateDto } from 'src/app/ServiceSwagger';
import { ServicioTokenService } from 'src/app/ServicioManual/servicio-token.service';

@Component({
  selector: 'app-seccion-empleado',
  templateUrl: './seccion-empleado.component.html',
  styleUrls: ['./seccion-empleado.component.css']
})
export class SeccionEmpleadoComponent implements OnInit {

  formDatosEmpleado: FormGroup;
  private unsuscribes$ = new Subject<void>();
  listEmpleado!: EmpleadoListAllDateDto[];
  nombreUsuario = "";
  editDialog!: boolean;
  submitted!: boolean;
  estadoVacunacion :any[];

  objePersona: EmpleadoListAllDateDto = {
    apellidos: "",
    cedula: "",
    direccion: "",
    email: "",
    estado: "",
    estadoVacunacion: "",
    fechaNacimiento: new Date(),
    idEmpleado: 0,
    idUsuario: 0,
    nombreUsuario: "",
    nombres: "",
    password: "",
    salario: 0,
    tipo: "",
  }

  constructor(private empleadoService: EmpleadoControllerService, private messageService: MessageService,
    private tokenService: ServicioTokenService, private fb: FormBuilder) {

      this.estadoVacunacion = [
        { name: 'Vacunado' },
        { name: 'No Vacunado' }
      ];

      this.formDatosEmpleado = this.fb.group({
        fechaNacimiento: ['', Validators.required],
        direccion: ['', Validators.required],
        estadoVacunacion: ['', Validators.required],
      })
   }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.nombreUsuario = this.tokenService.getUserName();
      this.listasDatosdeUnEmpleado(this.nombreUsuario);
    } else {
      this.nombreUsuario = "";
    }
  }

  hideDialog() {
    this.editDialog = false;
    this.submitted = false;
  }

  showDialogEdit() {
    this.editDialog = true;
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

  listasDatosdeUnEmpleado(username: string) {
    this.empleadoService.datosUnEmpleadoUsingGET(username).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        console.log("data", data.object);
        this.listEmpleado = data.object
        if(data.object[0].fechaNacimiento == null || data.object[0].direccion == null){
          this.showDialogEdit();
        }
      } else {
        this.mensajeError("Error al listar los datos del empleado");
      }
    })
  }

  editarDatosEmpleado(event: any, objEmpleado: EmpleadoListAllDateDto) {
    if (this.esEmailValido(objEmpleado.email!)) {
      this.empleadoService.updateDataEmpleadoUsingPUT(objEmpleado).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
        if (data) {
          this.MessageSuccess("EMPLEADO ACTUALIZADO");
          this.listasDatosdeUnEmpleado(this.nombreUsuario);
        } else {
          this.MessageSuccess("ERROR AL ACTUALIZAR EMPLEADO");
        }
      })
    } else {
      this.mensajeError("EMAIL NO VALIDO");
    }
  }

 estadoVacuna() {
  return this.formDatosEmpleado.get('estadoVacunacion')!.value;
 }

  editarDatosEmpleado2(objEmpleado: EmpleadoListAllDateDto) {
    if(this.formDatosEmpleado.valid){
      this.empleadoService.updateDataEmpleadoUsingPUT(objEmpleado).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
        if (data) {
          this.MessageSuccess("EMPLEADO ACTUALIZADO");
          this.listasDatosdeUnEmpleado(this.nombreUsuario);
          this.hideDialog();
        } else {
          this.MessageSuccess("ERROR AL ACTUALIZAR EMPLEADO");
        }
      })
    }else{
      this.mensajeError("LLENE TODOS LOS CAMPOS SOLICITADOS");
    }
  }

  ActulizarDatosVacuna(){
    const estadoVacunacion = this.formDatosEmpleado.get('estadoVacunacion')?.value;
    this.objePersona.apellidos = this.listEmpleado[0].apellidos;
    this.objePersona.cedula = this.listEmpleado[0].cedula;
    //this.objePersona.direccion = this.listEmpleado[0].direccion;
    this.objePersona.email = this.listEmpleado[0].email;
    this.objePersona.estado = this.listEmpleado[0].estado;
    this.objePersona.estadoVacunacion = estadoVacunacion.name;
    //this.objePersona.fechaNacimiento = this.listEmpleado[0].fechaNacimiento;
    this.objePersona.idEmpleado = this.listEmpleado[0].idEmpleado;
    this.objePersona.idUsuario = this.listEmpleado[0].idUsuario;
    this.objePersona.nombreUsuario = this.listEmpleado[0].nombreUsuario;
    this.objePersona.nombres = this.listEmpleado[0].nombres;
    this.objePersona.password = this.listEmpleado[0].password;
    this.objePersona.salario = this.listEmpleado[0].salario;
    this.objePersona.tipo = this.listEmpleado[0].tipo;
    this.editarDatosEmpleado2(this.objePersona);
  }

}
