import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { AuthControllerService, EmpleadoControllerService, EmpleadoListAllDateDto, Usuario } from 'src/app/ServiceSwagger';
import { ServicioTokenService } from 'src/app/ServicioManual/servicio-token.service';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit, OnDestroy {

  private unsuscribes$ = new Subject<void>();
  listEmpleado: EmpleadoListAllDateDto[] = [];
  lastTableLazyLoadEvent!: LazyLoadEvent;

  selectedProduct!: EmpleadoListAllDateDto;

  constructor(private tokenService: ServicioTokenService, private personaService: AuthControllerService,
    private messageService: MessageService, private empleadoService: EmpleadoControllerService,
    private confirmationService: ConfirmationService) {
    // this.listarEmpleadosAllDates(this.lastTableLazyLoadEvent);
    this.listarEmpleadosAllDates();
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.unsuscribes$.next();
    this.unsuscribes$.complete();
  }

  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Seleccionado', detail: event.data.cedula });
  }

  clear(table: Table) {
    table.clear();
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

  //(onLazyLoad)="listarEmpleadosAllDates($event)"
  //listarEmpleadosAllDates(event: LazyLoadEvent) {
  listarEmpleadosAllDates() {
    //this.lastTableLazyLoadEvent = event;
    this.empleadoService.listarEmpleadosAllDatesUsingGET().pipe(takeUntil(this.unsuscribes$)).subscribe(
      (data) => {
        if (data) {
          this.listEmpleado = data.object!;
          console.log(this.listEmpleado);
        }
      })
  }

  ConfirmacionEliminarEmpleado(objEmpleado: EmpleadoListAllDateDto) {
    this.confirmationService.confirm({
      message: 'Eliminar este Familiar de la lista?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eliminarEmpleado(objEmpleado.idEmpleado!);
        //this.limpiarObjDatosTarjetaAllDto();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se ha eliminado el familiar' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Cancelado!!' });
            break;
        }
      }
    });
  }

  eliminarEmpleado(idEmpleado: number) {
    console.log(idEmpleado);
    this.empleadoService.deleteEmpleadoUsingPUT(idEmpleado).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data) {
        this.MessageSuccess("EMPLEADO ELIMINADO");
        this.listarEmpleadosAllDates();
      } else {
        this.MessageSuccess("ERROR AL ELIMINAR EMPLEADO");
      }
    })
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

  //Validar numeros
  keyPress(event: KeyboardEvent) {
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

  editarDatosEmpleado(event: any, objEmpleado: EmpleadoListAllDateDto) {
    if (this.esEmailValido(objEmpleado.email!)) {
      this.empleadoService.updateDataEmpleadoUsingPUT(objEmpleado).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
        if (data) {
          this.MessageSuccess("EMPLEADO ACTUALIZADO");
          this.listarEmpleadosAllDates();
        } else {
          this.MessageSuccess("ERROR AL ACTUALIZAR EMPLEADO");
        }
      })
    } else {
      this.mensajeError("EMAIL NO VALIDO");
    }
  }

}
