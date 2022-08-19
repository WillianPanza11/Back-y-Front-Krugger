import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import {HeaderComponent} from './components/header/header.component';
import { interceptorProvider } from './interceptor/interceptor.service';

//modulos primeng
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { AuthControllerService, EmpleadoControllerService } from './ServiceSwagger';
import { HttpClientModule } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {PanelModule} from 'primeng/panel';
import { PrincipalControlComponent } from './components/principal-control/principal-control.component';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {MegaMenuModule} from 'primeng/megamenu';
import {DialogModule} from 'primeng/dialog';
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {KeyFilterModule} from 'primeng/keyfilter';
import { SeccionEmpleadoComponent } from './components/seccion-empleado/seccion-empleado.component';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    RegistrarComponent,
    PrincipalControlComponent,
    HeaderComponent,
    ListarEmpleadosComponent,
    SeccionEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    MenubarModule,
    TableModule,
    MegaMenuModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AuthControllerService,
    interceptorProvider,
    EmpleadoControllerService,
    ListarEmpleadosComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
