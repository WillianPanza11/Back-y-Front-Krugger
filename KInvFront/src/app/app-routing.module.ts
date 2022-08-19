import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { PrincipalControlComponent } from './components/principal-control/principal-control.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { GuardsLoginService } from './guards/guards-login.service';

const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'control', component: PrincipalControlComponent, canActivate: [GuardsLoginService], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
