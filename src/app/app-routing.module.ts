import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { AuthGuard } from './guardians/auth.guard';
import { ConfigurationGuard } from './guardians/configuration.guard';

const routes: Routes = [
  { path: '', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ConfigurationGuard],
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'client/update/:id',
    component: UpdateClientComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
